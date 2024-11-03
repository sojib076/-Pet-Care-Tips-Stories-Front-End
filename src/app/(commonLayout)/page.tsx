import FAQSection from "./components/page/about/FAQ";
import Banner from "./components/page/home/Banner";
import Happypets from "./components/page/home/Happypets";
import TutorSteps from "./components/page/home/TutorSteps";



const Home = () => {


  return (
    <div className="dark:bg-black">
     <Banner />
     <Happypets />
     <TutorSteps />
     <FAQSection />
     
      
    </div>
  );
};

export default Home;
