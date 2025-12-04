#!/usr/bin/env python3
"""
Research Paper Agent (RPA) - Stanford STORM Wrapper
Copyright (c) 2025 Aditya Patange. All rights reserved.

A clean, production-grade wrapper over Stanford's STORM system
for generating comprehensive research papers on any given topic.
"""

import os
import sys
import json
import argparse
import logging
from pathlib import Path
from datetime import datetime
from typing import Optional

# Load .env file if present
def load_dotenv():
    """Load environment variables from .env files."""
    env_paths = [
        Path(__file__).parent.parent / ".env",
        Path(__file__).parent.parent / ".env.local",
        Path.cwd() / ".env",
        Path.cwd() / ".env.local",
        Path.cwd() / "packages" / "rpa" / ".env",
    ]
    for env_path in env_paths:
        if env_path.exists():
            with open(env_path) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, value = line.split("=", 1)
                        os.environ.setdefault(key.strip(), value.strip())

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ResilientDuckDuckGoRM:
    """
    A wrapper around DuckDuckGoSearchRM that handles rate limiting and errors gracefully.
    Falls back to empty results instead of crashing on transient errors.
    """

    def __init__(self, k: int = 10, safe_search: str = "moderate", region: str = "us-en"):
        from knowledge_storm.rm import DuckDuckGoSearchRM
        self._rm = DuckDuckGoSearchRM(k=k, safe_search=safe_search, region=region)
        self.k = k
        self._retry_count = 3
        self._retry_delay = 2  # seconds

    def __call__(self, *args, **kwargs):
        """Make the wrapper callable, delegating to forward."""
        return self.forward(*args, **kwargs)

    def forward(self, query_or_queries, exclude_urls=None):
        """
        Execute search with retry logic and error handling.
        """
        import time

        for attempt in range(self._retry_count):
            try:
                return self._rm.forward(query_or_queries, exclude_urls=exclude_urls)
            except Exception as e:
                error_str = str(e)
                logger.warning(f"DuckDuckGo search attempt {attempt + 1} failed: {error_str}")

                # Check for rate limiting
                if "ratelimit" in error_str.lower() or "rate" in error_str.lower():
                    wait_time = self._retry_delay * (attempt + 1)
                    logger.info(f"Rate limited. Waiting {wait_time}s before retry...")
                    time.sleep(wait_time)
                elif attempt < self._retry_count - 1:
                    time.sleep(self._retry_delay)
                else:
                    # Final attempt failed, return empty results
                    logger.error(f"DuckDuckGo search failed after {self._retry_count} attempts")
                    # Return empty results structure that STORM expects
                    if isinstance(query_or_queries, str):
                        return {query_or_queries: []}
                    return {q: [] for q in query_or_queries}

        # Fallback
        if isinstance(query_or_queries, str):
            return {query_or_queries: []}
        return {q: [] for q in query_or_queries}


