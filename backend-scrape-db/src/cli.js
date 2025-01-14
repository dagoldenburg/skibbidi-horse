#!/usr/bin/env node

import { program } from 'commander';
import { scrapeRaces } from './services/scraper.js';
import { format } from 'date-fns';
import { DatabaseService } from './services/database.js';
import { RaceAnalysisService } from './services/analysis.js';

program
    .name('horse')
    .description('Horse racing data tools')
    .version('1.0.0');

program
    .command('scrape')
    .description('Scrape race data from ATG')
    .option('-d, --days <number>', 'Number of days to scrape backwards', '1')
    .option('-s, --start-date <date>', 'Start date (YYYY-MM-DD)', format(new Date(), 'yyyy-MM-dd'))
    .option('-t, --threads <number>', 'Number of parallel threads', '4')
    .action(async (options) => {
        try {
            await scrapeRaces(options.startDate, parseInt(options.days), parseInt(options.threads));
            console.log('Scraping completed successfully');
        } catch (error) {
            console.error('Error during scraping:', error.message);
            process.exit(1);
        }
    });

program
    .command('parse')
    .description('Parse and insert race data into database')
    .option('-i, --initialize', 'Initialize/reset the database before parsing', false)
    .action(async (options) => {
        try {
            const database = new DatabaseService();
            
            if (options.initialize) {
                console.log('Initializing database...');
                await database.initialize();
            }

            console.log('Starting data parsing...');
            const processedFiles = await database.parseAndInsertData();
            console.log(`Successfully completed. Processed ${processedFiles} files.`);
        } catch (error) {
            console.error('Error during parsing:', error.message);
            process.exit(1);
        }
    });

program
    .command('analyze')
    .description('Analyze feature importance in horse racing outcomes')
    .option('-l, --limit <number>', 'Number of races to analyze (default: all races)', parseInt)
    .option('-c, --chunk-size <number>', 'Size of data chunks to process at once (default: 1000)', parseInt, 1000)
    .action(async (options) => {
        try {
            console.log('Starting feature importance analysis...');
            if (options.limit) {
                console.log(`Analyzing ${options.limit.toLocaleString()} races...`);
            } else {
                console.log('Analyzing all available races...');
            }
            
            const analyzer = new RaceAnalysisService();
            const results = await analyzer.getTopPerformingFeatures(options.limit, options.chunkSize);
            
            if (!results.categorical.length && !results.numerical.length) {
                console.log('\nNo significant features found. Please ensure you have enough race data in the database.');
                process.exit(0);
            }

            if (results.categorical.length > 0) {
                console.log('\nCategorical Features Impact Analysis:');
                console.log('--------------------------------');
                results.categorical.forEach(feature => {
                    console.log(`\n${feature.feature.toUpperCase()} (Impact Score: ${(feature.impact * 100).toFixed(2)}%)`);
                    console.log('Values by Win Rate:');
                    feature.values.forEach(value => {
                        const winRateFormatted = (value.winRate * 100).toFixed(2);
                        const bar = '█'.repeat(Math.floor(value.winRate * 50)); // Visual bar
                        console.log(`  ${value.value.padEnd(15)} ${winRateFormatted}% ${bar} (${value.totalRaces} races)`);
                    });
                });
            }

            if (results.numerical.length > 0) {
                console.log('\nNumerical Features Correlation Analysis:');
                console.log('--------------------------------');
                results.numerical.forEach(feature => {
                    const correlation = feature.correlation * 100;
                    const direction = correlation > 0 ? 'positive' : 'negative';
                    const strength = Math.abs(correlation);
                    const bar = '█'.repeat(Math.floor(Math.abs(correlation)));
                    
                    console.log(`\n${feature.feature.toUpperCase()}`);
                    console.log(`Correlation: ${correlation.toFixed(2)}% ${bar}`);
                    console.log(`Direction: ${direction} (${strength.toFixed(2)}% strength)`);
                    console.log(`Sample Size: ${feature.sampleSize.toLocaleString()} races`);
                });
            }

            console.log('\nAnalysis complete!');
        } catch (error) {
            console.error('\nError during analysis:', error.message);
            console.log('\nTroubleshooting steps:');
            console.log('1. Ensure you have run the "parse" command to import race data');
            console.log('2. Check if the database file exists and is accessible');
            console.log('3. Verify that the imported data contains the expected features');
            process.exit(1);
        }
    });

program.parse();
