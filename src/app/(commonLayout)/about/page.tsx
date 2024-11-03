import Aboutus from "../components/page/about/About";

import FAQSection from "../components/page/about/FAQ";
import TeamMember from "../components/page/about/TeamMember";


const About = () => {
    return (
        <div className="dark:bg-black"> 
            <Aboutus/>
            <TeamMember/>
            <FAQSection></FAQSection>
            
        </div>
      
    );
};

export default About;