class ResearchPaperAgent:
    """
    Research Paper Agent - Wrapper over Stanford STORM

    Copyright (c) 2025 Aditya Patange
    Licensed under MIT License
    """

    VERSION = "1.0.0"
    AUTHOR = "Aditya Patange"

    def __init__(
        self,
        output_dir: str = "./output",
        model: str = "gpt-4o",
        search_engine: str = "duckduckgo",
        max_pages: int = 12
    ):
        self.output_dir = Path(output_dir)
        self.model = model
        self.search_engine = search_engine
        self.max_pages = max_pages
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def _load_api_keys(self) -> dict:
        """Load API keys from environment variables."""
        keys = {
            "openai": os.getenv("OPENAI_API_KEY"),
            "anthropic": os.getenv("ANTHROPIC_API_KEY"),
            "you": os.getenv("YDC_API_KEY"),
            "bing": os.getenv("BING_SEARCH_API_KEY"),
            "tavily": os.getenv("TAVILY_API_KEY"),
        }
        return {k: v for k, v in keys.items() if v}

    def _get_retrieval_module(self, api_keys: dict):
        """Initialize the appropriate retrieval module based on available keys."""
        if self.search_engine == "you" and api_keys.get("you"):
            from knowledge_storm.rm import YouRM
            logger.info("Using You.com search")
            return YouRM(ydc_api_key=api_keys["you"], k=10)
        elif self.search_engine == "bing" and api_keys.get("bing"):
            from knowledge_storm.rm import BingSearch
            logger.info("Using Bing search")
            return BingSearch(bing_search_api_key=api_keys["bing"], k=10)
        elif self.search_engine == "tavily" and api_keys.get("tavily"):
            from knowledge_storm.rm import TavilySearchRM
            logger.info("Using Tavily search")
            return TavilySearchRM(tavily_api_key=api_keys["tavily"], k=10)
        else:
            # Default to DuckDuckGo with error-resilient wrapper
            logger.info("Using DuckDuckGo search (no API key required)")
            return ResilientDuckDuckGoRM(k=10, safe_search="moderate", region="us-en")

    def _configure_language_models(self, api_keys: dict):
        """Configure language models for STORM pipeline."""
        from knowledge_storm import STORMWikiLMConfigs
        from knowledge_storm.lm import LitellmModel

        lm_configs = STORMWikiLMConfigs()

        # Determine which API to use - prioritize Anthropic
        if api_keys.get("anthropic"):
            logger.info("Using Anthropic Claude models")
            api_key = api_keys["anthropic"]
            model_kwargs = {
                "api_key": api_key,
                "temperature": 1.0,
                "top_p": 0.9,
            }

            # Use Claude Haiku for conversation simulation (faster, cheaper)
            conv_model = LitellmModel(
                model="claude-3-haiku-20240307",
                max_tokens=500,
                **model_kwargs
            )

            # Use Claude Sonnet for complex tasks
            main_model = LitellmModel(
                model="claude-3-5-sonnet-20241022",
                max_tokens=3000,
                **model_kwargs
            )

        elif api_keys.get("openai"):
            logger.info("Using OpenAI GPT models")
            api_key = api_keys["openai"]
            model_kwargs = {
                "api_key": api_key,
                "temperature": 1.0,
                "top_p": 0.9,
            }

            # Use GPT-3.5-turbo for conversation simulation (faster, cheaper)
            conv_model = LitellmModel(
                model="gpt-3.5-turbo",
                max_tokens=500,
                **model_kwargs
            )

            # Use GPT-4o for complex tasks
            main_model = LitellmModel(
                model=self.model,
                max_tokens=3000,
                **model_kwargs
            )
        else:
            raise ValueError(
                "No valid API key found. Please set ANTHROPIC_API_KEY or OPENAI_API_KEY"
            )

        # Assign models to different pipeline stages
        lm_configs.set_conv_simulator_lm(conv_model)
        lm_configs.set_question_asker_lm(conv_model)
        lm_configs.set_outline_gen_lm(main_model)
        lm_configs.set_article_gen_lm(main_model)
        lm_configs.set_article_polish_lm(main_model)

        return lm_configs

    def generate(self, topic: str) -> dict:
        """
        Generate a research paper on the given topic.

        Args:
            topic: The research topic to generate a paper about

        Returns:
            dict containing the generated paper and metadata
        """
        logger.info(f"Starting research paper generation for: {topic}")
        logger.info(f"Target length: ~{self.max_pages} pages")

        try:
            from knowledge_storm import STORMWikiRunnerArguments, STORMWikiRunner
        except ImportError:
            logger.error("knowledge-storm package not installed")
            logger.info("Installing knowledge-storm...")
            import subprocess
            subprocess.check_call([sys.executable, "-m", "pip", "install", "knowledge-storm"])
            from knowledge_storm import STORMWikiRunnerArguments, STORMWikiRunner

        api_keys = self._load_api_keys()
        if not api_keys.get("openai") and not api_keys.get("anthropic"):
            raise ValueError(
                "Missing API key. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY"
            )

        # Configure models
        lm_configs = self._configure_language_models(api_keys)

        # Configure retrieval
        rm = self._get_retrieval_module(api_keys)

        # Sanitize topic for directory name
        safe_topic = "".join(c if c.isalnum() or c in " -_" else "_" for c in topic)
        safe_topic = safe_topic.replace(" ", "_")[:50]

        # Create output directory for this topic
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        topic_output_dir = self.output_dir / f"{safe_topic}_{timestamp}"
        topic_output_dir.mkdir(parents=True, exist_ok=True)

        # Configure runner arguments
        engine_args = STORMWikiRunnerArguments(
            output_dir=str(topic_output_dir),
            max_conv_turn=5,
            max_perspective=4,
            search_top_k=10,
            max_thread_num=4,
        )

        # Initialize runner
        runner = STORMWikiRunner(engine_args, lm_configs, rm)

        logger.info("Phase 1: Research and perspective gathering...")
        logger.info("Phase 2: Outline generation...")
        logger.info("Phase 3: Article generation...")
        logger.info("Phase 4: Polish and refinement...")

        # Execute the STORM pipeline
        runner.run(
            topic=topic,
            do_research=True,
            do_generate_outline=True,
            do_generate_article=True,
            do_polish_article=True,
        )

        # Post-processing
        runner.post_run()
        runner.summary()

        # Read generated content
        article_path = topic_output_dir / topic / "storm_gen_article_polished.txt"
        outline_path = topic_output_dir / topic / "storm_gen_outline.txt"

        article_content = ""
        outline_content = ""

        if article_path.exists():
            article_content = article_path.read_text(encoding="utf-8")
        elif (topic_output_dir / topic / "storm_gen_article.txt").exists():
            article_content = (topic_output_dir / topic / "storm_gen_article.txt").read_text(encoding="utf-8")

        if outline_path.exists():
            outline_content = outline_path.read_text(encoding="utf-8")

        # Generate metadata
        result = {
            "success": True,
            "topic": topic,
            "timestamp": timestamp,
            "output_dir": str(topic_output_dir),
            "article": article_content,
            "outline": outline_content,
            "model": self.model,
            "search_engine": self.search_engine,
            "version": self.VERSION,
            "author": self.AUTHOR,
        }

        # Save metadata
        metadata_path = topic_output_dir / "metadata.json"
        with open(metadata_path, "w", encoding="utf-8") as f:
            json.dump({k: v for k, v in result.items() if k != "article"}, f, indent=2)

        logger.info(f"Research paper generated successfully!")
        logger.info(f"Output directory: {topic_output_dir}")

        return result


