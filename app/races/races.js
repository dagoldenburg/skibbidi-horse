import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Grid, 
  Chip, 
  LinearProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
  Fade,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Referencing the mock data from index.tsx
const races = [
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
    track: 'Åby'
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
    track: 'Jägersro'
  },
];

// Component for the race card to improve reusability
const RaceCard = ({ race, onClick }) => {
  const theme = useTheme();
  
  return (
    <Fade in timeout={500}>
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)',
            '& .race-card-overlay': {
              opacity: 1
            }
          },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          boxShadow: 'none',
        }}
        onClick={onClick}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 2.5 }}>
            <Chip 
              label={race.type} 
              color="primary"
              size="small"
              sx={{ 
                fontWeight: 600,
                mb: 1.5,
                borderRadius: 1.5,
                px: 1
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                mb: 1,
                color: 'text.primary',
                fontSize: '1.25rem'
              }}
            >
              {race.name}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon sx={{ fontSize: '0.875rem' }} />
                <Typography variant="body2">{race.date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: '0.875rem' }} />
                <Typography variant="body2">{race.time}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1.5,
              alignItems: 'center'
            }}>
              <Typography 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                AI Konfidens
              </Typography>
              <Typography 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: '0.875rem'
                }}
              >
                {race.confidence}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={race.confidence}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'primary.light',
                '.MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                }
              }}
            />
          </Box>

          <Grid container spacing={2} sx={{ 
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Grid item xs={6}>
              <Box>
                <Typography 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <EmojiEventsIcon sx={{ fontSize: '1rem' }} />
                  Prispott
                </Typography>
                <Typography 
                  sx={{ 
                    color: 'success.main',
                    fontWeight: 700,
                    fontSize: '0.875rem'
                  }}
                >
                  {race.prize}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 0.5
                }}
              >
                Antal Lopp
              </Typography>
              <Typography 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}
              >
                {race.races} st
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Fade>
  );
};

// Filter component for better organization
const RaceFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter, 
  sortBy, 
  setSortBy 
}) => (
  <Grid container spacing={2} sx={{ mb: 4 }}>
    <Grid item xs={12} sm={4}>
      <TextField
        fullWidth
        placeholder="Sök efter lopp eller bana..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel>Tävlingstyp</InputLabel>
        <Select
          value={typeFilter}
          label="Tävlingstyp"
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <MenuItem value="all">Alla typer</MenuItem>
          <MenuItem value="V75">V75</MenuItem>
          <MenuItem value="V86">V86</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel>Sortera efter</InputLabel>
        <Select
          value={sortBy}
          label="Sortera efter"
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <MenuItem value="date">Datum</MenuItem>
          <MenuItem value="confidence">AI Konfidens</MenuItem>
          <MenuItem value="prize">Prispott</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

export default function Races() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [filteredRaces, setFilteredRaces] = useState(races);

  useEffect(() => {
    let result = [...races];

    if (typeFilter !== 'all') {
      result = result.filter(race => race.type === typeFilter);
    }

    if (searchTerm) {
      result = result.filter(race => 
        race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.track.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'confidence':
          return b.confidence - a.confidence;
        case 'prize':
          return parseInt(b.prize.replace(/[^\d]/g, '')) - parseInt(a.prize.replace(/[^\d]/g, ''));
        default:
          return 0;
      }
    });

    setFilteredRaces(result);
  }, [searchTerm, typeFilter, sortBy]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '2rem', md: '2.75rem' },
            fontWeight: 800,
            color: 'text.primary',
            mb: 2,
            letterSpacing: '-0.02em'
          }}
        >
          Kommande Lopp
        </Typography>
        <Typography 
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' },
            maxWidth: 'md',
            lineHeight: 1.6
          }}
        >
          Utforska kommande V75- och V86-lopp med AI-drivna analyser
        </Typography>
      </Box>

      <RaceFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <Grid container spacing={3}>
        {filteredRaces.map((race, index) => (
          <Grid item xs={12} sm={6} md={4} key={race.id}>
            <RaceCard 
              race={race}
              onClick={() => router.push(`/race/${race.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 