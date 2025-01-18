'use client'
import { Box, Typography, Card, CardContent, Button, Chip, LinearProgress, Container, IconButton, Grid } from '@mui/material';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Mock data for upcoming races
const upcomingRaces = [
  {
    id: 1,
    name: 'V75 Solvalla',
    date: '2024-01-20',
    time: '15:00',
    type: 'V75',
    confidence: 85,
    races: 7,
    prize: '10 000 000 kr',
  },
  {
    id: 2,
    name: 'V86 Åby',
    date: '2024-01-22',
    time: '19:30',
    type: 'V86',
    confidence: 78,
    races: 8,
    prize: '8 500 000 kr',
  },
  {
    id: 3,
    name: 'V75 Jägersro',
    date: '2024-01-27',
    time: '14:45',
    type: 'V75',
    confidence: 92,
    races: 7,
    prize: '12 000 000 kr',
  },
];

// Mock data for recent predictions
const recentPredictions = [
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
      },
      { 
        number: 2, 
        winner: 4, 
        picks: [4, 11],
        distance: '1640m',
        class: 'Silverdivisionen',
        winningTime: '1.10,8',
        odds: '6.82',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      },
      { 
        number: 3, 
        winner: 5, 
        picks: [2, 5, 6, 7],
        distance: '2140m',
        class: 'Bronsdivisionen',
        winningTime: '1.12,2',
        odds: '8.75',
        analytics: {
          paceRating: 'Lågt',
          trackCondition: 'Fast',
          winningMargin: '3 längder'
        }
      },
      { 
        number: 4, 
        winner: 4, 
        picks: [2, 4, 5, 6, 7],
        distance: '1640m',
        class: 'Klass II',
        winningTime: '1.11,6',
        odds: '12.40',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '1/2 längd'
        }
      },
      { 
        number: 5, 
        winner: 8, 
        picks: [1, 2, 3, 8, 9, 10, 11, 12, 13],
        distance: '2140m',
        class: 'Klass I',
        winningTime: '1.12,8',
        odds: '15.20',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '4 längder'
        }
      },
      { 
        number: 6, 
        winner: 5, 
        picks: [5], 
        label: 'ICEBREAKER',
        distance: '2140m',
        class: 'Stolopp',
        winningTime: '1.11,9',
        odds: '4.25',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 7, 
        winner: 6, 
        picks: [4, 5, 6, 9, 10],
        distance: '2640m',
        class: 'Gulddivisionen Final',
        winningTime: '1.13,4',
        odds: '9.65',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
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
  },
  {
    id: 2,
    event: 'V75',
    track: 'Solvalla',
    date: '2023-12-23',
    totalWinnings: '24 238',
    races: [
      { 
        number: 1, 
        winner: 3, 
        picks: [3, 8, 12], 
        label: 'GLOBAL MONEY',
        distance: '2140m',
        class: 'Gulddivisionen',
        winningTime: '1.11,4',
        odds: '3.45',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 2, 
        winner: 1, 
        picks: [1, 4],
        distance: '1640m',
        class: 'Silverdivisionen',
        winningTime: '1.10,8',
        odds: '6.82',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      },
      { 
        number: 3, 
        winner: 6, 
        picks: [2, 6, 9],
        distance: '2140m',
        class: 'Bronsdivisionen',
        winningTime: '1.12,2',
        odds: '8.75',
        analytics: {
          paceRating: 'Lågt',
          trackCondition: 'Fast',
          winningMargin: '3 längder'
        }
      },
      { 
        number: 4, 
        winner: 2, 
        picks: [2, 7],
        distance: '1640m',
        class: 'Klass II',
        winningTime: '1.11,6',
        odds: '12.40',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '1/2 längd'
        }
      },
      { 
        number: 5, 
        winner: 11, 
        picks: [4, 8, 11, 15],
        distance: '2140m',
        class: 'Klass I',
        winningTime: '1.12,8',
        odds: '15.20',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '4 längder'
        }
      },
      { 
        number: 6, 
        winner: 4, 
        picks: [4], 
        label: 'POWER PLAY',
        distance: '1640m',
        class: 'Stolopp',
        winningTime: '1.11,9',
        odds: '4.25',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 7, 
        winner: 8, 
        picks: [5, 8, 12],
        distance: '2640m',
        class: 'Gulddivisionen Final',
        winningTime: '1.13,4',
        odds: '9.65',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      }
    ],
    payouts: [
      { correct: 6, amount: '892', count: 15, total: '13 380' },
      { correct: 5, amount: '89', count: 122, total: '10 858' }
    ],
    statistics: {
      averageOdds: 8.64,
      favoriteWins: 3,
      longshots: 2,
      averageWinningMargin: '2 längder',
      totalPrizePool: '4 850 000 kr'
    }
  },
  {
    id: 3,
    event: 'V75',
    track: 'Åby',
    date: '2023-12-16',
    totalWinnings: '193 350',
    races: [
      { 
        number: 1, 
        winner: 5, 
        picks: [5, 7, 9],
        label: 'NIGHT RIDER',
        distance: '2140m',
        class: 'Gulddivisionen',
        winningTime: '1.11,4',
        odds: '3.45',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 2, 
        winner: 2, 
        picks: [2],
        label: 'NIGHT RIDER',
        distance: '1640m',
        class: 'Silverdivisionen',
        winningTime: '1.10,8',
        odds: '6.82',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      },
      { 
        number: 3, 
        winner: 4, 
        picks: [4, 8, 11],
        distance: '2140m',
        class: 'Bronsdivisionen',
        winningTime: '1.12,2',
        odds: '8.75',
        analytics: {
          paceRating: 'Lågt',
          trackCondition: 'Fast',
          winningMargin: '3 längder'
        }
      },
      { 
        number: 4, 
        winner: 1, 
        picks: [1, 3, 6],
        distance: '1640m',
        class: 'Klass II',
        winningTime: '1.11,6',
        odds: '12.40',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '1/2 längd'
        }
      },
      { 
        number: 5, 
        winner: 7, 
        picks: [7, 12, 14],
        distance: '2140m',
        class: 'Klass I',
        winningTime: '1.12,8',
        odds: '15.20',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '4 längder'
        }
      },
      { 
        number: 6, 
        winner: 3, 
        picks: [3, 5, 8],
        distance: '1640m',
        class: 'Stolopp',
        winningTime: '1.11,9',
        odds: '4.25',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 7, 
        winner: 9, 
        picks: [4, 9, 11],
        distance: '2640m',
        class: 'Gulddivisionen Final',
        winningTime: '1.13,4',
        odds: '9.65',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      }
    ],
    payouts: [
      { correct: 7, amount: '168 442', count: 1, total: '168 442' },
      { correct: 6, amount: '1 245', count: 12, total: '14 940' },
      { correct: 5, amount: '112', count: 89, total: '9 968' }
    ],
    statistics: {
      averageOdds: 8.64,
      favoriteWins: 3,
      longshots: 2,
      averageWinningMargin: '2 längder',
      totalPrizePool: '4 850 000 kr'
    }
  },
  {
    id: 4,
    event: 'V75',
    track: 'Jägersro',
    date: '2023-12-09',
    totalWinnings: '21 960',
    races: [
      { 
        number: 1, 
        winner: 6, 
        picks: [2, 6, 8],
        label: 'FAST TRACK',
        distance: '2140m',
        class: 'Gulddivisionen',
        winningTime: '1.11,4',
        odds: '3.45',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 2, 
        winner: 4, 
        picks: [4, 7, 11],
        distance: '1640m',
        class: 'Silverdivisionen',
        winningTime: '1.10,8',
        odds: '6.82',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      },
      { 
        number: 3, 
        winner: 1, 
        picks: [1],
        label: 'FAST TRACK',
        distance: '2140m',
        class: 'Bronsdivisionen',
        winningTime: '1.12,2',
        odds: '8.75',
        analytics: {
          paceRating: 'Lågt',
          trackCondition: 'Fast',
          winningMargin: '3 längder'
        }
      },
      { 
        number: 4, 
        winner: 8, 
        picks: [3, 8, 12],
        distance: '1640m',
        class: 'Klass II',
        winningTime: '1.11,6',
        odds: '12.40',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '1/2 längd'
        }
      },
      { 
        number: 5, 
        winner: 5, 
        picks: [5, 9],
        distance: '2140m',
        class: 'Klass I',
        winningTime: '1.12,8',
        odds: '15.20',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '4 längder'
        }
      },
      { 
        number: 6, 
        winner: 12, 
        picks: [6, 12, 15],
        distance: '1640m',
        class: 'Stolopp',
        winningTime: '1.11,9',
        odds: '4.25',
        analytics: {
          paceRating: 'Högt',
          trackCondition: 'Fast',
          winningMargin: '2 längder'
        }
      },
      { 
        number: 7, 
        winner: 3, 
        picks: [3, 7, 10],
        distance: '2640m',
        class: 'Gulddivisionen Final',
        winningTime: '1.13,4',
        odds: '9.65',
        analytics: {
          paceRating: 'Medel',
          trackCondition: 'Fast',
          winningMargin: '1 längd'
        }
      }
    ],
    payouts: [
      { correct: 6, amount: '1 567', count: 8, total: '12 536' },
      { correct: 5, amount: '124', count: 76, total: '9 424' }
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

export default function Home() {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const upcomingScrollRef = useRef(null);

  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 280;
      const currentScroll = ref.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      ref.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleRaceClick = (raceId) => {
    router.push(`/race/${raceId}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 } }}>
        <Box sx={{ 
          position: 'relative',
          height: { xs: '500px', sm: '400px' },
          width: '100%',
          mb: { xs: 4, sm: 6 },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          borderRadius: { xs: 2, sm: 3 },
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) => `linear-gradient(
              to right, 
              #00000088,
              #00000088,
              ${theme.palette.primary[400]}22
            )`,
            zIndex: 1,
            borderRadius: 'inherit',
          }
        }}>
          <Box sx={{
            position: 'absolute', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
          }}>
            <Image
              src="/03.png"
              alt="Hero background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 'inherit',
              }}
              priority
            />
          </Box>
          <Container maxWidth="lg">
            <Box sx={{ 
              position: 'relative',
              zIndex: 2,
              color: 'white',
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: '600px',
              mx: { xs: 'auto', md: 0 },
              px: { xs: 2, md: 4 },
            }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  mb: { xs: 3, sm: 2 },
                  color: 'white',
                  fontSize: { xs: '2rem', sm: '2.25rem', md: '4rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                AI för Vinnare
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: { xs: 4, sm: 4 }, 
                  color: 'white', 
                  opacity: 0.95,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                  maxWidth: '460px',
                  mx: { xs: 'auto', md: 0 },
                  textShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                Med marknadens mest avancerade AI-system.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 2, sm: 2 },
                flexWrap: 'wrap',
                mt: 1,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => router.push('/signup')}
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: { xs: 3, sm: 4, md: 5 },
                    py: { xs: 1.25, sm: 1.5 },
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px -2px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Börja Nu
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => router.push('/about')}
                  sx={{
                    borderColor: 'white',
                    borderWidth: 2,
                    color: 'white',
                    px: { xs: 3, sm: 4, md: 5 },
                    py: { xs: 1.25, sm: 1.5 },
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Läs Mer
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>

      {/* Upcoming Races Section */}
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: { xs: 2, sm: 3 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                color: '#1f2937',
                mb: 0.5,
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Kommande Lopp
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#6b7280',
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Nästa veckas spännande V75 och V86
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}>
            <IconButton 
              onClick={() => handleScroll('left', upcomingScrollRef)}
              sx={{ 
                bgcolor: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                width: { xs: 36, sm: 32 },
                height: { xs: 36, sm: 32 },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
            </IconButton>
            <IconButton 
              onClick={() => handleScroll('right', upcomingScrollRef)}
              sx={{ 
                bgcolor: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                width: { xs: 36, sm: 32 },
                height: { xs: 36, sm: 32 },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
            </IconButton>
          </Box>
        </Box>

        <Box 
          ref={upcomingScrollRef}
          sx={{ 
            display: 'flex',
            gap: { xs: 1.5, sm: 2 },
            overflow: 'hidden',
            pb: 1,
            mb: { xs: 4, sm: 6 },
            pt: 2,
            mx: -2,
            px: 2,
            '-webkit-overflow-scrolling': 'touch'
          }}
        >
          {upcomingRaces.map((race) => (
            <Card 
              key={race.id}
              sx={{ 
                width: { xs: 260, sm: 280 },
                flexShrink: 0,
                bgcolor: (theme) => theme.palette.background.paper,
                border: '1px solid',
                borderColor: (theme) => theme.palette.divider,
                position: 'relative',
                overflow: 'visible',
                boxShadow: 'none',
                borderRadius: { xs: 2, sm: 3 },
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => handleRaceClick(race.id)}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Chip 
                  label={race.type} 
                  color="primary" 
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    height: 20,
                    mb: 2,
                  }}
                />
                <Typography sx={{ 
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.primary,
                  mb: 1,
                  lineHeight: 1.3,
                }}>
                  {race.name}
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    mb: 3,
                  }}
                >
                  {race.date} • {race.time}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}>
                    <Typography 
                      sx={{ 
                        color: '#6b7280',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      AI Konfidens
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: (theme) => theme.palette.grey[900],
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {race.confidence}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={race.confidence} 
                    sx={{ 
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'rgba(37, 99, 235, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        bgcolor: '#2563eb',
                      }
                    }}
                  />
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 2,
                  borderTop: '1px solid #e5e7eb',
                }}>
                  <Box>
                    <Typography 
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        mb: 0.5,
                      }}
                    >
                      Prispott
                    </Typography>
                    <Typography 
                      sx={{
                        color: (theme) => theme.palette.success.main,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {race.prize}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      sx={{
                        color: '#6b7280',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        mb: 0.5,
                      }}
                    >
                      Lopp
                    </Typography>
                    <Typography 
                      sx={{
                        color: '#1f2937',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {race.races} st
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Recent Results Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: { xs: 2, sm: 3 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                color: '#1f2937',
                mb: 0.5,
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Senaste V75-Resultat
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#6b7280',
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Tidigare vinnande system och utdelningar
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}>
            <IconButton 
              onClick={() => handleScroll('left', scrollContainerRef)}
              sx={{ 
                bgcolor: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                width: { xs: 36, sm: 32 },
                height: { xs: 36, sm: 32 },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
            </IconButton>
            <IconButton 
              onClick={() => handleScroll('right', scrollContainerRef)}
              sx={{ 
                bgcolor: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                width: { xs: 36, sm: 32 },
                height: { xs: 36, sm: 32 },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />
            </IconButton>
          </Box>
        </Box>

        <Box 
          ref={scrollContainerRef}
          sx={{ 
            display: 'flex',
            gap: { xs: 1.5, sm: 2 },
            overflow: 'hidden',
            pb: 1,
            pt: 2,
            mx: -2,
            px: 2,
            '-webkit-overflow-scrolling': 'touch'
          }}
        >
          {recentPredictions.map((prediction) => (
            <Card 
              key={prediction.id}
              sx={{
                width: { xs: 260, sm: 280 },
                flexShrink: 0,
                bgcolor: '#ffffff',
                border: '1px solid',
                borderColor: '#e5e7eb',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                borderRadius: { xs: 2, sm: 3 },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#1f2937',
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {prediction.event} • {prediction.track}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                    }}
                  >
                    {prediction.date}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  {prediction.races.map((race) => (
                    <Box 
                      key={race.number}
                      sx={{
                        mb: 1,
                        '&:last-child': { mb: 0 }
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.25rem 0.5rem',
                        alignItems: 'center',
                      }}>
                        {race.picks.map((num) => (
                          <Typography
                            key={num}
                            sx={{
                              fontSize: '0.875rem',
                              color: num === race.winner ? '#059669' : '#6b7280',
                              ...(num === race.winner && {
                                fontWeight: 600,
                                bgcolor: '#f0fdf4',
                                px: 1,
                                borderRadius: '50%',
                                border: '1px solid #86efac',
                              })
                            }}
                          >
                            {num}
                          </Typography>
                        ))}
                        {race.label && (
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              color: '#6b7280',
                              fontStyle: 'italic',
                              ml: 1,
                            }}
                          >
                            {race.label}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ 
                  pt: 2, 
                  borderTop: '1px solid #e5e7eb',
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#1f2937',
                        textTransform: 'uppercase',
                      }}
                    >
                      {prediction.payouts[0].correct} RÄTT
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#059669',
                      }}
                    >
                      {prediction.totalWinnings} kr
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
} 