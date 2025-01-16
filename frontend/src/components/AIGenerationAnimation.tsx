import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useEffect, useState } from 'react';

// Define animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

interface Step {
  id: number;
  text: string;
}

const steps: Step[] = [
  { id: 1, text: "Analyserar historisk data..." },
  { id: 2, text: "Beräknar vinstchanser..." },
  { id: 3, text: "Optimerar systemförslag..." },
  { id: 4, text: "Validerar prediktioner..." }
];

export default function AIGenerationAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {/* Central Icon */}
        <Box
          sx={{
            position: 'relative',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AutoAwesomeIcon
            sx={{
              fontSize: 48,
              color: 'primary.main',
              animation: `${pulse} 2s infinite ease-in-out`,
            }}
          />
          
          {/* Orbiting Stars */}
          {[...Array(3)].map((_, index) => (
            <AutoAwesomeIcon
              key={index}
              sx={{
                position: 'absolute',
                fontSize: 24,
                color: 'primary.light',
                animation: `${float} ${3 + index}s infinite ease-in-out`,
                animationDelay: `${index * 0.5}s`,
                opacity: 0.6,
                transform: `rotate(${120 * index}deg) translateX(40px)`,
              }}
            />
          ))}
        </Box>

        {/* Step Text */}
        <Box sx={{ textAlign: 'center', minHeight: 48 }}>
          <Typography
            key={steps[currentStep].id}
            sx={{
              color: 'text.secondary',
              animation: `${fadeIn} 0.5s ease-in-out`,
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            {steps[currentStep].text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 