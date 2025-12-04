# Research Paper Agent (RPA)

**Copyright (c) 2025 Aditya Patange. All rights reserved.**

A production-grade wrapper over Stanford's STORM system for generating comprehensive research papers on any given topic.

## Overview

Research Paper Agent (RPA) leverages Stanford's STORM (Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking) system to automatically generate well-researched, Wikipedia-style articles with citations.

### Features

- Automated research paper generation using LLM-powered knowledge curation
- Multi-perspective research synthesis
- Automatic outline generation
- Citation and reference management
- Support for multiple LLM providers (OpenAI, Anthropic)
- Multiple search engine backends (DuckDuckGo, You.com, Bing, Tavily)
- Clean, humanized output suitable for academic use
- Configurable paper length (default: 12 pages)

## Installation

### Prerequisites

- Node.js >= 18.0.0
- Python >= 3.11
- pip (Python package manager)

### Setup

```bash
# Install dependencies
npm run rpa:install

# Or manually:
cd packages/rpa
npm install
npm run build
pip3 install -r storm/requirements.txt
```

### Environment Variables

Create a `.env` file in the project root or set these environment variables:

```bash
# Required (at least one):
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional (for alternative search engines):
YDC_API_KEY=your_you_com_api_key
BING_SEARCH_API_KEY=your_bing_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## Usage

### Command Line

```bash
# Basic usage
npm run rpa --topic "Sonic Symbols in Yoga"

# With options
npm run rpa --topic "Machine Learning in Healthcare" --model gpt-4o --search bing --pages 15

# Full options
npm run rpa -- \
  --topic "Quantum Computing Applications" \
  --output ./papers \
  --model gpt-4o \
  --search duckduckgo \
  --pages 12
```

### Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--topic` | `-t` | required | Research topic |
| `--output` | `-o` | `./output` | Output directory |
| `--model` | `-m` | `gpt-4o` | Language model |
| `--search` | `-s` | `duckduckgo` | Search engine |
| `--pages` | `-p` | `12` | Target page count |
| `--python` | | `python3` | Python command |
| `--install-deps` | | `false` | Install Python deps |
| `--json` | | `false` | JSON output |

### Supported Models

- `gpt-4o` (recommended)
- `gpt-4-turbo`
- `gpt-3.5-turbo`
- `claude-3-5-sonnet-20241022`

### Supported Search Engines

- `duckduckgo` (default, no API key required)
- `you` (requires YDC_API_KEY)
- `bing` (requires BING_SEARCH_API_KEY)
- `tavily` (requires TAVILY_API_KEY)

## Programmatic Usage

```typescript
import { ResearchPaperAgent } from '@thehackersplaybook/rpa';

const agent = new ResearchPaperAgent({
  outputDir: './papers',
  model: 'gpt-4o',
  searchEngine: 'duckduckgo',
  maxPages: 12,
});

const result = await agent.generate('Sonic Symbols in Yoga');
console.log(result.article);
```

## Output Structure

Generated papers are saved in the output directory with the following structure:

```
output/
└── Topic_Name_20250101_120000/
    ├── metadata.json
    └── Topic Name/
        ├── storm_gen_outline.txt
        ├── storm_gen_article.txt
        └── storm_gen_article_polished.txt
```

## How It Works

RPA uses the Stanford STORM pipeline:

1. **Perspective Discovery**: Identifies diverse viewpoints on the topic
2. **Simulated Conversations**: AI experts discuss the topic from different angles
3. **Information Curation**: Gathers and organizes research from web sources
4. **Outline Generation**: Creates a structured outline for the paper
5. **Article Generation**: Writes comprehensive content with citations
6. **Polish & Refinement**: Final editing pass for coherence and quality

## Credits

- **Stanford STORM**: [github.com/stanford-oval/storm](https://github.com/stanford-oval/storm)
- Research by Stanford's Open Virtual Assistant Lab (OVAL)

## License

MIT License

Copyright (c) 2025 Aditya Patange

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Research Paper Agent (RPA)** - *Automated Academic Research Made Simple*

Copyright (c) 2025 Aditya Patange. All rights reserved.
