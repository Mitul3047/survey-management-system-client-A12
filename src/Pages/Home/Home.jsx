
import SetHemlet from "../../Components/SetHemlet";
import Banner from "./Shared/Banner";
import Testimonials from "./Shared/Testimonials";


const Home = () => {
    return (
        
        <div >
           <SetHemlet page={'Home'}></SetHemlet>
           <Banner></Banner>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;