import { Race, DetailedRace, PreviousRace } from '../types/race';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async getUpcomingRaces(): Promise<Race[]> {
    return this.get<Race[]>('/races');
  }

  async getRaceById(id: string): Promise<DetailedRace> {
    return this.get<DetailedRace>(`/races/${id}`);
  }

  async getPreviousRaces(): Promise<PreviousRace[]> {
    return this.get<PreviousRace[]>('/races/previous');
  }
}

export const apiService = new ApiService(); 