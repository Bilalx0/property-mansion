import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import "react-world-flags"; // Ensure this library is installed in your project
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import { Menu, X } from "lucide-react";
const ContactUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 space-y-8">
        {/* Title and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 relative">
          {/* Logo */}
          <img src={logo} className="w-[250px] md:w-[400px]" alt="logo" />

          <div className="flex gap-2 w-full md:w-auto items-center">
            {/* Search Bar */}
            <div className="flex items-center w-full md:w-[300px] border border-[#000000] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-[#000000] text-sm bg-[#f5f5f5] focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#00603A] px-4 py-2 flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition">
              <FaSearch className="font-thin hover:text-[#00603A]" />
            </button>

            {/* Menu Icon (Visible on all screen sizes) */}
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#000000]" />
              ) : (
                <Menu className="w-6 h-6 text-[#000000]" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Popup (Works on all screen sizes) */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-start space-y-4 relative">
              {[
                { name: "Mansions", href: "/mansions" },
                { name: "Penthouses", href: "/penthouses" },
                { name: "New Developments", href: "/listingpage" },
                { name: "Magazine", href: "/magazine" },
                { name: "Luxe Collectibles", href: "/listingpage" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter pb-2 text-gray-800 hover:text-[#00603A] text-lg"
                >
                  {link.name}
                </a>
              ))}

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-black"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 space-y-12">
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-12 lg:space-y-0 lg:space-x-12">
            {/* Contact Text */}
            <div className="lg:w-1/2 space-y-4">
              <h2 className="text-3xl  text-[#00603A] font-playfair">
                Contact Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-inter leading-[2]">
                Complete the form and we will ensure your message is directed to
                the right staff member, who will contact you at their earliest
                convenience.
              </p>
            </div>

            {/* Form Section */}
            <div className="lg:w-1/2 w-full  p-6  space-y-6">
              <form className="space-y-6">
                <input
                  type="text"
                  className="w-full p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A]"
                  placeholder="Full name"
                  aria-label="Full name"
                />
                <input
                  type="email"
                  className="w-full p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A]"
                  placeholder="E-mail address"
                  aria-label="E-mail address"
                />
                <div className="flex space-x-2 items-center">
                  <select
                    className="p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A] flex-shrink-0"
                    aria-label="Country code"
                  >
                    <option value="+1" data-flag="us">
                      🇺🇸 +1
                    </option>
                    <option value="+44" data-flag="gb">
                      🇬🇧 +44
                    </option>
                    <option value="+91" data-flag="in">
                      🇮🇳 +91
                    </option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A]"
                    placeholder="Phone number"
                    aria-label="Phone number"
                  />
                </div>
                <select
                  className="w-full p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A]"
                  aria-label="Subject"
                >
                  <option value="buy-property">
                    I'd like to buy a property
                  </option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="support">Support</option>
                </select>
                <select
                  className="w-full p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A]"
                  aria-label="Location"
                >
                  <option value="dubai">Dubai</option>
                  <option value="london">London</option>
                  <option value="new-york">New York</option>
                </select>
                <textarea
                  rows="4"
                  className="w-full p-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00603A]"
                  placeholder="Your message"
                  aria-label="Your message"
                ></textarea>
                <div className="flex flex-col items-start space-y-4">
                  <button
                    type="submit"
                    className="w-full font-inter px-20 py-3 text-black  border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
                  >
                    Submit Enquiry
                  </button>
                  <div className="text-sm text-gray-500">
                    This site is protected by reCAPTCHA and the Google Privacy
                    Policy and Terms of Service apply.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
