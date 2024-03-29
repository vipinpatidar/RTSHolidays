import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdCall, MdEmail } from "react-icons/md";
//data
import { freAndQue } from "../utils/fAndQData";
import { useState } from "react";

const Contact = () => {
  const [fNQArr, setFNQArr] = useState(freAndQue);

  const clickHandler = (id: string) => {
    const newFnQArr = fNQArr.map((fNQ) =>
      fNQ.id === id
        ? { ...fNQ, isOpen: !fNQ.isOpen }
        : { ...fNQ, isOpen: false }
    );
    setFNQArr(newFnQArr);
  };

  return (
    <div className="mt-8">
      <div className="mb-12">
        <h2 className="text-3xl mb-1 text-center">Drop Us a Line</h2>
        <div className="flex items-center justify-center gap-x-4">
          <div className="flex items-center justify-center gap-x-2">
            <span></span>
            <MdCall className="text-[#0575e6]" /> <span>+9942167218</span>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <span></span>
            <MdEmail className="text-[#0575e6]" />{" "}
            <span>RTSHolidays@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row h-full pb-12">
        {/* left */}
        <div className="w-full h-full px-2 lg:px-6 lg:w-[40%]">
          <div className="py-4 px-3 bg-gray-200 mb-6">
            <div className="flex flex-col space-y-4 mb-4">
              <h3 className="text-2xl text-center text-[#0575e6]">
                Contact Us
              </h3>
              <form className="flex flex-col mb-4">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="Name"
                  placeholder="Enter Your Name"
                  required
                  className="px-2 py-2 outline-none border-none placeholder:text-gray-400 mt-2 mb-4"
                />
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  className="px-2 py-2 outline-none border-none placeholder:text-gray-400 mt-2 mb-4"
                />
                <label htmlFor="message">Message</label>
                <textarea
                  name=""
                  id="message"
                  cols={30}
                  rows={4}
                  className="px-2 py-2 outline-none border-none placeholder:text-gray-400 mt-2 mb-4"
                  placeholder="Have a comment, suggestion, or feedback about your stay? We're all ears!"
                  required
                />
                <button
                  type="submit"
                  className="bg-hero hover:bg-hover py-[9px] px-6 text-white mx-auto mt-6 font-semibold"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gray-200 px-3  pt-4 pb-2">
            <h3 className="text-2xl text-center text-[#0575e6] mb-2">
              Address
            </h3>
            <address>ADINA Hotel</address>
            <address>
              Ashram Marg, Near, Jawahar Circle, Jaipur, Rajasthan 302015
            </address>
          </div>
          <div className="bg-gray-200 p-2 lg:p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9431737628065!2d75.79361397512389!3d26.841759676689524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5e591a66633%3A0xef403de8e5c9ad89!2sJaipur%20Marriott%20Hotel!5e0!3m2!1sen!2sin!4v1681323050380!5m2!1sen!2sin"
              style={{ border: "1px solid" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="map"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        {/* right */}
        <div className="w-full h-full mt-12 lg:mt-0 lg:w-[60%]">
          <div className="pt-2 pb-8 px-0 lg:px-5 mb-6">
            <div className="flex flex-col space-y-4 mb-4 gap-3 lg:gap-6">
              <div className="text-center">
                <h3 className="text-2xl mb-1 text-[#0575e6]">
                  Frequently Asked Questions
                </h3>
                <p>Have questions? We are here to help.</p>
              </div>
              <div className="mt-4 lg:mt-12 p-1 lg:p-3">
                {fNQArr.map((fAndQ, idx) => (
                  <div key={idx}>
                    <div
                      className={`flex items-center py-4 justify-between cursor-pointer ${
                        fAndQ.isOpen ? "" : "border-b border-blue-600"
                      }`}
                      onClick={() => clickHandler(fAndQ.id)}
                    >
                      <h4 className="text-[1rem] lg:text-lg font-[500] text-gray-700">
                        {fAndQ.question}
                      </h4>
                      {fAndQ.isOpen ? (
                        <BsChevronUp className="font-bold text-xl text-black" />
                      ) : (
                        <BsChevronDown className="font-bold text-xl text-black" />
                      )}
                    </div>
                    {fAndQ.isOpen && (
                      <div className="p-3 border-b border-blue-500 bg-gray-200">
                        <p>{fAndQ.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
