/**
 * Research Paper Agent (RPA) - Constants
 *
 * Copyright (c) 2025 Aditya Patange. All rights reserved.
 * Licensed under MIT License.
 */

export const VERSION = '1.0.0';
export const AUTHOR = 'Aditya Patange';
export const LICENSE = 'MIT';

export const BANNER = `
╔══════════════════════════════════════════════════════════════════╗
║         Research Paper Agent (RPA) v${VERSION}                      ║
║         Copyright (c) 2025 ${AUTHOR}                        ║
║         Powered by Stanford STORM                                ║
╚══════════════════════════════════════════════════════════════════╝
`;

export const DEFAULT_CONFIG = {
  outputDir: './output',
  model: 'gpt-4o',
  searchEngine: 'duckduckgo',
  maxPages: 12,
  pythonCommand: 'python3',
} as const;

export const SUPPORTED_MODELS = [
  'gpt-4o',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
  'claude-3-5-sonnet-20241022',
] as const;

export const SUPPORTED_SEARCH_ENGINES = [
  'duckduckgo',
  'you',
  'bing',
  'tavily',
] as const;
