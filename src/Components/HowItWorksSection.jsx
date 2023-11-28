
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import SectionTitle from './Utiles/SetTheme/SectionTitle/SectionTitle';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(6),
    backgroundColor: '#f5f5f5',
    
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  stepIcon: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '50%',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const HowItWorksSection = () => {
  const classes = useStyles();

  // Steps content
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
    <Paper className={classes.section}>
                <SectionTitle heading={'How It Works'}></SectionTitle>
      <Grid container direction="column" alignItems="center">
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel StepIconProps={{ classes: { root: classes.stepIcon } }}>
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <Typography>{step.description}</Typography>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Paper>
  );
};

export default HowItWorksSection;
