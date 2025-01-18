'use client'
import { useEffect, useState } from 'react';
import {useParams, useRouter} from 'next/navigation';
import {
  Box, Container, Typography, Paper, Button, Grid, Slider,
  TextField, Chip, CircularProgress, FormControl, Select, MenuItem,
  LinearProgress, Tooltip, IconButton
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import AIGenerationAnimation from '@/components/AIGenerationAnimation';

export default function SystemGenerator() {
  const router = useRouter();
  const { id } = useParams();
  const theme = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [raceInfo, setRaceInfo] = useState({ name: '', track: '', date: '' });
  const [systemConfig, setSystemConfig] = useState({
    budget: 500,
    riskLevel: 'medium',
    maxHorsesPerRace: 4,
    selectedRaces: [1, 2, 3, 4, 5, 6, 7]
  });
  const [suggestions, setSuggestions] = useState([]);
  const [aiMetrics, setAiMetrics] = useState({
    processedData: 0,
    confidence: 0,
    iterations: 0
  });

  useEffect(() => {
    if (id) {
      setRaceInfo({
        name: 'V75',
        track: 'Solvalla',
        date: '2024-01-20'
      });
    }
  }, [id]);

  const generateSystem = async () => {
    setIsGenerating(true);
    setAiMetrics({ processedData: 0, confidence: 0, iterations: 0 });

    // Simulate AI processing with animated metrics
    const interval = setInterval(() => {
      setAiMetrics(prev => ({
        processedData: Math.min(prev.processedData + 5, 100),
        confidence: Math.min(prev.confidence + 3, 95),
        iterations: prev.iterations + 1
      }));
    }, 100);

    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);

    const mockSuggestions = [
      {
        horses: [
          { raceNumber: 1, selections: [1, 4] },
          { raceNumber: 2, selections: [2, 3, 5] },
          { raceNumber: 3, selections: [1] },
          { raceNumber: 4, selections: [3, 4, 6] },
          { raceNumber: 5, selections: [1, 2] },
          { raceNumber: 6, selections: [4, 7] },
          { raceNumber: 7, selections: [1, 5, 8] }
        ],
        confidence: 85,
        expectedValue: 1250,
        cost: systemConfig.budget * 0.8
      }
    ];

    setSuggestions(mockSuggestions);
    setIsGenerating(false);
  };

  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h5" sx={{
            color: 'text.secondary',
            fontWeight: 500,
            mb: 3
          }}>
            {raceInfo.name} • {raceInfo.track} • {raceInfo.date}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: '#FFFFFF',
            }}>
              <Typography variant="h6" sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 700,
              }}>
                Anpassa Ditt System
                <Tooltip title="Ställ in dina preferenser för att få optimala spelförslag">
                  <IconButton size="small">
                    <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MonetizationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography fontWeight={600}>Spelbudget (SEK)</Typography>
                </Box>
                <TextField
                    fullWidth
                    type="number"
                    value={systemConfig.budget}
                    onChange={(e) => setSystemConfig({...systemConfig, budget: Number(e.target.value)})}
                    InputProps={{
                      inputProps: { min: 0 },
                      sx: { fontSize: '1.1rem' }
                    }}
                    sx={{ mt: 1 }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography fontWeight={600} sx={{ mb: 1 }}>Risknivå</Typography>
                <FormControl fullWidth>
                  <Select
                      value={systemConfig.riskLevel}
                      onChange={(e) => setSystemConfig({...systemConfig, riskLevel})}
                      sx={{
                        '& .MuiSelect-select': {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }
                      }}
                  >
                    <MenuItem value="low">🛡️ Säker - Lägre risk, mindre vinst</MenuItem>
                    <MenuItem value="medium">⚖️ Balanserad - Medel risk & vinst</MenuItem>
                    <MenuItem value="high">🎯 Offensiv - Högre risk, större vinst</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                  fullWidth
                  variant="contained"
                  onClick={generateSystem}
                  disabled={isGenerating}
                  startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                  sx={{
                    py: 2,
                    bgcolor: 'primary.main',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
              >
                {isGenerating ? 'AI Analyserar...' : 'Skapa Spelförslag'}
              </Button>

              {isGenerating && (
                  <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        AI Analys: {aiMetrics.processedData}%
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {aiMetrics.iterations} iterationer
                      </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={aiMetrics.processedData}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'primary.light',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            background: 'linear-gradient(90deg, #2563eb, #1d4ed8)'
                          }
                        }}
                    />
                  </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{
              position: 'relative',
              minHeight: 400,
            }}>
              {isGenerating && <AIGenerationAnimation />}

              {!isGenerating && suggestions.map((suggestion, index) => (
                  <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 3,
                        mb: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: '#FFFFFF',
                      }}
                  >
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2.5,
                      pb: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Box>
                        <Typography variant="h6" sx={{
                          fontWeight: 700,
                          color: '#111827',
                          mb: 0.5,
                          fontSize: '1.1rem'
                        }}>
                          Systemförslag {index + 1}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {suggestion.horses.length} lopp • {suggestion.cost.toLocaleString()} SEK
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Chip
                            label={`${suggestion.confidence}% Konfidens`}
                            color="primary"
                            sx={{
                              height: '28px',
                              '& .MuiChip-label': {
                                px: 1.5,
                                fontSize: '0.75rem',
                                fontWeight: 600
                              }
                            }}
                        />
                        <Chip
                            label={`${suggestion.expectedValue.toLocaleString()} SEK`}
                            color="success"
                            sx={{
                              height: '28px',
                              '& .MuiChip-label': {
                                px: 1.5,
                                fontSize: '0.75rem',
                                fontWeight: 600
                              }
                            }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2.5 }}>
                      {suggestion.horses.map((race) => (
                          <Box
                              key={race.raceNumber}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                mb: 0.5,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                bgcolor: '#ffffff',
                              }}
                          >
                            <Box sx={{
                              minWidth: 40,
                              pr: 1.5,
                              mr: 1.5,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              borderRight: '1px solid',
                              borderColor: 'divider',
                            }}>
                              <Typography
                                  sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: 'text.secondary',
                                    lineHeight: 1
                                  }}
                              >
                                Lopp
                              </Typography>
                              <Typography
                                  sx={{
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    mt: 0.25,
                                    lineHeight: 1
                                  }}
                              >
                                {race.raceNumber}
                              </Typography>
                            </Box>

                            <Box sx={{
                              display: 'flex',
                              gap: 0.5,
                              flexWrap: 'wrap',
                              flex: 1,
                              alignItems: 'center'
                            }}>
                              {race.selections.map((horse) => (
                                  <Chip
                                      key={horse}
                                      label={horse}
                                      size="small"
                                      sx={{
                                        height: '20px',
                                        '& .MuiChip-label': {
                                          px: 0.75,
                                          fontSize: '0.7rem',
                                          fontWeight: 600,
                                          lineHeight: 1
                                        },
                                        bgcolor: '#f1f5f9',
                                        color: 'text.primary',
                                        border: 'none'
                                      }}
                                  />
                              ))}
                            </Box>
                            <Typography
                                sx={{
                                  fontSize: '0.7rem',
                                  color: 'text.secondary',
                                  fontWeight: 500,
                                  ml: 1.5,
                                  pl: 1.5,
                                  borderLeft: '1px solid',
                                  borderColor: 'divider',
                                  minWidth: 45,
                                  textAlign: 'center'
                                }}
                            >
                              {race.selections.length}st
                            </Typography>
                          </Box>
                      ))}
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      gap: 1.5,
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            py: 1.25,
                            bgcolor: 'primary.main',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                            }
                          }}
                      >
                        Spela Direkt
                      </Button>
                      <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<SaveIcon />}
                          sx={{
                            py: 1.25,
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'transparent',
                            }
                          }}
                      >
                        Spara System
                      </Button>
                    </Box>
                  </Paper>
              ))}

              {!suggestions.length && !isGenerating && (
                  <Box sx={{
                    textAlign: 'center',
                    py: 12,
                    color: 'text.secondary',
                    bgcolor: 'grey.50',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'divider'
                  }}>
                    <AutoAwesomeIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Redo att skapa ditt vinnande system?
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mt: 1 }}>
                      Ställ in dina preferenser och låt vår AI hitta de bästa kombinationerna
                    </Typography>
                  </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
}