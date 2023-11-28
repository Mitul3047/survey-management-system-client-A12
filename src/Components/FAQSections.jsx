import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles.css';
import { Box } from '@mui/material';
import SectionTitle from './Utiles/SetTheme/SectionTitle/SectionTitle';
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

const FAQSection = () => {
  return (
    <Box className="faqSection">
      <SectionTitle heading={'FAQ'}></SectionTitle>
      {faqData.map((faq, index) => (
        <Accordion key={index} className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordionSummary"
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="subtitle1">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordionDetails">
            <Typography variant="body1">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQSection;
