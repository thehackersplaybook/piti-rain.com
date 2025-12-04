#!/usr/bin/env node
/**
 * Research Paper Agent (RPA) - Command Line Interface
 *
 * Copyright (c) 2025 Aditya Patange. All rights reserved.
 * Licensed under MIT License.
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { config as dotenvConfig } from 'dotenv';
import { ResearchPaperAgent } from './agent.js';
import {
  VERSION,
  AUTHOR,
  BANNER,
  SUPPORTED_MODELS,
  SUPPORTED_SEARCH_ENGINES,
} from './constants.js';

// Load environment variables
dotenvConfig();

const program = new Command();

program
  .name('rpa')
  .description('Research Paper Agent - Generate research papers using Stanford STORM')
  .version(`${VERSION} by ${AUTHOR}`, '-v, --version')
  .option('-t, --topic <topic>', 'Research topic (required)')
  .option('-o, --output <dir>', 'Output directory', './output')
  .option('-m, --model <model>', `Language model (${SUPPORTED_MODELS.join(', ')})`, 'gpt-4o')
  .option('-s, --search <engine>', `Search engine (${SUPPORTED_SEARCH_ENGINES.join(', ')})`, 'duckduckgo')
  .option('-p, --pages <number>', 'Target number of pages', '12')
  .option('--python <command>', 'Python command to use', 'python3')
  .option('--install-deps', 'Install Python dependencies before running')
  .option('--json', 'Output result as JSON')
  .addHelpText('after', `
Examples:
  $ npm run rpa --topic "Sonic Symbols in Yoga"
  $ rpa -t "Machine Learning in Healthcare" -m gpt-4o -s bing
  $ rpa --topic "Quantum Computing" --pages 15 --output ./papers

Environment Variables:
  OPENAI_API_KEY      OpenAI API key (required for GPT models)
  ANTHROPIC_API_KEY   Anthropic API key (for Claude models)
  YDC_API_KEY         You.com API key (for You search)
  BING_SEARCH_API_KEY Bing Search API key (for Bing search)
  TAVILY_API_KEY      Tavily API key (for Tavily search)

Copyright (c) 2025 ${AUTHOR}. All rights reserved.
Powered by Stanford STORM.
`);

export async function runCLI(args?: string[]): Promise<void> {
  program.parse(args);
  const opts = program.opts();

  // Display banner
  console.log(chalk.cyan(BANNER));

  // Validate topic
  if (!opts.topic) {
    console.error(chalk.red('Error: --topic is required'));
    console.log(chalk.yellow('Usage: npm run rpa --topic "Your Research Topic"'));
    process.exit(1);
  }

  // Validate API keys
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;

  if (!hasOpenAI && !hasAnthropic) {
    console.error(chalk.red('Error: No API key found'));
    console.log(chalk.yellow('Please set OPENAI_API_KEY or ANTHROPIC_API_KEY environment variable'));
    process.exit(1);
  }

  // Create agent
  const agent = new ResearchPaperAgent({
    outputDir: opts.output,
    model: opts.model,
    searchEngine: opts.search,
    maxPages: parseInt(opts.pages, 10),
    pythonCommand: opts.python,
  });

  // Install dependencies if requested
  if (opts.installDeps) {
    const depsSpinner = ora('Installing Python dependencies...').start();
    try {
      await agent.ensureDependencies();
      depsSpinner.succeed('Python dependencies installed');
    } catch (err) {
      depsSpinner.fail('Failed to install dependencies');
      console.error(chalk.red((err as Error).message));
      process.exit(1);
    }
  }

  // Generate research paper
  console.log(chalk.blue(`\nTopic: ${opts.topic}`));
  console.log(chalk.blue(`Model: ${opts.model}`));
  console.log(chalk.blue(`Search Engine: ${opts.search}`));
  console.log(chalk.blue(`Target Pages: ${opts.pages}`));
  console.log(chalk.blue(`Output: ${opts.output}\n`));

  const spinner = ora({
    text: 'Generating research paper...',
    spinner: 'dots12',
  }).start();

  try {
    spinner.text = 'Phase 1: Research and perspective gathering...';
    const result = await agent.generate(opts.topic);

    spinner.succeed('Research paper generated successfully!');

    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(chalk.green('\n' + '═'.repeat(60)));
      console.log(chalk.green.bold(`RESEARCH PAPER: ${opts.topic}`));
      console.log(chalk.green('═'.repeat(60) + '\n'));

      if (result.article) {
        console.log(result.article);
      } else {
        console.log(chalk.yellow('Article content available in output directory'));
      }

      console.log(chalk.green('\n' + '═'.repeat(60)));
      console.log(chalk.cyan(`Output saved to: ${result.outputDir}`));
      console.log(chalk.green('═'.repeat(60) + '\n'));
    }
  } catch (err) {
    spinner.fail('Failed to generate research paper');
    console.error(chalk.red((err as Error).message));

    if (opts.json) {
      console.log(JSON.stringify({ success: false, error: (err as Error).message }, null, 2));
    }

    process.exit(1);
  }
}

// Run CLI if executed directly
runCLI();
