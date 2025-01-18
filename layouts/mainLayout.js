'use client'
import { ReactNode, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Avatar, Menu, MenuItem, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { createClient } from "@/libs/supabase/client";
import ButtonAccount from "@/components/ButtonAccount";
import CssBaseline from "@mui/material/CssBaseline";

export default function MainLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    getSession();
  }, []);

  return (

      <Box sx={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pb: { xs: 4, sm: 6 },
      }}>
        <Container maxWidth="lg" sx={{ pt: { xs: 1, sm: 2 } }}>
          <AppBar
              position="static"
              elevation={0}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: { xs: 2, sm: 3 },
                position: 'relative',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transform: 'none'
                },
                '&:active': {
                  borderColor: 'divider'
                }
              }}
          >
            <Toolbar
                disableGutters
                sx={{
                  minHeight: { xs: 64, sm: 76 },
                  px: { xs: 2, sm: 3 },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: { xs: 1, sm: 3 },
                }}
            >
              <Link href="/" passHref style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                position: 'relative',
              }}>
                <Box sx={{ position: 'relative', width: 32, height: 32 }}>
                  <Image
                      src="/horse-logo.svg"
                      alt="TurboTrav Logo"
                      fill
                      sizes="32px"
                      style={{
                        objectFit: 'contain',
                        filter: 'invert(9%) sepia(98%) saturate(1900%) hue-rotate(220deg) brightness(97%) contrast(95%)',
                      }}
                  />
                </Box>
                <Box sx={{
                  display: { xs: 'none', sm: 'flex' },
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: 32,
                }}>
                  <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        color: '#0c2167',
                        letterSpacing: '-0.01em',
                        lineHeight: 1,
                      }}
                  >
                    TURBO
                  </Typography>
                  <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                        color: '#64748b',
                        letterSpacing: '0.02em',
                        lineHeight: 1,
                        marginTop: '3px',
                      }}
                  >
                    TRAV
                  </Typography>
                </Box>
              </Link>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
              }}>
                <Button
                    href="/races"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                      px: { xs: 1.5, sm: 2.5 },
                      py: { xs: 1, sm: 1.25 },
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      background: 'linear-gradient(45deg, rgba(51, 65, 85, 0.08), rgba(30, 41, 59, 0.18))',
                      transition: 'all 0.2s ease-in-out',
                      '& .MuiSvgIcon-root': {
                        fontSize: { xs: 18, sm: 20 }
                      },
                      '&:hover': {
                        background: 'linear-gradient(45deg, rgba(51, 65, 85, 0.15), rgba(30, 41, 59, 0.15))',
                        transform: 'translateY(-1px)',
                        color: 'text.primary',
                      },
                      '&:active': {
                        borderColor: 'transparent'
                      }
                    }}
                >
                  <EventNoteIcon />
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Travkalender
                  </Box>
                </Button>

                {isLoggedIn ? (<ButtonAccount/>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        href="/login"
                        sx={{
                          px: { xs: 2, sm: 3 },
                          minHeight: { xs: 40, sm: 44 },
                          fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                          fontWeight: 600,
                          borderRadius: 2,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                          textTransform: 'none',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            bgcolor: (theme) => theme.palette.grey[900],
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            transform: 'translateY(-1px)',
                            borderColor: 'transparent',
                            color: '#ffffff',
                          },
                          '&:focus': {
                            outline: 'none',
                          },
                        }}
                    >
                      Logga In
                    </Button>
                )}
              </Box>
            </Toolbar>
          </AppBar>
        </Container>

        <Box component="main" sx={{
          minHeight: '100vh',
          pt: { xs: 1, sm: 2 },
          pb: { xs: 4, sm: 6 },
        }}>
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>

        <Box component="footer" sx={{
          py: { xs: 2, sm: 3 },
          borderTop: '1px solid',
          borderColor: 'divider',
          mt: 'auto',
        }}>
          <Container maxWidth="lg">
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
            >
              © {new Date().getFullYear()} TurboTrav AI. Alla rättigheter förbehållna.
            </Typography>
          </Container>
        </Box>
      </Box>
  );
}