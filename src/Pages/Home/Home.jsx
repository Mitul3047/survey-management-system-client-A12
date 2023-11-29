
import { Box } from "@mui/material";
import FAQSection from "../../Components/FAQSections";
import HowItWorksSection from "../../Components/HowItWorksSection";
// import MostVoted from "../../Components/MostVoted";
import NewlyPosted from "../../Components/NewlyPosted";
import SetHemlet from "../../Components/SetHemlet";
import Banner from "./Shared/Banner";
import Testimonials from "./Shared/Testimonials";


const Home = () => {
    return (
        
        <Box >
           <SetHemlet page={'Home'}></SetHemlet>
           <Banner></Banner>
           {/* <MostVoted></MostVoted> */}
           <NewlyPosted></NewlyPosted>
           <Testimonials></Testimonials>
           <HowItWorksSection></HowItWorksSection>
           <FAQSection></FAQSection>
        </Box>
    );
};

export default Home;