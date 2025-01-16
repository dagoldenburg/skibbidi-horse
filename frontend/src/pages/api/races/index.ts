import { NextApiRequest, NextApiResponse } from 'next';
import { Race } from '../../../types/race';

const mockRaces: Race[] = [
  {
    id: 1,
    name: 'V75 Solvalla',
    date: '2024-01-20',
    time: '15:00',
    type: 'V75',
    confidence: 85,
    races: 7,
    prize: '10 000 000 kr',
    track: 'Solvalla'
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Race[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(mockRaces);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 