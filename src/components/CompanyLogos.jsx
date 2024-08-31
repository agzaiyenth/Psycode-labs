import { companyurllogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>
      
      <ul className="flex">
        {companyurllogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          > <a href={logo.companyurl}>
            <img src={logo.imagelink} width={120} height={120} alt={logo} className="p-2"/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
