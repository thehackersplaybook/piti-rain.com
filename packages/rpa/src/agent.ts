/**
 * Research Paper Agent (RPA) - Core Agent
 *
 * Copyright (c) 2025 Aditya Patange. All rights reserved.
 * Licensed under MIT License.
 */

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { DEFAULT_CONFIG, VERSION, AUTHOR } from './constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface RPAConfig {
  outputDir?: string;
  model?: string;
  searchEngine?: string;
  maxPages?: number;
  pythonCommand?: string;
}

export interface RPAResult {
  success: boolean;
  topic: string;
  timestamp: string;
  outputDir: string;
  article?: string;
  outline?: string;
  model: string;
  searchEngine: string;
  version: string;
  author: string;
  error?: string;
}

export class ResearchPaperAgent {
  private config: Required<RPAConfig>;
  private pythonScriptPath: string;

  constructor(config: RPAConfig = {}) {
    this.config = {
      outputDir: config.outputDir ?? DEFAULT_CONFIG.outputDir,
      model: config.model ?? DEFAULT_CONFIG.model,
      searchEngine: config.searchEngine ?? DEFAULT_CONFIG.searchEngine,
      maxPages: config.maxPages ?? DEFAULT_CONFIG.maxPages,
      pythonCommand: config.pythonCommand ?? DEFAULT_CONFIG.pythonCommand,
    };

    // Resolve Python script path relative to this module
    this.pythonScriptPath = join(__dirname, '..', 'storm', 'runner.py');
  }

  /**
   * Ensure Python dependencies are installed
   */
  async ensureDependencies(): Promise<void> {
    const requirementsPath = join(__dirname, '..', 'storm', 'requirements.txt');

    if (!existsSync(requirementsPath)) {
      throw new Error('Requirements file not found');
    }

    return new Promise((resolve, reject) => {
      const proc = spawn(this.config.pythonCommand, [
        '-m', 'pip', 'install', '-q', '-r', requirementsPath
      ], {
        stdio: 'inherit',
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Failed to install dependencies (exit code: ${code})`));
        }
      });

      proc.on('error', (err) => {
        reject(new Error(`Failed to run pip: ${err.message}`));
      });
    });
  }

  /**
   * Generate a research paper on the given topic
   */
  async generate(topic: string): Promise<RPAResult> {
    // Ensure output directory exists
    if (!existsSync(this.config.outputDir)) {
      mkdirSync(this.config.outputDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      const args = [
        this.pythonScriptPath,
        '--topic', topic,
        '--output', this.config.outputDir,
        '--model', this.config.model,
        '--search', this.config.searchEngine,
        '--pages', this.config.maxPages.toString(),
        '--json',
      ];

      let stdout = '';
      let stderr = '';

      const proc = spawn(this.config.pythonCommand, args, {
        env: { ...process.env },
      });

      proc.stdout.on('data', (data) => {
        stdout += data.toString();
        // Stream output for progress
        process.stdout.write(data);
      });

      proc.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(data);
      });

      proc.on('close', (code) => {
        if (code === 0) {
          try {
            // Find JSON in output (after banner)
            const jsonMatch = stdout.match(/\{[\s\S]*\}$/);
            if (jsonMatch) {
              const result = JSON.parse(jsonMatch[0]) as RPAResult;
              resolve(result);
            } else {
              resolve({
                success: true,
                topic,
                timestamp: new Date().toISOString(),
                outputDir: this.config.outputDir,
                model: this.config.model,
                searchEngine: this.config.searchEngine,
                version: VERSION,
                author: AUTHOR,
              });
            }
          } catch {
            resolve({
              success: true,
              topic,
              timestamp: new Date().toISOString(),
              outputDir: this.config.outputDir,
              model: this.config.model,
              searchEngine: this.config.searchEngine,
              version: VERSION,
              author: AUTHOR,
            });
          }
        } else {
          reject(new Error(`Research paper generation failed: ${stderr || 'Unknown error'}`));
        }
      });

      proc.on('error', (err) => {
        reject(new Error(`Failed to run Python script: ${err.message}`));
      });
    });
  }

  /**
   * Get the version string
   */
  static get version(): string {
    return VERSION;
  }

  /**
   * Get the author string
   */
  static get author(): string {
    return AUTHOR;
  }
}
