import { NextResponse } from 'next/server';
import { scrapeRaces } from '../../../backend/src/services/scraper.js';
import { DatabaseService } from '../../../backend/src/services/database.js';
import { addDays, subDays, format } from 'date-fns';

export async function POST(request) {
  try {
    // Get current date and calculate default date range
    const currentDate = new Date();
    const defaultEndDate = addDays(currentDate, 7);  // 7 days in future
    const defaultStartDate = subDays(defaultEndDate, 9);  // 9 days back from end date

    // Get parameters from request, use defaults if not provided
    const { 
      startDate = format(defaultStartDate, 'yyyy-MM-dd'),
      endDate = format(defaultEndDate, 'yyyy-MM-dd'),
      days = 9,
      threads = 4 
    } = await request.json() || {};

    // Start the scraping process
    console.log(`Starting scrape from ${startDate} with ${days} days using ${threads} threads`);
    await scrapeRaces(startDate, parseInt(days), parseInt(threads));
    
    // Initialize database and parse the scraped data
    console.log('Scraping completed, starting to parse data...');
    const database = new DatabaseService();
    database.createTables();
    const processedFiles = await database.parseAndInsertData();
    database.close();
    
    return NextResponse.json({
      message: 'Scraping and parsing completed successfully',
      details: {
        startDate,
        endDate,
        days,
        threads,
        processedFiles
      }
    });

  } catch (error) {
    console.error('Error during scraping/parsing:', error);
    return NextResponse.json(
      { error: 'Failed to complete scraping and parsing process', details: error.message },
      { status: 500 }
    );
  }
} 