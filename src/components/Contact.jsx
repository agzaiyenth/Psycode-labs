import Section from "./Section";
import Heading from "./Heading";
import {
  Gradient,
} from "./design/Services";
import Calendar from "./Calender";

const Contact = () => {
  return (
    <Section id="reach-us">
      <div className="container">
        <Heading
          title="Contact Us"
          text="Connect with us easily . We're here to assist, answer questions, and
explore opportunities together. Reach out today!"
        />

        <div className="relative">


          <div className=" mx-0 flex flex-col lg:flex-row  gap-0  lg:gap-24 md:py-0 lg:py-10">
          
            <div className="py-10 w-full  lg:w-[50%] flex flex-col gap- divide-y divide-gray-200 dark:divide-zinc-800">

              <div className="flex gap-x-7 py-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-6 h-6 mt-1.5 text-primary dark:text-white"><path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd"></path></svg>
                <div className="grow">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Chat</h3>
                  <p className="mt-1 text-sm text-gray-500">Start a convertion with us via the Whatsapp.</p>
                  <a className="group mt-2 inline-flex items-center gap-x-2 text-sm font-semibold text-primary hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" target="_blank" href="https://wa.me/+94766867362?text=I'm%20interested%20in%20your%20Pricing...">
                    Chat on Whatsapp
                    <svg className="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z" fill="currentColor"></path></svg>
                  </a>
                </div>
              </div>
              <div className=" flex gap-x-7 py-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-6 h-6 mt-1.5 text-primary dark:text-white"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"></path></svg>
                <div className="grow">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Contact Number</h3>
                  <p className="mt-1 text-sm text-gray-500">Let&apos;s talk about your Idea!</p>
                  <a className=" group mt-2 inline-flex items-center gap-x-2 text-sm  text-primary hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 font-semibold" href="tel:+94766867362">
                    +94&nbsp;76&nbsp;686&nbsp;7362
                    <svg className="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z" fill="currentColor"></path></svg>
                  </a>
                </div>
              </div>
              <div className=" flex gap-x-7 py-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-6 h-6 mt-1.5 text-primary dark:text-white"><path d="M19.5 22.5a3 3 0 003-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 01-.712 1.321l-5.683-3.06a1.5 1.5 0 00-1.422 0l-5.683 3.06a.75.75 0 01-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 003 3h15z"></path><path d="M1.5 9.589v-.745a3 3 0 011.578-2.641l7.5-4.039a3 3 0 012.844 0l7.5 4.039A3 3 0 0122.5 8.844v.745l-8.426 4.926-.652-.35a3 3 0 00-2.844 0l-.652.35L1.5 9.59z"></path></svg>
                <div className="grow">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Contact us by email</h3>
                  <p className="mt-1 text-sm text-gray-500">If you wish to write us an email instead please use</p>
                  <a className="group mt-2 inline-flex items-center gap-x-2 text-sm  text-primary hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 font-semibold duration-300" href="mailto:info@psycodelabs.lk">
                    info@psycodelabs.lk
                  </a>
                </div>
              </div>

            </div>
            <Calendar />
          </div>



          <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">

          </div>

        </div>



        <Gradient />
      </div>
    </Section>
  );
};

export default Contact;
