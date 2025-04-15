import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios"; // Import axios

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-5kh4.onrender.com"
    : "http://localhost:5001";

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/newsletter`, {
        email,
        category: "Newsletter", // Set category to "Newsletter"
      });

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred");
      console.error(err);
    }
  };

  return (
    <div className="bg-[#00603A] text-white">
      <div className="flex flex-col md:flex-row items-center justify-around mt-8 lg:px-24 space-y-6 md:space-y-0 bg-[#101132] text-white p-8 text-center">
        <div className="md:text-start text-center">
          <h2 className="text-3xl font-playfair">The Newsletter</h2>
          <p className="mt-2 max-w-2xl text-base">
            Sign-up for our meticulously crafted collection highlighting the hottest luxury offerings, accompanied by exclusive insights.
          </p>
        </div>
        <div className="relative">
          <button
            className="px-8 md:px-20 font-inter py-3 mr-0 md:mr-8 text-[#ffffff] border bg-[#101132] hover:bg-[#ffffff] hover:text-[#101132] transition-all duration-300 md:ml-6"
            onClick={() => setIsOpen(true)}
          >
            Sign-up for Newsletter
          </button>

          {/* Popup Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
              <div className="w-[90%] md:w-[600px] p-6 relative">
                {/* Close Button */}
                <button
                  className="absolute top-1 right-6 text-gray-600 text-xl hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>

                {/* Popup Content */}
                <div className="border bg-white border-[#00603A] mt-4 p-12">
                  <h2 className="text-[#00603A] font-playfair text-3xl text-center">
                    The Newsletter
                  </h2>
                  <p className="text-gray-700 text-center mt-4">
                    Sign-up for our meticulously crafted collection highlighting the hottest luxury offerings, accompanied by exclusive insights.
                  </p>
                  <form onSubmit={handleSubscribe}>
                    {/* Input and Button */}
                    <div className="mt-8 flex items-center gap-2">
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-2 border text-[#000000] border-gray-300 outline-none"
                        required
                      />
                      <button className="px-4 py-2 bg-[#00603A] text-white border border-[#00603A] hover:bg-[#ffffff] hover:text-[#00603A] transition-all">
                        SIGN UP
                      </button>
                    </div>
                    <span>
                      {message && (
                        <p className={message.includes("error") ? "text-red-600" : "text-green-600"}>
                          {message}
                        </p>
                      )}
                    </span>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container text-center md:text-left font-inter py-10 px-4 md:px-24 flex flex-wrap gap-6 text-sm justify-between">
        {/* Mansions for Sale */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="font-semibold text-lg mb-4">Mansions for Sale</h3>
          <ul>
            <li className="mb-2">Mansion for sale in Emirates Hills</li>
            <li className="mb-2">Mansion for sale in Dubai Hills Estate</li>
            <li className="mb-2">Mansion for sale in Palm Jumeirah</li>
            <li className="mb-2">Mansion for sale in Palm Jabel Ali</li>
          </ul>
        </div>

        {/* Penthouses for Sale */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="font-semibold text-lg mb-4">Penthouses for Sale</h3>
          <ul>
            <li className="mb-2">Penthouse for sale in Downtown</li>
            <li className="mb-2">Penthouse for sale in Palm Jumeirah</li>
            <li className="mb-2">Penthouse for sale in Dubai Marina</li>
            <li className="mb-2">Penthouse for sale in JLT</li>
          </ul>
        </div>

        {/* Mansion Market Office */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="font-semibold text-lg mb-4">Mansion Market Office</h3>
          <ul>
            <li className="mb-2">
              <a href="/about">About Mansion Market</a>
            </li>
            <li className="mb-2">
              <a href="/register">Register (Broker/Brokerage)</a>
            </li>
            <li className="mb-2">
              <a href="/contactus">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="/privacypolicy">Privacy & Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col pb-16 md:flex-row items-center justify-between mx-20 border-t border-[#ffffff] py-4 pt-8 text-center">
        <div className="flex justify-center space-x-6 px-4 mb-2 md:mb-0">
          <a href="#" className="hover:text-gray-400 text-lg" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-400 text-lg" aria-label="Twitter X">
            <FaXTwitter />
          </a>
          <a href="#" className="hover:text-gray-400 text-lg" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400 text-lg" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-gray-400 text-lg" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
        <p className="font-inter text-[8px] mt-4 md:mt-0 md:text-sm text-[#ffffff] w-[300px] md:w-[660px]">
          The Mansion Market® holds a registered trademark and operates as a luxury property marketplace.
        </p>
      </div>
    </div>
  );
};

export default Footer;