def main():
    """CLI entry point for Research Paper Agent."""
    parser = argparse.ArgumentParser(
        description="Research Paper Agent (RPA) - Generate research papers using Stanford STORM",
        epilog="Copyright (c) 2025 Aditya Patange. All rights reserved."
    )

    parser.add_argument(
        "--topic", "-t",
        required=True,
        help="The research topic to generate a paper about"
    )

    parser.add_argument(
        "--output", "-o",
        default="./output",
        help="Output directory for generated papers (default: ./output)"
    )

    parser.add_argument(
        "--model", "-m",
        default="gpt-4o",
        choices=["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo", "claude-3-5-sonnet-20241022"],
        help="Language model to use (default: gpt-4o)"
    )

    parser.add_argument(
        "--search", "-s",
        default="duckduckgo",
        choices=["duckduckgo", "you", "bing", "tavily"],
        help="Search engine to use (default: duckduckgo)"
    )

    parser.add_argument(
        "--pages", "-p",
        type=int,
        default=12,
        help="Target number of pages (default: 12)"
    )

    parser.add_argument(
        "--json",
        action="store_true",
        help="Output result as JSON"
    )

    parser.add_argument(
        "--version", "-v",
        action="version",
        version=f"Research Paper Agent v{ResearchPaperAgent.VERSION} by {ResearchPaperAgent.AUTHOR}"
    )

    args = parser.parse_args()

    print(f"""
╔══════════════════════════════════════════════════════════════════╗
║         Research Paper Agent (RPA) v{ResearchPaperAgent.VERSION}                      ║
║         Copyright (c) 2025 Aditya Patange                        ║
║         Powered by Stanford STORM                                ║
╚══════════════════════════════════════════════════════════════════╝
    """)

    try:
        agent = ResearchPaperAgent(
            output_dir=args.output,
            model=args.model,
            search_engine=args.search,
            max_pages=args.pages
        )

        result = agent.generate(args.topic)

        if args.json:
            print(json.dumps(result, indent=2))
        else:
            print(f"\n{'='*60}")
            print(f"RESEARCH PAPER: {args.topic}")
            print(f"{'='*60}\n")
            print(result.get("article", "No article generated"))
            print(f"\n{'='*60}")
            print(f"Output saved to: {result['output_dir']}")
            print(f"{'='*60}\n")

    except Exception as e:
        logger.error(f"Failed to generate research paper: {e}")
        if args.json:
            print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
