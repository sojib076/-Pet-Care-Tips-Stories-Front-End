import React from 'react';
import ContactSection from '../components/page/contactus/ContactSection';
import AppointmentForm from '../components/page/contactus/AppointmentForm';
import Contactus from '../components/page/about/Contactus';

const page = () => {
    return (
        <div>
           
            <ContactSection/>
             <Contactus/>
            <AppointmentForm/>
            
        </div>
    );
};

export default page;