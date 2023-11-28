
import FAQSection from "../../Components/FAQSections";
import HowItWorksSection from "../../Components/HowItWorksSection";
import NewlyPosted from "../../Components/NewlyPosted";
import SetHemlet from "../../Components/SetHemlet";
import Banner from "./Shared/Banner";
import Testimonials from "./Shared/Testimonials";


const Home = () => {
    return (
        
        <div >
           <SetHemlet page={'Home'}></SetHemlet>
           <Banner></Banner>
           <NewlyPosted></NewlyPosted>
           <Testimonials></Testimonials>
           <HowItWorksSection></HowItWorksSection>
           <FAQSection></FAQSection>
        </div>
    );
};

export default Home;