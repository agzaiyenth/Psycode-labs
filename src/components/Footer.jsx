
import { socials } from "../constants";
import Section from "./Section";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col">
     
    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 s sm:py-2 sm:mt-0 mt-4">© {new Date().getFullYear()} All Rights Reserved —
      <a href="https://psycodelabs.lk" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Psycode Lab's</a>
    </p>
       
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
            >
              <img src={item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
        </span>
      </div>
    </Section>
  );
};

export default Footer;
