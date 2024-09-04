import React from 'react';
import Heading from "./Heading";
import Section from "./Section";

const Services = () => {
  return (
    <Section id="services">
      <div className="container relative z-10">

        <section className="w-full overflow-hidden lg:mt-5">
          <div className="container mx-auto max-w-[1503px] px-4">
            <div className="text-center">
              <a className="inline-block px-5 py-1 mb-5 text-[#418dff] border border-[#418dff] bg-[#272547] rounded-full text-base font-normal" href="#">What do we do?</a>
              <Heading
                className="md:max-w-md lg:max-w-2xl"
                title="We provide wide range of services"
              />
            </div>
            <div className="flex flex-wrap -mx-4">

              <div className="w-full xl:w-1/4 lg:w-5/12 px-4">
                <div className="transform hover:-translate-y-1 transition-all duration-250 bg-[#0e0c15] border  border-[#1a1627]  rounded-lg p-8 mb-8">
                  <div className="w-10 mb-4">
                    <img src="https://i.ibb.co/v42SsRf/1.png" alt="Web" className="w-full" />
                  </div>
                  <div className="card-info">
                    <h6 className="text-md font-semibold mb-2">Custom Website Development</h6>
                    <p className="text-xs text-[#9B9C9F]">Tailor-made websites crafted to meet your unique business needs and goals.</p>
                    <img className="mt-6 w-full hidden lg:block" src="https://i.ibb.co/dfwGkW9/Subheading-2.png" alt="Web Details" />
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/3 lg:w-7/12 px-4">
                <div className="transform hover:-translate-y-1 transition-all duration-250 bg-[#0e0c15] border  border-[#1a1627]  rounded-lg p-8 mb-8">
                  <div className="w-10 mb-4">
                    <img src="https://i.ibb.co/jZgs9rK/2.png" alt="Global" className="w-full" />
                  </div>
                  <div className="card-info">
                    <h6 className="text-md font-semibold mb-2">E-commerce Solutions</h6>
                    <p className="text-xs text-[#9B9C9F]">Powerful online stores designed to enhance user experience and drive sales.</p>
                  </div>
                </div>
                <div className="transform hover:-translate-y-1 transition-all duration-250 bg-[#0e0c15] border  border-[#1a1627]  rounded-lg p-8 mb-8 relative pr-[175px] 
                lg:bg-[url('https://i.ibb.co/wr3cDMS/Untitled-design-8.png')] bg-no-repeat bg-auto"
                  style={{ backgroundPosition: 'right 30px bottom 13px' }}>
                  <div className="w-10 mb-4">
                    <img src="https://i.ibb.co/7WyGmsx/3.png" alt="Laptop" className="w-full" />
                  </div>
                  <div className="card-info mb-2">
                    <h6 className="text-md font-semibold lg:mb-2">Responsive Web Design</h6>
                    <p className="text-xs text-[#9B9C9F]">Beautiful, mobile-friendly designs that adapt seamlessly across all devices.</p>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-5/12 lg:w-full px-4">
                <div className="transform hover:-translate-y-1 transition-all duration-250 bg-[#0e0c15] border  border-[#1a1627]  rounded-lg p-8 mb-8 relative 
                lg:bg-[url('https://i.ibb.co/N7BzSkF/Untitled-design-7.png')] bg-no-repeat bg-auto" style={{ backgroundPosition: 'right 26px top 8px' }}>
                  <div className="w-10 mb-4">
                    <img src="https://i.ibb.co/B37xJSY/4.png" alt="Brain" className="w-full" />
                  </div>
                  <div className="flex justify-between gap-2 items-end">
                    <div>
                      <h6 className="text-md font-semibold mb-2">Maintenance & Support</h6>
                      <p className="text-xs text-[#9B9C9F]">Ongoing support and updates to keep your website running smoothly and efficiently.</p>
                    </div>
                    <div className='lg:flex hidden w-full justify-end'>
                      <a className="flex items-center text-sm font-semibold text-white" href="#contact">
                        <span className="inline-block w-9 h-9 bg-[#3f85f1] rounded-full text-center leading-9 mr-2">
                          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="38" height="38" rx="19" fill="#2B2C2D" />
                            <path d="M23.6537 16.8149L14.718 25.7506L13.25 24.2826L22.1847 15.3469H14.31V13.2705H25.7301V24.6906H23.6537V16.8149Z" fill="#3f85f1" />
                          </svg>
                        </span>
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full md:w-1/2 px-4">
                    <div className="transform hover:-translate-y-1 transition-all duration-250 bg-[#0e0c15] border  border-[#1a1627]  rounded-lg p-8 mb-8">
                      <div className="w-10 mb-4">
                        <img src="https://i.ibb.co/XzTJ1TQ/5.png" alt="Search" className="w-full" />
                      </div>
                      <div className="card-info">
                        <h6 className="text-md font-semibold mb-2">SEO Optimization</h6>
                        <p className="text-xs text-[#9B9C9F]">Strategies to boost your website’s visibility and ranking in search engine results.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="transform hover:-translate-y-1 transition-all duration-250 bg-[#0e0c15] border  border-[#1a1627]  rounded-lg p-8 mb-8">
                      <div className="w-10 mb-4">
                        <img src="https://i.ibb.co/dWQ0tQC/6.png" alt="Cloud" className="w-full" />
                      </div>
                      <div className="card-info">
                        <h6 className="text-md font-semibold mb-2">Hosting Services</h6>
                        <p className="text-xs text-[#9B9C9F]">Reliable hosting solutions to ensure your website is always fast and secure in the internet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Section>
  );
};

export default Services;