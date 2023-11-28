// import React from 'react';
import { Paper, Typography, Grid, Step, StepLabel, Stepper } from '@mui/material';
import SectionTitle from './Utiles/SetTheme/SectionTitle/SectionTitle';

const HowItWorksSection = () => {
  const steps = [
    {
      label: 'Step 1',
      description: 'Sign up and create an account on our platform.',
    },
    {
      label: 'Step 2',
      description: 'Explore featured surveys or create your own.',
    },
    {
      label: 'Step 3',
      description: 'Participate in surveys and vote for your favorites.',
    },
    {
      label: 'Step 4',
      description: 'View survey results and engage with the community.',
    },
  ];

  return (
    <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
  <SectionTitle heading='How We Work'></SectionTitle>
      <Grid container direction="column" alignItems="flex-start" width={'80%'} margin={'auto'}>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} sx={{ marginBottom: 2 }}>
              <StepLabel>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {step.label}
                </Typography>
                <Typography>{step.description}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Paper>
  );
};

export default HowItWorksSection;
