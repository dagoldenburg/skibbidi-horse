'use client'
import { useState } from 'react';
import { Container, Box, Typography, Paper, Button, Divider, Switch, FormControlLabel } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

export default function SubscribePage() {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const theme = useTheme();

  const tiers = [
    {
      name: 'Standard',
      price: isYearly ? '79' : '99',
      period: isYearly ? '/mån' : '/månad',
      billing: isYearly ? 'vid årlig betalning' : 'månadsvis betalning',
      description: 'Perfekt för hobbytravare',
      features: [
        'AI-analyser för V75 och V86',
        'Detaljerade insikter för varje lopp',
        'Tidiga analyser',
        'Statistik och trender',
        'Obegränsad tillgång till historiska resultat'
      ],
      buttonText: 'Välj Standard',
      color: theme.palette.primary.main,
      bgColor: theme.palette.background.paper,
    },
    {
      name: 'Premium',
      price: isYearly ? '159' : '199',
      period: isYearly ? '/mån' : '/månad',
      billing: isYearly ? 'vid årlig betalning' : 'månadsvis betalning',
      description: 'För den seriösa spelaren',
      features: [
        'Allt i Standard',
        'Avancerad spelstrategier',
        'Prioriterad kundsupport',
        'Exklusiva insikter',
        'Djupgående statistik och trender',
        'Tidiga prediktioner',
      ],
      buttonText: 'Välj Premium',
      buttonTextColor: theme.palette.text.primary,
      color: theme.palette.background.paper,
      bgColor: theme.palette.primary.main,
      recommended: true,
    },
  ];

  const handleSubscribe = (tier) => {
    // Handle subscription logic here
    console.log(`Subscribing to ${tier} plan`);
    // Redirect to payment page or handle subscription flow
  };

  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 800,
            color: (theme) => theme.palette.text.primary,
            mb: 1,
            letterSpacing: '-0.05em'
          }}>
            Välj din plan
          </Typography>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary, fontSize: '1.125rem', maxWidth: '600px', mx: 'auto' }}>
            Få tillgång till marknadens mest avancerade AI-analyser för trav
          </Typography>
        </Box>

        {/* Billing Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <FormControlLabel
              control={
                <Switch
                    checked={isYearly}
                    onChange={(e) => setIsYearly(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#2563eb',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#2563eb',
                      },
                    }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
                    Årlig betalning
                  </Typography>
                  <Typography
                      sx={{
                        bgcolor: (theme) => theme.palette.primary[100],
                        color: (theme) => theme.palette.primary.main,
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                  >
                    Spara 20%
                  </Typography>
                </Box>
              }
              labelPlacement="end"
          />
        </Box>

        {/* Pricing Cards */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          maxWidth: '1000px',
          mx: 'auto'
        }}>
          {tiers.map((tier) => (
              <Paper
                  key={tier.name}
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: tier.recommended ? 'transparent' : 'divider',
                    bgcolor: tier.bgColor,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
              >
                {tier.recommended && (
                    <Box
                        sx={{
                          position: 'absolute',
                          top: 60,
                          right: -55,
                          transform: 'rotate(45deg)',
                          bgcolor: (theme) => theme.palette.warning.light,
                          color: (theme) => theme.palette.primary.main,
                          px: 10,
                          py: 0.75,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                    >
                      REKOMMENDERAD
                    </Box>
                )}

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: tier.color, mb: 1 }}>
                    {tier.name}
                  </Typography>
                  <Typography sx={{ color: tier.color, opacity: 0.8, mb: 4 }}>
                    {tier.description}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: tier.color }}>
                        {tier.price}kr
                      </Typography>
                      <Typography sx={{ color: tier.color, opacity: 0.8 }}>
                        {tier.period}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: tier.color, opacity: 0.7, fontSize: '0.875rem' }}>
                      {tier.billing}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 4, borderColor: tier.color, opacity: 0.1 }} />

                  <Box sx={{ mb: 4 }}>
                    {tier.features.map((feature) => (
                        <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <CheckIcon sx={{ color: tier.color, opacity: 0.9 }} />
                          <Typography sx={{ color: tier.color }}>
                            {feature}
                          </Typography>
                        </Box>
                    ))}
                  </Box>
                </Box>

                <Button
                    variant={tier.recommended ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => handleSubscribe(tier.name)}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: tier.recommended ? theme.palette.primary.main : tier.color,
                      borderColor: tier.color,
                      bgcolor: tier.recommended ? tier.color : 'transparent',
                      mt: 'auto',
                      '&:hover': {
                        bgcolor: tier.recommended ? theme.palette.primary.light : `${theme.palette.primary.main}10`,
                        borderColor: tier.recommended ? 'transparent' : tier.color,
                        transform: 'translateY(-2px)',
                        color: tier.recommended ? theme.palette.common.white : tier.color,
                      },
                    }}
                >
                  {tier.buttonText}
                </Button>
              </Paper>
          ))}
        </Box>

        {/* Money-back guarantee */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary, fontSize: '0.875rem' }}>
            30 dagars pengarna-tillbaka-garanti. Avsluta när du vill.
          </Typography>
        </Box>
      </Container>
  );
}