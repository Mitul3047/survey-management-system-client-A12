
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const faqData = [
  {
    question: 'How can I participate in surveys?',
    answer: 'You can participate in surveys by signing up on our platform and browsing the available surveys to participate in.',
  },
  {
    question: 'Can I create my own surveys?',
    answer: 'Yes, registered users can create their own surveys and share them with the community.',
  },
  {
    question: 'Why be a Pro User?',
    answer: 'Pro User will get all voting related access',
  },
  {
    question: 'what is the Monthly subscription for pro user',
    answer: 'Only $36/month',
  },
  // Add more FAQ items as needed
];

const useStyles = makeStyles((theme) => ({
  faqSection: {
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(4),
  },
  accordion: {
    marginBottom: theme.spacing(4),
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
  },
  accordionSummary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  accordionDetails: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
}));

const FAQSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.faqSection}>
      {faqData.map((faq, index) => (
        <Accordion key={index} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.accordionSummary}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="subtitle1">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Typography variant="body1">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQSection;
