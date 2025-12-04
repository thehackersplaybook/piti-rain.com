#!/usr/bin/env python3
"""
Research Paper Agent (RPA) - Direct Generator
Copyright (c) 2025 Aditya Patange. All rights reserved.

A clean, reliable research paper generator using Anthropic Claude directly.
This bypasses the STORM pipeline issues with search engines.
"""

import os
import sys
import json
import argparse
import logging
from pathlib import Path
from datetime import datetime

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


VERSION = "1.0.0"
AUTHOR = "Aditya Patange"


def generate_research_paper(topic: str, output_dir: str = "./output", target_pages: int = 12) -> dict:
    """
    Generate a comprehensive research paper using Anthropic Claude.

    Copyright (c) 2025 Aditya Patange. All rights reserved.
    """
    import anthropic

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY environment variable is required")

    client = anthropic.Anthropic(api_key=api_key)

    # Create output directory
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_topic = "".join(c if c.isalnum() or c in " -_" else "_" for c in topic)
    safe_topic = safe_topic.replace(" ", "_")[:50]

    topic_dir = output_path / f"{safe_topic}_{timestamp}"
    topic_dir.mkdir(parents=True, exist_ok=True)

    logger.info(f"Generating research paper on: {topic}")
    logger.info(f"Target length: ~{target_pages} pages (~{target_pages * 500} words)")

    # Step 1: Generate outline
    logger.info("Phase 1: Generating outline...")
    outline_prompt = f"""You are an expert academic researcher. Create a detailed outline for a comprehensive research paper on the topic: "{topic}"

The paper should be approximately {target_pages} pages (~{target_pages * 500} words).

Create a structured outline with:
1. Title
2. Abstract summary (what it will cover)
3. Main sections (5-8 sections) with subsections
4. Key points to cover in each section
5. Suggested references/sources to cite

Format the outline clearly with hierarchical numbering."""

    outline_response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{"role": "user", "content": outline_prompt}]
    )
    outline = outline_response.content[0].text

    # Save outline
    (topic_dir / "outline.txt").write_text(outline, encoding="utf-8")
    logger.info("Outline generated successfully")

    # Step 2: Generate the full paper
    logger.info("Phase 2: Generating full research paper...")

    paper_prompt = f"""You are an expert academic researcher and writer. Write a comprehensive, well-researched paper on the topic: "{topic}"

Use this outline as your guide:
{outline}

Requirements:
1. Write approximately {target_pages * 500} words ({target_pages} pages)
2. Use academic tone and style
3. Include an Abstract, Introduction, multiple body sections, and Conclusion
4. Include inline citations in [Author, Year] format
5. Add a References section at the end with properly formatted citations
6. Be thorough, insightful, and provide deep analysis
7. Include relevant examples, case studies, or evidence
8. Make it suitable for publication on a professional website

Write the complete paper now, formatted in clean markdown."""

    paper_response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=16000,
        messages=[{"role": "user", "content": paper_prompt}]
    )
    paper = paper_response.content[0].text

    # Save paper
    (topic_dir / "paper.md").write_text(paper, encoding="utf-8")
    logger.info("Paper generated successfully")

    # Step 3: Polish and enhance
    logger.info("Phase 3: Polishing and enhancing...")

    polish_prompt = f"""Review and enhance this research paper. Improve clarity, fix any issues, ensure academic rigor, and make it publication-ready.

Paper:
{paper}

Provide the enhanced, polished version. Maintain the markdown formatting."""

    polish_response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=16000,
        messages=[{"role": "user", "content": polish_prompt}]
    )
    polished_paper = polish_response.content[0].text

    # Save polished paper
    (topic_dir / "paper_polished.md").write_text(polished_paper, encoding="utf-8")
    logger.info("Paper polished successfully")

    # Save metadata
    metadata = {
        "topic": topic,
        "timestamp": timestamp,
        "output_dir": str(topic_dir),
        "version": VERSION,
        "author": AUTHOR,
        "model": "claude-sonnet-4-20250514",
        "target_pages": target_pages,
        "files": {
            "outline": "outline.txt",
            "paper": "paper.md",
            "polished": "paper_polished.md"
        }
    }
    (topic_dir / "metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")

    logger.info(f"Research paper saved to: {topic_dir}")

    return {
        "success": True,
        "topic": topic,
        "timestamp": timestamp,
        "output_dir": str(topic_dir),
        "outline": outline,
        "article": polished_paper,
        "version": VERSION,
        "author": AUTHOR
    }


def main():
    """CLI entry point for Research Paper Agent - Direct Generator."""
    parser = argparse.ArgumentParser(
        description="Research Paper Agent (RPA) - Generate research papers using Anthropic Claude",
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
        version=f"Research Paper Agent v{VERSION} by {AUTHOR}"
    )

    args = parser.parse_args()

    print(f"""
╔══════════════════════════════════════════════════════════════════╗
║         Research Paper Agent (RPA) v{VERSION}                      ║
║         Copyright (c) 2025 Aditya Patange                        ║
║         Powered by Anthropic Claude                              ║
╚══════════════════════════════════════════════════════════════════╝
    """)

    try:
        result = generate_research_paper(
            topic=args.topic,
            output_dir=args.output,
            target_pages=args.pages
        )

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
        import traceback
        traceback.print_exc()
        if args.json:
            print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
