import { parentPort } from 'worker_threads';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

const ATG_BASE_URL = 'https://www.atg.se/services/racinginfo/v1/api';
const RAW_DATA_DIR = './data/raw';

async function fetchCalendarData(date) {
  const url = `${ATG_BASE_URL}/calendar/day/${date}`;
  const response = await axios.get(url);
  return response.data;
}

async function fetchGameData(gameId) {
  const url = `${ATG_BASE_URL}/games/${gameId}`;
  const response = await axios.get(url);
  return response.data;
}

async function saveGameData(gameId, data) {
  const filePath = path.join(RAW_DATA_DIR, `${gameId}.json`);
  await fs.ensureDir(RAW_DATA_DIR);
  await fs.writeJson(filePath, data, { spaces: 2 });
}

async function scrapeDay(date) {
  const results = {
    date,
    success: [],
    errors: []
  };

  try {
    const calendarData = await fetchCalendarData(date);
    const gameTypes = ['V64', 'V65', 'V75', 'V86', 'V4', 'V5'];
    
    for (const gameType of gameTypes) {
      const games = calendarData.games[gameType] || [];
      
      for (const game of games) {
        try {
          const gameData = await fetchGameData(game.id);
          
          if (gameData) {
            await saveGameData(game.id, gameData);
            results.success.push(game.id);
          }
        } catch (error) {
          if (error.response?.status !== 404) {
            results.errors.push({ id: game.id, error: error.message });
          }
        }
      }
    }
  } catch (error) {
    results.errors.push({ date, error: error.message });
  }

  return results;
}

// Handle messages from the main thread
parentPort.on('message', async (date) => {
  try {
    const results = await scrapeDay(date);
    parentPort.postMessage({ type: 'success', results });
  } catch (error) {
    parentPort.postMessage({ type: 'error', error: error.message });
  }
});
