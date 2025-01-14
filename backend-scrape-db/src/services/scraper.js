import { Worker } from 'worker_threads';
import { format, subDays, parseISO } from 'date-fns';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWorker(date) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'scraper.worker.js'));
    
    worker.on('message', (message) => {
      if (message.type === 'success') {
        resolve(message.results);
      } else {
        reject(new Error(message.error));
      }
    });
    
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
    
    worker.postMessage(date);
  });
}

async function processBatch(dates, maxThreads) {
  const results = [];
  
  // Process dates in chunks based on maxThreads
  for (let i = 0; i < dates.length; i += maxThreads) {
    const batch = dates.slice(i, i + maxThreads);
    const workers = batch.map(date => createWorker(date));
    
    try {
      const batchResults = await Promise.all(workers);
      results.push(...batchResults);
      
      // Log progress
      const progress = Math.min(i + maxThreads, dates.length);
      console.log(`Processed ${progress}/${dates.length} dates`);
      
      // Small delay between batches to prevent rate limiting
      if (i + maxThreads < dates.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error processing batch:', error.message);
      // Continue with next batch even if one fails
    }
  }
  
  return results;
}

export async function scrapeRaces(startDate, days = 1, threads = 4) {
  try {
    const startDateObj = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const dates = [];
    
    // Generate array of dates to scrape
    for (let i = 0; i < days; i++) {
      const currentDate = subDays(startDateObj, i);
      dates.push(format(currentDate, 'yyyy-MM-dd'));
    }
    
    console.log(`Starting scrape for ${dates.length} dates using ${threads} threads`);
    const results = await processBatch(dates, threads);
    
    // Log summary
    const totalSuccess = results.reduce((sum, r) => sum + r.success.length, 0);
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    
    console.log('\nScraping Summary:');
    console.log(`Total games scraped: ${totalSuccess}`);
    console.log(`Total errors: ${totalErrors}`);
    
    if (totalErrors > 0) {
      console.log('\nErrors encountered:');
      results.forEach(r => {
        if (r.errors.length > 0) {
          console.log(`\nDate ${r.date}:`);
          r.errors.forEach(e => console.log(`- ${e.id || 'Calendar'}: ${e.error}`));
        }
      });
    }
  } catch (error) {
    throw new Error(`Failed to scrape races: ${error.message}`);
  }
}
