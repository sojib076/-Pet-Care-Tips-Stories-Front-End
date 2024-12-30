import FAQSection from "./components/page/about/FAQ";
import Banner from "./components/page/home/Banner";
import Happypets from "./components/page/home/Happypets";
import JoinNow from "./components/page/home/JoinNow";

import TutorSteps from "./components/page/home/TutorSteps";



const Home = () => {


  return (
    <div className="">
     <Banner />
     <Happypets />
     <TutorSteps />
     <JoinNow />
  
     <FAQSection />

      
    </div>
  );
};

export default Home;
