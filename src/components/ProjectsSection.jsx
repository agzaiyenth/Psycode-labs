
import {  ClientLogos, projects } from "../constants";
import Section from "./Section";
import Heading from "./Heading";


import Marquee from 'react-fast-marquee'; 


const LogoCarousel = () => {
  return (
    <div className="w-full bg-transparent py-8">
      <Marquee
        gradient={false} 
        speed={50}
        direction="left" 
      >
        {ClientLogos.map((company, index) => (
          <div key={index} className="inline-block mx-4">
            <a href={company.companyurl} target="_blank" rel="noopener noreferrer">
              <img
                src={company.imagelink}
                alt={company.companyurl}
                className="h-16 w-auto object-contain"
              />
            </a>
          </div>
        ))}
      </Marquee>
    </div>
  );
};


const Projects = () => {
  return (
    <Section>
      <div className="container">
        <div className="pb-20 xl:pb-[130px]">
          <div className="global-container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1fr)_.8fr] xl:gap-28 xxl:gap-[134px]">
              
              <div className="flex flex-col gap-6 overflow-hidden rounded-[30px] bg-gradient-to-t from-[rgba(255,255,255,.1)] to-[rgba(0,0,0,0.5)] py-[10px]">
                <Marquee
        gradient={false} 
        speed={50}
        direction="right" 
      >
                <div className="horizontal-slide-from-left-to-right flex w-[1661px] gap-x-6 pl-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex h-[205px] items-center justify-center rounded-[10px]"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="object-contain "
                      />
                    </div>
                  ))}
                </div>
                </Marquee>
              </div>
              <div
                className="jos"
                data-jos_once="1"
                data-jos_animation="fade-up"
                data-jos_timingfunction="ease"
                data-jos_duration="0.7"
                data-jos_delay="0.5"
                data-jos_counter="1"
              >
                <div className="mb-6">
                <Heading className="md:max-w-md lg:max-w-2xl" title="Trusted by Clients"/>
            
                </div>
                <p className="mb-7 last:mb-0 body-1  text-n-2 ">
                  We don&apos;t just build platforms; we create
                  experiences that empower and uplift. Trusted by clients across
                  industries, our dedication to excellence is reflected in every
                  line of code, every feature we craft, and every satisfied
                  customer we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
        <LogoCarousel />
        <div className="absolute right-[10%] top-[10%] -z-[1] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#5636C7] to-[#5028DD] blur-[250px]"></div>
      </div>
    </Section>
  );
};

export default Projects;
