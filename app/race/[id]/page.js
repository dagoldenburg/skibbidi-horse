'use client'

import { useEffect, useState } from 'react';
import {useParams, useRouter} from 'next/navigation';
import { Box, Container, Typography, Paper, Button, Grid, Collapse } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {createClient} from "@/libs/supabase/client";

// Mock race data (in real app, fetch this from API)
const getRaceData = (id) => ({
  id,
  name: 'V75 Solvalla',
  date: '2024-01-20',
  time: '15:00',
  track: 'Solvalla',
  type: 'V75',
  races: [
    {
      details: {
        raceNumber: 1,
        distance: '2140m',
        startMethod: 'Auto',
        prize: '200 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Snabbt tempo förväntas från start med flera speedhästar i fältet. Spår 1-4 har statistiskt sett en fördel på denna distans.',
        topPicks: {
          favorites: [
            {
              number: 4,
              name: 'GLOBAL WINNER',
              driver: 'Björn Goop',
              trainer: 'Timo Nurmos',
              confidence: "Mycket stark",
              odds: '2.24',
              startPosition: 4,
              recentForm: ['1', '1', '2', '1', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Enastående form med fyra vinster på fem starter',
                'Visat exceptionell slutfart i senaste starterna',
                'Optimal distans för hästens kapacitet'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 1,
              name: 'EDDIE THE EAGLE',
              driver: 'Örjan Kihlström',
              trainer: 'Daniel Redén',
              confidence: "Mycket stark",
              odds: '3.45',
              startPosition: 1,
              recentForm: ['1', '2', '1', '3', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Utmärkt spår för hästen med sin snabba startförmåga',
                'Stark formkurva med tre vinster på senaste fem starterna',
                'Passar perfekt för distansen och banans beskaffenhet'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 6,
              name: 'POWER PLAY',
              driver: 'Peter Ingves',
              trainer: 'Stefan Melander',
              confidence: "Mycket stark",
              odds: '8.50',
              startPosition: 6,
              recentForm: ['2', '1', '1', '4', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark avslutare som gynnas av högt tempo',
                'Visat fin form på sistone',
                'Kan överraska om tempot stämmer'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 8,
            name: 'NIGHT FLYER',
            driver: 'Magnus A Djuse',
            trainer: 'Svante Båth',
            confidence: "Mycket stark",
            odds: '28.40',
            startPosition: 8,
            recentForm: ['4', '1', '6', '2', '3'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Underskattad häst med potential',
              'Passar bra på distansen och banan',
              'Kan överraska om tempot blir högt'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    },
    {
      details: {
        raceNumber: 2,
        distance: '1640m',
        startMethod: 'Auto',
        prize: '150 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Kort distans där startsnabbhet blir avgörande. Flera hästar med hög kapacitet möts här.',
        topPicks: {
          favorites: [
            {
              number: 3,
              name: 'RACING SPIRIT',
              driver: 'Erik Adielsson',
              trainer: 'Reijo Liljendahl',
              confidence: "Mycket stark",
              odds: '2.85',
              startPosition: 3,
              recentForm: ['1', '1', '3', '1', '2'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Explosiv från start och passar perfekt på kort distans',
                'Stark formkurva senaste tiden',
                'Optimal spårposition för sin löpstil'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 5,
              name: 'THUNDER STORM',
              driver: 'Kevin Oscarsson',
              trainer: 'Robert Bergh',
              confidence: "Mycket stark",
              odds: '4.20',
              startPosition: 5,
              recentForm: ['2', '1', '1', '4', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark spurtare som kan avgöra på speed',
                'Bra form och passar distansen',
                'Kan utmana om tempot blir högt'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 7,
              name: 'FAST RUNNER',
              driver: 'Carl Johan Jepson',
              trainer: 'Per Nordström',
              confidence: "Mycket stark",
              odds: '8.90',
              startPosition: 7,
              recentForm: ['3', '1', '2', '1', '4'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Kapabel häst som trivs på Solvalla',
                'Kan överraska med rätt lopp',
                'Bra spurtförmåga om det stämmer'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 9,
            name: 'DARK HORSE',
            driver: 'Ulf Ohlsson',
            trainer: 'Petri Puro',
            confidence: "Mycket stark",
            odds: '34.50',
            startPosition: 9,
            recentForm: ['6', '2', '4', '1', '5'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Har kapacitet för överraskning',
              'Bra spurtare när det stämmer',
              'Kan dyka upp till slut om tempot blir högt'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    },
    {
      details: {
        raceNumber: 3,
        distance: '2140m',
        startMethod: 'Volt',
        prize: '175 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Voltstart där rutinerade hästar har fördel. Jämnt lopp med flera vinstchanser.',
        topPicks: {
          favorites: [
            {
              number: 2,
              name: 'VICTORY LANE',
              driver: 'Jorma Kontio',
              trainer: 'Timo Nurmos',
              confidence: "Mycket stark",
              odds: '3.15',
              startPosition: 2,
              recentForm: ['2', '1', '1', '2', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Rutinerad och säker från voltstart',
                'Stark form och passar distansen',
                'Bra spår för sin löpstil'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 6,
              name: 'SPEED MASTER',
              driver: 'Magnus A Djuse',
              trainer: 'Daniel Redén',
              confidence: "Mycket stark",
              odds: '3.85',
              startPosition: 6,
              recentForm: ['1', '3', '1', '2', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uth��llig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark häst med bra form',
                'Kan avgöra på styrka',
                'Passar bra på distansen'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 4,
              name: 'GOLDEN DREAM',
              driver: 'Rikard N Skoglund',
              trainer: 'Svante Båth',
              confidence: "Mycket stark",
              odds: '7.25',
              startPosition: 4,
              recentForm: ['2', '2', '1', '3', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Jämn och säker häst',
                'Bra form på sistone',
                'Kan överraska med rätt lopp'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 11,
            name: 'WILD CARD',
            driver: 'Kenneth Haugstad',
            trainer: 'Roger Walmann',
            confidence: "Mycket stark",
            odds: '42.80',
            startPosition: 11,
            recentForm: ['5', '1', '4', '3', '2'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Kapabel häst med potential',
              'Kan överraska om det stämmer',
              'Bra spurtare när det klaffar'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    },
    {
      details: {
        raceNumber: 4,
        distance: '2640m',
        startMethod: 'Auto',
        prize: '250 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Långdistans där uthållighet blir avgörande. Flera starka stayerhästar i fältet.',
        topPicks: {
          favorites: [
            {
              number: 5,
              name: 'MARATHON KING',
              driver: 'Örjan Kihlström',
              trainer: 'Daniel Redén',
              confidence: "Mycket stark",
              odds: '2.45',
              startPosition: 5,
              recentForm: ['1', '1', '1', '2', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Specialiserad på långa distanser',
                'Toppform och stark stayer',
                'Perfekt distans för kapaciteten'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 3,
              name: 'ENDURANCE',
              driver: 'Erik Adielsson',
              trainer: 'Timo Nurmos',
              confidence: "Mycket stark",
              odds: '4.10',
              startPosition: 3,
              recentForm: ['2', '1', '1', '1', '3'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark stayer med bra form',
                'Trivs på långa distanser',
                'Kan utmana om segern'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 8,
              name: 'DISTANCE MASTER',
              driver: 'Peter Ingves',
              trainer: 'Roger Walmann',
              confidence: "Mycket stark",
              odds: '9.80',
              startPosition: 8,
              recentForm: ['3', '1', '2', '1', '4'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Rutinerad stayer',
                'Kan avgöra på slutet',
                'Bra form på sistone'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 12,
            name: 'LONG SHOT HERO',
            driver: 'Carl Johan Jepson',
            trainer: 'Per Nordström',
            confidence: "Mycket stark",
            odds: '38.50',
            startPosition: 12,
            recentForm: ['4', '2', '5', '1', '3'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Underskattad stayer',
              'Kan överraska på slutet',
              'Stark när det stämmer'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    },
    {
      details: {
        raceNumber: 5,
        distance: '2140m',
        startMethod: 'Auto',
        prize: '185 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Öppet lopp där flera hästar har vinstchans. Tempot blir avgörande för utgången.',
        topPicks: {
          favorites: [
            {
              number: 7,
              name: 'PERFECT MATCH',
              driver: 'Magnus A Djuse',
              trainer: 'Svante Båth',
              confidence: "Mycket stark",
              odds: '4.50',
              startPosition: 7,
              recentForm: ['1', '2', '1', '3', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark form och bra kapacitet',
                'Kan vinna trots utgångsläget',
                'Passar bra på distansen'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 2,
              name: 'QUICK SILVER',
              driver: 'Jorma Kontio',
              trainer: 'Timo Nurmos',
              confidence: "Mycket stark",
              odds: '5.25',
              startPosition: 2,
              recentForm: ['2', '1', '2', '1', '3'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Bra spår och startsnabb',
                'Jämn och säker',
                'Kan leda länge'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 4,
              name: 'STAR FIGHTER',
              driver: 'Kevin Oscarsson',
              trainer: 'Robert Bergh',
              confidence: "Mycket stark",
              odds: '7.80',
              startPosition: 4,
              recentForm: ['3', '1', '1', '4', '2'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Bra form på sistone',
                'Kan överraska med rätt lopp',
                'Stark spurtare'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 10,
            name: 'SURPRISE MAKER',
            driver: 'Ulf Ohlsson',
            trainer: 'Petri Puro',
            confidence: "Mycket stark",
            odds: '45.00',
            startPosition: 10,
            recentForm: ['5', '2', '4', '1', '6'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Kan överraska på kapacitet',
              'Bra spurtare när det stämmer',
              'Underskattad form'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    },
    {
      details: {
        raceNumber: 6,
        distance: '1640m',
        startMethod: 'Auto',
        prize: '165 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Kort distans där startsnabbhet blir avgörande. Flera speedhästar möts.',
        topPicks: {
          favorites: [
            {
              number: 1,
              name: 'SPEED KING',
              driver: 'Björn Goop',
              trainer: 'Daniel Redén',
              confidence: "Mycket stark",
              odds: '3.25',
              startPosition: 1,
              recentForm: ['1', '1', '2', '1', '2'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Perfekt spår för sin startsnabbhet',
                'Stark form och passar distansen',
                'Kan leda från start till mål'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 6,
              name: 'FLASH GORDON',
              driver: 'Erik Adielsson',
              trainer: 'Reijo Liljendahl',
              confidence: "Mycket stark",
              odds: '5.50',
              startPosition: 6,
              recentForm: ['2', '1', '1', '3', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark spurtare',
                'Bra form på sistone',
                'Kan avgöra på speed'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 3,
              name: 'QUICK STAR',
              driver: 'Örjan Kihlström',
              trainer: 'Timo Nurmos',
              confidence: "Mycket stark",
              odds: '6.80',
              startPosition: 3,
              recentForm: ['1', '4', '1', '2', '3'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Bra spår och startsnabb',
                'Kan överraska tidigt',
                'Stark på kort distans'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 8,
            name: 'MAGIC NIGHT',
            driver: 'Peter Ingves',
            trainer: 'Stefan Melander',
            confidence: "Mycket stark",
            odds: '52.40',
            startPosition: 8,
            recentForm: ['6', '3', '1', '5', '2'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Kan överraska med rätt lopp',
              'Bra spurtare när det stämmer',
              'Underskattad kapacitet'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    },
    {
      details: {
        raceNumber: 7,
        distance: '2140m',
        startMethod: 'Auto',
        prize: '300 000 kr',
        trackCondition: 'Fast',
        weather: 'Clear',
        temperature: '12°C',
        aiAnalysis: 'Finalen där flera topphästar möts. Högt tempo förväntas från start.',
        topPicks: {
          favorites: [
            {
              number: 2,
              name: 'CHAMPION SPIRIT',
              driver: 'Örjan Kihlström',
              trainer: 'Daniel Redén',
              confidence: "Mycket stark",
              odds: '2.75',
              startPosition: 2,
              recentForm: ['1', '1', '1', '2', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Toppform och perfekt spår',
                'Stark på alla distanser',
                'Kan avgöra när som helst'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 5,
              name: 'POWER LINE',
              driver: 'Björn Goop',
              trainer: 'Timo Nurmos',
              confidence: "Mycket stark",
              odds: '3.85',
              startPosition: 5,
              recentForm: ['2', '1', '1', '1', '2'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark form och bra kapacitet',
                'Kan utmana om segern',
                'Passar bra på distansen'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            },
            {
              number: 7,
              name: 'GOLDEN WARRIOR',
              driver: 'Erik Adielsson',
              trainer: 'Roger Walmann',
              confidence: "Mycket stark",
              odds: '7.20',
              startPosition: 7,
              recentForm: ['1', '3', '1', '2', '1'],
              winPercentage: '43%',
              earnings: '2.4M kr',
              totalStarts: 32,
              yearStats: {
                starts: 12,
                wins: 7,
                seconds: 3,
                thirds: 1
              },
              analytics: {
                speedRating: "Utmärkt acceleration och topphastighet",
                strengthRating: "Stark och uthållig",
                startSpeedRating: "Explosiv från start",
                trackFitRating: "Trivs utmärkt på Solvalla",
                distanceFitRating: "Optimal distans",
                recentFormRating: "Toppform"
              },
              horseInsights: [
                'Stark spurtare',
                'Bra form på sistone',
                'Kan överraska med rätt lopp'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 11,
            name: 'DARK KNIGHT',
            driver: 'Magnus A Djuse',
            trainer: 'Svante Båth',
            confidence: "Mycket stark",
            odds: '48.50',
            startPosition: 11,
            recentForm: ['4', '2', '1', '5', '3'],
            winPercentage: '43%',
            earnings: '2.4M kr',
            totalStarts: 32,
            yearStats: {
              starts: 12,
              wins: 7,
              seconds: 3,
              thirds: 1
            },
            analytics: {
              speedRating: "Utmärkt acceleration och topphastighet",
              strengthRating: "Stark och uthållig",
              startSpeedRating: "Explosiv från start",
              trackFitRating: "Trivs utmärkt på Solvalla",
              distanceFitRating: "Optimal distans",
              recentFormRating: "Toppform"
            },
            horseInsights: [
              'Kapabel häst med potential',
              'Kan överraska från bakspår',
              'Stark när det stämmer'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: [/* ... full horse list ... */]
    }
  ],
  overallAnalysis: 'V75-omgången präglas av flera starka favoriter men också några mer öppna lopp där överraskningar kan ske. Banan är i utmärkt skick och vädret ser ut att hålla stabilt.',
  weatherImpact: 'De stabila väderförhållandena ger alla hästar goda förutsättningar. Ingen särskild fördel för någon specifik löpstil.',
  trackAnalysis: 'Solvallas bana är i toppskick. Innerspår har visat sig vara särskilt fördelaktiga i autostart på kortare distanser.',
  valuePlay: 'I V75-6 finns potential för överraskning där nr 8 MAGIC NIGHT är ett spännande drag till höga odds.'
});

// Placeholder data for non-logged in users
const getPlaceholderData = (id) => ({
  id,
  name: 'V75 Solvalla',
  date: '2024-01-20',
  time: '15:00',
  track: 'Solvalla',
  type: 'V75',
  races: [
    {
      details: {
        raceNumber: 1,
        distance: 'XXXX',
        startMethod: 'XXXX',
        prize: 'XXX XXX kr',
        trackCondition: 'XXXX',
        weather: 'XXXX',
        temperature: 'XX°C',
        aiAnalysis: 'XXXXXXX XXX XXXXX XXXXXX XXXX XXXXX XXXXX. XXXX X-X XXX XXXXXXXXXX XXXX XX XXXXXX XX XXXXX XXXXXXX.',
        topPicks: {
          favorites: [
            {
              number: 1,
              name: 'XXXXXXX XXX XXXXX',
              driver: 'XXXX XXXXXXX',
              trainer: 'XXXX XXXXX',
              confidence: "Dold",
              odds: 'X.XX',
              startPosition: 1,
              recentForm: ['X', 'X', 'X', 'X', 'X'],
              winPercentage: 'XX%',
              earnings: 'X.XM kr',
              totalStarts: 0,
              yearStats: {
                starts: 0,
                wins: 0,
                seconds: 0,
                thirds: 0
              },
              analytics: {
                speedRating: "Dold",
                strengthRating: "Dold",
                startSpeedRating: "Dold",
                trackFitRating: "Dold",
                distanceFitRating: "Dold",
                recentFormRating: "Dold"
              },
              horseInsights: [
                'XXXXXXX XXX XXXXX XXXXXX XXXX XXXXX',
                'XXXX XXXXXXX XXX XXXXX XX XXXXX XXXXX',
                'XXXXX XXXXXX XXX XXXXXXX XXX XXXXX'
              ],
              driverInsights: [
                'Vunnit 35% av starterna på Solvalla i år',
                'Stark statistik med hästar från Timo Nurmos stall',
                'Tre vinster på fyra starter med hästen'
              ]
            }
          ],
          longshot: {
            number: 2,
            name: 'XXXXXXX XXX XXXXX',
            driver: 'XXXX XXXXXXX',
            trainer: 'XXXX XXXXX',
            confidence: "Dold",
            odds: 'XX.XX',
            startPosition: 2,
            recentForm: ['X', 'X', 'X', 'X', 'X'],
            winPercentage: 'XX%',
            earnings: 'X.XM kr',
            totalStarts: 0,
            yearStats: {
              starts: 0,
              wins: 0,
              seconds: 0,
              thirds: 0
            },
            analytics: {
              speedRating: "Dold",
              strengthRating: "Dold",
              startSpeedRating: "Dold",
              trackFitRating: "Dold",
              distanceFitRating: "Dold",
              recentFormRating: "Dold"
            },
            horseInsights: [
              'XXXXXXX XXX XXXXX XXXXXX XXXX XXXXX',
              'XXXX XXXXXXX XXX XXXXX XX XXXXX XXXXX',
              'XXXXX XXXXXX XXX XXXXXXX XXX XXXXX'
            ],
            driverInsights: [
              'Vunnit 35% av starterna på Solvalla i år',
              'Stark statistik med hästar från Timo Nurmos stall',
              'Tre vinster på fyra starter med hästen'
            ]
          }
        }
      },
      horses: []
    }
  ],
  overallAnalysis: 'XXXXXXX XXX XXXXX XXXXXX XXXX XXXXX XXXXX. XXXX XXXXXX XXXXX XXX XXXXXXX XXX XXXXX.',
  weatherImpact: 'XXXXXXX XXX XXXXX XXXXXX XXXX XXXXX. XXXX XXXXXX XXXXX XXX XXXXXXX.',
  trackAnalysis: 'XXXXXXX XXX XXXXX XXXXXX XXXX. XXXX XXXXXX XXXXX XXX XXXXXXX XXX.',
  valuePlay: 'XXXXXXX XXX XXXXX XXXXXX XXXX. XXXX XXXXXX XXXXX XXX XXXXXXX XXX.'
});

// Utility functions for random text generation
const generateRandomText = (minLength, maxLength) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateRandomNumber = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const generateRandomForm = () => {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6 + 1).toString());
};

const obfuscateData = (data, selectedRaceIndex) => {
  const race = { ...data };
  const currentRace = race.races[selectedRaceIndex];

  // Obfuscate race details
  currentRace.details.aiAnalysis = generateRandomText(100, 150);
  currentRace.details.topPicks.favorites = currentRace.details.topPicks.favorites.map(horse => ({
    ...horse,
    name: generateRandomText(8, 15),
    driver: generateRandomText(10, 15),
    trainer: generateRandomText(10, 15),
    confidence: generateRandomText(8, 12),
    odds: generateRandomNumber(1.5, 15),
    recentForm: generateRandomForm(),
    winPercentage: `${Math.floor(Math.random() * 40 + 10)}%`,
    earnings: `${(Math.random() * 2 + 0.5).toFixed(1)}M kr`,
    horseInsights: Array(3).fill('').map(() => generateRandomText(20, 40)),
    driverInsights: Array(3).fill('').map(() => generateRandomText(20, 40)),
    analytics: {
      speedRating: generateRandomText(15, 25),
      strengthRating: generateRandomText(15, 25),
      startSpeedRating: generateRandomText(15, 25),
      trackFitRating: generateRandomText(15, 25),
      distanceFitRating: generateRandomText(15, 25),
      recentFormRating: generateRandomText(15, 25),
    }
  }));

  // Obfuscate longshot
  currentRace.details.topPicks.longshot = {
    ...currentRace.details.topPicks.longshot,
    name: generateRandomText(8, 15),
    driver: generateRandomText(10, 15),
    trainer: generateRandomText(10, 15),
    confidence: generateRandomText(8, 12),
    odds: generateRandomNumber(15, 50),
    recentForm: generateRandomForm(),
    winPercentage: `${Math.floor(Math.random() * 20 + 5)}%`,
    earnings: `${(Math.random() * 1.5 + 0.2).toFixed(1)}M kr`,
    horseInsights: Array(3).fill('').map(() => generateRandomText(20, 40)),
    driverInsights: Array(3).fill('').map(() => generateRandomText(20, 40)),
    analytics: {
      speedRating: generateRandomText(15, 25),
      strengthRating: generateRandomText(15, 25),
      startSpeedRating: generateRandomText(15, 25),
      trackFitRating: generateRandomText(15, 25),
      distanceFitRating: generateRandomText(15, 25),
      recentFormRating: generateRandomText(15, 25),
    }
  };

  race.overallAnalysis = generateRandomText(80, 120);
  race.weatherImpact = generateRandomText(60, 80);
  race.trackAnalysis = generateRandomText(60, 80);
  race.valuePlay = generateRandomText(40, 60);

  return race;
};

export default function RacePage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayData, setDisplayData] = useState(null);
  const [selectedRace, setSelectedRace] = useState(1);
  const [expandedHorse, setExpandedHorse] = useState(null);
  const theme = useTheme();
  const supabase = createClient();


  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);

      //TODO Dag Oldenburg: Kolla att kunden har betalat genom att kolla price id i config och jämföra med profile price id i app_metadata i jwtn

      if (id) {
        const actualData = getRaceData(id);
        if (!session) {
          // Generate new random data when switching races
          setDisplayData(obfuscateData(actualData, selectedRace - 1));
        } else {
          setDisplayData(actualData);
        }
      }
    };

    getSession()
  }, [id, selectedRace]); // Added selectedRace dependency to regenerate random data when switching races

  if (!displayData) return null;

  const handleLogin = () => {
    router.push(`/login?redirect=/race/${id}`);
  };

  // Always use actual race data for structure
  const currentRace = displayData.races[selectedRace - 1];

  return (
      <Container maxWidth="lg" sx={{ py: 4, bgcolor: (theme) => theme.palette.grey[50], minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 800,
            color: (theme) => theme.palette.text.primary,
            mb: 1,
            letterSpacing: '-0.05em'
          }}>
            {displayData.name}
          </Typography>
          <Typography sx={{
            fontSize: '0.875rem',
            color: (theme) => theme.palette.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5
          }}>
            <span>{displayData.track}</span>
            <Box component="span" sx={{ width: 3, height: 3, bgcolor: (theme) => theme.palette.grey[400], borderRadius: '50%' }} />
            <span>{displayData.date}</span>
            <Box component="span" sx={{ width: 3, height: 3, bgcolor: (theme) => theme.palette.grey[400], borderRadius: '50%' }} />
            <span>{displayData.time}</span>
          </Typography>
        </Box>

        {/* Race Selection */}
        <Box sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          mb: 4,
          justifyContent: 'center',
          pt: 2,
          pb: 2,
          mx: -2,
          px: 2,
        }}>
          {Array.from({ length: 7 }, (_, index) => (
              <Button
                  key={index}
                  variant={selectedRace === index + 1 ? 'contained' : 'outlined'}
                  onClick={() => setSelectedRace(index + 1)}
                  sx={{
                    minWidth: 80,
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    color: selectedRace === index + 1 ? theme.palette.common.white : theme.palette.text.primary,
                    bgcolor: selectedRace === index + 1 ? theme.palette.primary.main : 'transparent',
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: selectedRace === index + 1 ? theme.palette.primary.dark : theme.palette.grey[50],
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                    '&:focus': {
                      outline: 'none',
                    }
                  }}
              >
                V75-{index + 1}
              </Button>
          ))}
        </Box>

        {/* Main Content */}
        <Box sx={{ position: 'relative' }}>
          {/* Race Overview and Analysis */}
          <Paper elevation={0} sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: (theme) => theme.palette.divider,
            bgcolor: theme.palette.background.paper,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            filter: !isLoggedIn ? 'blur(4px)' : 'none',
            pointerEvents: !isLoggedIn ? 'none' : 'auto',
            userSelect: !isLoggedIn ? 'none' : 'auto',
            transition: 'all 0.3s ease-in-out',
          }}>
            {/* Race Details */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: (theme) => theme.palette.text.primary }}>
                  V75-{selectedRace}
                </Typography>
                <Typography sx={{ color: (theme) => theme.palette.text.secondary, fontSize: '0.875rem' }}>
                  • {currentRace.details.distance} • {currentRace.details.startMethod}
                </Typography>
              </Box>

              {/* System Generator Button */}
              <Button
                  variant="contained"
                  onClick={() => {
                    if (isLoggedIn) {
                      router.push(`/system/${id}?race=${selectedRace}`);
                    }
                  }}
                  disabled={!isLoggedIn}
                  sx={{
                    ml: 'auto',
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    order: { xs: -1, sm: 0 }, // Ensures button is first on mobile, normal order on desktop
                    width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto on desktop
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    '&:disabled': {
                      bgcolor: 'grey.300',
                      color: 'grey.500',
                    }
                  }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 18 }} />
                Skapa System
              </Button>

              <Box sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
                width: '100%', // Takes full width to ensure details are on new line
                order: { xs: 2, sm: 1 } // Ensures details come after button on mobile
              }}>
                {/* Existing race details */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Prispott:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#059669' }}>
                    {currentRace.details.prize}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Bana:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                    {currentRace.details.trackCondition}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Väder:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                    {currentRace.details.weather} • {currentRace.details.temperature}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Analysis Sections */}
            <Box>
              <Box sx={{
                p: 2,
                bgcolor: '#f8fafc',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                mb: 2
              }}>
                <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.5 }}>
                  {currentRace.details.aiAnalysis}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%'
                  }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                      Banförhållanden
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.5 }}>
                      {displayData.trackAnalysis}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    p: 2,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%'
                  }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                      Väderförhållanden
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.5 }}>
                      {displayData.weatherImpact}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Top Picks */}
          <Paper elevation={0} sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: '#ffffff', // Changed from #f1faee to #ffffff
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            filter: !isLoggedIn ? 'blur(4px)' : 'none',
            pointerEvents: !isLoggedIn ? 'none' : 'auto',
            userSelect: !isLoggedIn ? 'none' : 'auto',
            transition: 'all 0.3s ease-in-out',
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#111827' }}>
              Topp 3 & Skrällbud
            </Typography>

            <Grid container spacing={2}>
              {currentRace.details.topPicks.favorites.map((horse, index) => (
                  <Grid item xs={12} key={horse.number}>
                    <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          border: '1px solid',
                          borderColor: 'divider',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: '#f8fafc',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          },
                        }}
                    >
                      <Box
                          onClick={() => setExpandedHorse(expandedHorse === horse.number ? null : horse.number)}
                          sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                      >
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <Typography
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                bgcolor: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : '#b45309',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                flexShrink: 0,
                              }}
                          >
                            {index + 1}
                          </Typography>
                          <Box>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', mb: 0.5 }}>
                              {horse.number}. {horse.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Kusk: {horse.driver} • Tränare: {horse.trainer}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Typography variant="body2" sx={{ color: '#059669', fontWeight: 500 }}>
                                Odds: {horse.odds}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#1f2937' }}>
                                Vinstprocent: {horse.winPercentage}
                              </Typography>
                            </Box>
                            {horse.yearStats && (
                                <Typography variant="body2" color="text.secondary">
                                  {horse.yearStats.starts} starter i år: {horse.yearStats.wins}-{horse.yearStats.seconds}-{horse.yearStats.thirds}
                                </Typography>
                            )}
                          </Box>
                        </Box>
                        {expandedHorse === horse.number ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>

                      <Collapse in={expandedHorse === horse.number}>
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                                Statistik & Form
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                                  <Typography variant="body2" color="text.secondary">Totalt antal starter</Typography>
                                  <Typography variant="body2" fontWeight={500}>{horse.totalStarts || 0}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                                  <Typography variant="body2" color="text.secondary">Vinstprocent</Typography>
                                  <Typography variant="body2" fontWeight={500}>{horse.winPercentage || '0%'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                                  <Typography variant="body2" color="text.secondary">Intjänat</Typography>
                                  <Typography variant="body2" fontWeight={500}>{horse.earnings || '0 kr'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                  {horse.recentForm.map((result, index) => (
                                      <Typography
                                          key={index}
                                          sx={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            bgcolor: result === '1' ? '#059669' : '#f3f4f6',
                                            color: result === '1' ? 'white' : '#4b5563',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                          }}
                                      >
                                        {result}
                                      </Typography>
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                                Häst Insikter
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {horse.horseInsights.map((insight, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                          display: 'flex',
                                          gap: 1.5,
                                          p: 1.5,
                                          bgcolor: '#e9ecef',
                                          borderRadius: 1,
                                        }}
                                    >
                                      <Box
                                          sx={{
                                            width: 4,
                                            bgcolor: '#2563eb',
                                            borderRadius: 1,
                                            flexShrink: 0,
                                          }}
                                      />
                                      <Typography variant="body2" sx={{ color: '#0d1b2a' }}>
                                        {insight}
                                      </Typography>
                                    </Box>
                                ))}
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                                Kusk Insikter
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {horse.driverInsights.map((insight, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                          display: 'flex',
                                          gap: 1.5,
                                          p: 1.5,
                                          bgcolor: '#e9ecef',
                                          borderRadius: 1,
                                        }}
                                    >
                                      <Box
                                          sx={{
                                            width: 4,
                                            bgcolor: '#2563eb',
                                            borderRadius: 1,
                                            flexShrink: 0,
                                          }}
                                      />
                                      <Typography variant="body2" sx={{ color: '#0d1b2a' }}>
                                        {insight}
                                      </Typography>
                                    </Box>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </Paper>
                  </Grid>
              ))}

              {/* Longshot Pick */}
              <Grid item xs={12}>
                <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      bgcolor: '#ffffff', // Changed from #fffbeb to #ffffff
                      border: '1px solid',
                      borderColor: '#fbbf24',
                      '&:hover': {
                        borderColor: '#f59e0b',
                        bgcolor: '#fef3c7',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.1), 0 2px 4px -1px rgba(245, 158, 11, 0.06)'
                      },
                    }}
                >
                  <Box
                      onClick={() => setExpandedHorse(expandedHorse === currentRace.details.topPicks.longshot.number ? null : currentRace.details.topPicks.longshot.number)}
                      sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Box
                          sx={{
                            bgcolor: '#fbbf24',
                            color: 'white',
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            height: 'fit-content',
                          }}
                      >
                        SKRÄLLBUD
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', mb: 0.5 }}>
                          {currentRace.details.topPicks.longshot.number}. {currentRace.details.topPicks.longshot.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Kusk: {currentRace.details.topPicks.longshot.driver} • Tränare: {currentRace.details.topPicks.longshot.trainer}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#b45309', fontWeight: 500 }}>
                          {currentRace.details.topPicks.longshot.confidence} • Odds: {currentRace.details.topPicks.longshot.odds}
                        </Typography>
                      </Box>
                    </Box>
                    {expandedHorse === currentRace.details.topPicks.longshot.number ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Box>

                  <Collapse in={expandedHorse === currentRace.details.topPicks.longshot.number}>
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                            Senaste starter
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                            {currentRace.details.topPicks.longshot.recentForm.map((result, index) => (
                                <Typography
                                    key={index}
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: '50%',
                                      bgcolor: result === '1' ? '#059669' : '#f3f4f6',
                                      color: result === '1' ? 'white' : '#4b5563',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.875rem',
                                      fontWeight: 600,
                                    }}
                                >
                                  {result}
                                </Typography>
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                            Häst Insikter
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {currentRace.details.topPicks.longshot.horseInsights.map((insight, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                      display: 'flex',
                                      gap: 1.5,
                                      p: 1.5,
                                      bgcolor: '#e9ecef',
                                      borderRadius: 1,
                                    }}
                                >
                                  <Box
                                      sx={{
                                        width: 4,
                                        bgcolor: '#2563eb',
                                        borderRadius: 1,
                                        flexShrink: 0,
                                      }}
                                  />
                                  <Typography variant="body2" sx={{ color: '#0d1b2a' }}>
                                    {insight}
                                  </Typography>
                                </Box>
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: '#1f2937', fontWeight: 600 }}>
                            Kusk Insikter
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {currentRace.details.topPicks.longshot.driverInsights.map((insight, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                      display: 'flex',
                                      gap: 1.5,
                                      p: 1.5,
                                      bgcolor: '#e9ecef',
                                      borderRadius: 1,
                                    }}
                                >
                                  <Box
                                      sx={{
                                        width: 4,
                                        bgcolor: '#2563eb',
                                        borderRadius: 1,
                                        flexShrink: 0,
                                      }}
                                  />
                                  <Typography variant="body2" sx={{ color: '#0d1b2a' }}>
                                    {insight}
                                  </Typography>
                                </Box>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Login Overlay - Centered between the papers */}
          {!isLoggedIn && (
              <Box
                  sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1200,
                    width: '90%',
                    maxWidth: 800,
                    pointerEvents: 'auto',
                  }}
              >
                <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      bgcolor: 'white',
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 4,
                    }}
                >
                  {/* Left side - Subscription */}
                  <Box sx={{ flex: 1 }}>
                    <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#111827' }}>
                      Lås upp analyser
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Få tillgång till AI-drivna analyser och insikter för alla V75- och V86-lopp
                    </Typography>

                    <Box
                        sx={{
                          p: 3,
                          bgcolor: '#f8fafc',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'primary.main',
                        }}
                    >
                      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                        Från 99kr/månad
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4b5563', mb: 2 }}>
                        Avsluta när du vill
                      </Typography>
                      <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          onClick={() => router.push('/subscribe')}
                          sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            bgcolor: 'primary.main',
                            color: '#ffffff',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                              color: '#ffffff',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            }
                          }}
                      >
                        Lås upp nu
                      </Button>
                    </Box>
                  </Box>

                  {/* Divider for mobile */}
                  <Box
                      sx={{
                        display: { xs: 'flex', md: 'none' },
                        alignItems: 'center',
                        width: '100%'
                      }}
                  >
                    <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                    <Typography sx={{ px: 2, color: '#6b7280', fontSize: '0.875rem' }}>
                      eller
                    </Typography>
                    <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                  </Box>

                  {/* Vertical divider for desktop */}
                  <Box
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 2
                      }}
                  >
                    <Box sx={{ width: 1, height: '100%', bgcolor: 'divider' }} />
                    <Typography
                        sx={{
                          position: 'absolute',
                          bgcolor: 'white',
                          px: 2,
                          color: '#6b7280',
                          fontSize: '0.875rem'
                        }}
                    >
                      eller
                    </Typography>
                  </Box>

                  {/* Right side - Login */}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#111827' }}>
                      Redan medlem?
                    </Typography>
                    <Typography sx={{ mb: 4, color: '#6b7280' }}>
                      Logga in för att fortsätta där du slutade
                    </Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                        sx={{
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: 'divider',
                          color: '#4b5563',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'transparent',
                          }
                        }}
                    >
                      Logga in
                    </Button>
                  </Box>
                </Paper>
              </Box>
          )}
        </Box>
      </Container>
  );
}