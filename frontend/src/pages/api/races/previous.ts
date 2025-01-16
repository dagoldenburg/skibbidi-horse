import { NextApiRequest, NextApiResponse } from 'next';
import { PreviousRace } from '../../../types/race';

const mockPreviousRaces: PreviousRace[] = [
  {
    id: 1,
    event: 'V75',
    track: 'Mantorp',
    date: '2023-12-30',
    totalWinnings: '94 744',
    races: [
      { 
        number: 1, 
        winner: 1, 
        picks: [1], 
        label: 'EDDIE THE EAGLE',
        distance: '2140m',
        class: 'Gulddivisionen',
        winningTime: '1.11,4',
        odds: '3.45',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      }
    ],
    payouts: [
      { correct: 7, amount: '70 855', count: 1, total: '70 855' },
      { correct: 6, amount: '702', count: 20, total: '14 040' },
      { correct: 5, amount: '67', count: 147, total: '9 849' }
    ],
    statistics: {
      averageOdds: 8.64,
      favoriteWins: 3,
      longshots: 2,
      averageWinningMargin: '2 längder',
      totalPrizePool: '4 850 000 kr'
    }
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreviousRace[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(mockPreviousRaces);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 