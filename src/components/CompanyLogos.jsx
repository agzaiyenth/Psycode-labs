
import Slider from "react-slick";
import { companyurllogos } from "../constants";

const CompanyLogos = ({ className }) => {
  const settings = {
    dots: false, 
    arrows: false,
    infinite: true, // Enable infinite looping
    speed: 500, 
    slidesToShow: 8,
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
    pauseOnHover: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>

      <Slider {...settings}>
        {companyurllogos.map((logo, index) => (
          <div
            className="flex items-center justify-center"
            key={index}
          >
            <a href={logo.companyurl}>
              <img
                src={logo.imagelink}
                width={120}
                height={120}
                alt={`Logo ${index + 1}`}
                className="p-2"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyLogos;
