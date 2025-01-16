import { ReactNode, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Avatar, Menu, MenuItem, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername || '');
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/');
    handleClose();
  };

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

              {isLoggedIn ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={handleMenu}
                      sx={{
                        p: { xs: 0.25, sm: 0.5 },
                        border: '2px solid',
                        borderColor: (theme) => theme.palette.grey[900],
                        '&:hover': {
                          backgroundColor: (theme) => `${theme.palette.primary.main}10`,
                        },
                        '&:active': {
                          borderColor: (theme) => theme.palette.grey[900]
                        },
                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: { xs: 28, sm: 32 }, 
                          height: { xs: 28, sm: 32 },
                          bgcolor: (theme) => theme.palette.primary.main,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          fontWeight: 600,
                        }}
                      >
                        {username.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                        display: { xs: 'none', sm: 'block' }
                      }}
                    >
                      {username}
                    </Typography>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: { xs: 160, sm: 180 },
                        '& .MuiMenuItem-root': {
                          fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                          py: 1,
                          px: { xs: 2, sm: 2.5 },
                          '&:focus': {
                            outline: 'none',
                            backgroundColor: 'rgba(29, 53, 87, 0.1)',
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={() => router.push('/profile')}>
                      Min Profil
                    </MenuItem>
                    <MenuItem onClick={() => router.push('/settings')}>
                      Inställningar
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      Logga ut
                    </MenuItem>
                  </Menu>
                </>
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