import { useState, useEffect } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";
import Projects from "./components/ProjectsSection";
import Services from "./components/Services";
import Stories from "./components/Stories";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}  
      
      {!isLoading && ( 
        <>
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
          <Header />
          <Hero />
          <Services />
          <About />
          <Projects />
          <Stories />
          <Contact />
          <Footer />
        </div>
        </>
      )}

      <ButtonGradient />
    </>
  );
};

export default App;
