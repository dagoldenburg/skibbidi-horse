'use client'
import { Box, Typography, Container, Button, Card, CardContent, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';

const features = [
  {
    icon: "/ai-icon.svg",
    title: "Smart AI-Prediktion",
    description: "Realtidsanalys av odds, form och banförhållanden ger dig marknadens mest träffsäkra spelförslag.",
    color: "#2563eb"
  },
  {
    icon: "/analysis-icon.svg",
    title: "Expertanalys & Data",
    description: "Omfattande statistik, formkurvor och expertkommentarer för varje häst och kusk i loppet.",
    color: "#059669"
  },
  {
    icon: "/platform-icon.svg",
    title: "Spelstrategier",
    description: "Skräddarsydda spelförslag baserade på din budget och riskprofil för maximal avkastning.",
    color: "#7c3aed"
  }
];

const stats = [
  {
    number: "93%",
    label: "Vinstchans",
    description: "på rekommenderade spel"
  },
  {
    number: "2.5M+",
    label: "Analyserade Lopp",
    description: "sedan 2021"
  },
  {
    number: "82K+",
    label: "Nöjda Spelare",
    description: "med ökad vinst"
  }
];

export default function AboutPage() {
  const router = useRouter();

  return (
      <Box sx={{ bgcolor: '#f8fafc' }}>
        {/* Hero Section */}
        <Box sx={{
          position: 'relative',
          height: { xs: '700px', sm: '650px', md: '550px' },
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          borderRadius: { xs: 0, md: '32px' },
          mt: { xs: 0, md: 4 },
          mb: { xs: 2, md: 2 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.75))',
            zIndex: 1,
          }
        }}>
          <Image
              src="/004.png"
              alt="Hero background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.1)',
              }}
              priority
              quality={90}
          />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}>
            <Grid
                container
                spacing={{ xs: 3, sm: 4 }}
                justifyContent="center"
                alignItems="center"
                sx={{ textAlign: 'center' }}
            >
              <Grid item xs={12} md={10} lg={8}>
                <Typography variant="h1" sx={{
                  color: 'white',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.75rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  mb: { xs: 3, sm: 4 },
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  textAlign: 'center',
                  px: { xs: 1, sm: 2 }
                }}>
                  Marknadens mest avancerade <br className="hidden sm:block" /> AI-analyser
                </Typography>

                {/* Stats Grid */}
                <Grid container spacing={{ xs: 2, sm: 2 }} justifyContent="center">
                  {stats.map((stat, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box sx={{
                          p: { xs: 2, sm: 2.5 },
                          borderRadius: { xs: 2, sm: 3 },
                          bgcolor: 'rgba(255, 255, 255, 0.04)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid',
                          borderColor: 'rgba(255, 255, 255, 0.08)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: { xs: 'none', sm: 'translateY(-4px)' },
                            bgcolor: 'rgba(255, 255, 255, 0.06)',
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                          }
                        }}>
                          <Typography variant="h2" sx={{
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 800,
                            color: 'white',
                            mb: 0.5,
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                          }}>
                            {stat.number}
                          </Typography>
                          <Typography variant="h6" sx={{
                            fontWeight: 600,
                            color: 'white',
                            mb: 0.5,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }}>
                            {stat.label}
                          </Typography>
                          <Typography sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            lineHeight: 1.4
                          }}>
                            {stat.description}
                          </Typography>
                        </Box>
                      </Grid>
                  ))}
                </Grid>

                {/* Buttons */}
                <Box sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 2 },
                  mt: { xs: 3, sm: 4 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'stretch',
                  px: { xs: 2, sm: 0 }
                }}>
                  <Button
                      variant="contained"
                      size="large"
                      onClick={() => router.push('/signup')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        fontWeight: 600,
                        borderRadius: 2,
                        width: { xs: '100%', sm: 'auto' },
                        '&:hover': {
                          bgcolor: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                        }
                      }}
                  >
                    Börja Vinna Nu
                  </Button>
                  <Button
                      variant="outlined"
                      size="large"
                      onClick={() => router.push('/subscribe')}
                      sx={{
                        borderColor: 'white',
                        borderWidth: 2,
                        color: 'white',
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        fontWeight: 600,
                        borderRadius: 2,
                        width: { xs: '100%', sm: 'auto' },
                        '&:hover': {
                          borderColor: 'white',
                          borderWidth: 2,
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                  >
                    Se Priser
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Container maxWidth="lg" sx={{
          py: { xs: 8, md: 12 },
          mb: { xs: 4, md: 8 }
        }}>
          <Typography variant="h2" sx={{
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'text.primary',
            mb: 2,
            letterSpacing: '-0.02em'
          }}>
            Hur Det Fungerar
          </Typography>
          <Typography sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: { xs: 6, md: 8 },
            maxWidth: '600px',
            mx: 'auto',
            fontSize: '1.125rem',
            lineHeight: 1.6
          }}>
            Vår AI analyserar miljontals datapunkter för att ge dig de bästa spelförslagen
          </Typography>

          {/* Steps Grid */}
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="stretch">
            {/* Step 1: Data Analysis */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Card sx={{
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <Box sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '400px' },
                    width: '100%',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      backdropFilter: 'brightness(1) saturate(0.6)',
                      zIndex: 1
                    }
                  }}>
                    <Image
                        src="/001.png"
                        alt="AI Analysis Dashboard"
                        fill
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }}
                        quality={90}
                    />
                  </Box>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="overline" sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 1,
                  display: 'block'
                }}>
                  STEG 1
                </Typography>
                <Typography variant="h3" sx={{
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary'
                }}>
                  Realtidsanalys av Data
                </Typography>
                <Typography sx={{
                  color: 'text.secondary',
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  mb: 3
                }}>
                  Vår AI analyserar kontinuerligt:
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: 'Historiska resultat', value: '2.5M+' },
                    { label: 'Banförhållanden', value: '100%' },
                    { label: 'Kuskar & Tränare', value: '15K+' },
                    { label: 'Hästarnas Form', value: '98%' }
                  ].map((stat, index) => (
                      <Grid item xs={6} key={index}>
                        <Card sx={{
                          p: 2.5,
                          height: '100%',
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          boxShadow: 'none'
                        }}>
                          <Typography variant="h4" sx={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 0.5
                          }}>
                            {stat.value}
                          </Typography>
                          <Typography sx={{
                            fontSize: '0.875rem',
                            color: 'text.secondary'
                          }}>
                            {stat.label}
                          </Typography>
                        </Card>
                      </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Step 2: Predictions */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 0, md: 1 } }}>
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="overline" sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 1,
                  display: 'block'
                }}>
                  STEG 2
                </Typography>
                <Typography variant="h3" sx={{
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary'
                }}>
                  Prediktioner & Spelförslag
                </Typography>
                <Typography sx={{
                  color: 'text.secondary',
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  mb: 4
                }}>
                  AI:n genererar detaljerade spelförslag baserade på:
                </Typography>
                <Box sx={{ mb: 3, flex: 1 }}>
                  {[
                    'Vinstchanser per häst',
                    'Optimala systemförslag',
                    'Riskbedömning',
                    'Avkastningspotential'
                  ].map((item, index) => (
                      <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2.5
                      }}>
                        <Box sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: `primary.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <CheckIcon sx={{ fontSize: 24 }} />
                        </Box>
                        <Typography sx={{
                          fontSize: '1.125rem',
                          color: 'text.primary'
                        }}>
                          {item}
                        </Typography>
                      </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 0 } }}>
              <Card sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}>
                <Box sx={{
                  position: 'relative',
                  flexGrow: 1,
                  minHeight: { xs: '300px', md: '400px' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    backdropFilter: 'brightness(0.9) saturate(1.2)',
                    zIndex: 1
                  }
                }}>
                  <Image
                      src="/002.png"
                      alt="AI Predictions Interface"
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                      quality={90}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Features Section */}
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography variant="h2" sx={{
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'text.primary',
            mb: 2,
            letterSpacing: '-0.02em'
          }}>
            Våra Funktioner
          </Typography>
          <Typography sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 8,
            maxWidth: '600px',
            mx: 'auto',
            fontSize: '1.125rem',
            lineHeight: 1.6
          }}>
            Vår AI-teknologi analyserar miljontals datapunkter i realtid för att ge dig ett försprång i varje lopp
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    transition: 'all 0.2s ease-in-out',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
                      borderColor: feature.color,
                    }
                  }}>
                    <CardContent sx={{
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Box sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: `${feature.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3
                      }}>
                        <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={32}
                            height={32}
                        />
                      </Box>
                      <Typography variant="h5" sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: '1.25rem',
                        letterSpacing: '-0.01em'
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: '1rem'
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
  );
}