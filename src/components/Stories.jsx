import {
  Gradient,
} from "./design/Services";
import Heading from "./Heading";
import Section from "./Section";
import Testimonials from "./Testimonials";
import VideoDialog from "./video";

const Stories = () => {
  return (
    
    <Section id="feedback">
      <div className="container">
        <Heading
          title="Real Stories, Real Success"
          text="Discover how we transforms visions into reality through the voices of our valued clients."
        />

        <div className="relative">
          <div className="relative z-1 flex flex-col items-center  mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 ">
          {/* <iframe
                className="w-full h-full object-cover md:object-right"
                width={1500}
                alt="Testimonial"
                height={730}
                src="https://www.youtube.com/embed/VqFfOGJuBQA?autoplay=1&fs=0&modestbranding=1">

                </iframe> */}

      <VideoDialog
        className="hidden dark:block w-full h-full object-cover md:object-right"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/ycUwjqcRj-A?autoplay=1&fs=0&modestbranding=1"
        thumbnailSrc="https://i.ibb.co/tLVzskT/Black-and-Red-Grunge-Sports-Boxing-Youtube-Thumbnail.png"
        thumbnailAlt="Video"
      />
    
                
               
        
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
             
            </div> </div>

          

          <Gradient />
        </div>
        
      </div>
      <Testimonials/>
     
    </Section>
    
  );
};

export default Stories;
