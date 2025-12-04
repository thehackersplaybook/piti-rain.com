/**
 * Research Paper Agent (RPA)
 *
 * Copyright (c) 2025 Aditya Patange. All rights reserved.
 * Licensed under MIT License.
 *
 * A production-grade wrapper over Stanford's STORM system for generating
 * comprehensive research papers on any given topic.
 *
 * @packageDocumentation
 */

export { ResearchPaperAgent, type RPAConfig, type RPAResult } from './agent.js';
export { runCLI } from './cli.js';
export { VERSION, AUTHOR, LICENSE } from './constants.js';
