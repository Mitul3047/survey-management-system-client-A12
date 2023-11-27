
import { Container,  Box } from "@mui/material";
import SectionTitle from "../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <SectionTitle heading="Payment"  />
        <Box mt={4}>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
