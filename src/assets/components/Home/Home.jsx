
import React from 'react';
import Hero from '../Hero/Hero';
import Section1 from '../section1/section1';
import Section3 from '../Section3/Section3';
import CardsGrid from '../section2/Section2';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';


const Home = () => {
    return(

        <>
        <Navbar/>
           <Hero/>
             <Section3/>
   
           <Section1/>
           <CardsGrid/>
                   <Footer/>
         


        </>
    );
    
} 
 export default Home;