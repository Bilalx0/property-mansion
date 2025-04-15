import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import Mockupimg from "../assests/Magaine Page Image.gif";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import { Menu, X } from "lucide-react";
import axios from "axios"; // Import axios

const SignupSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-5kh4.onrender.com"
    : "http://localhost:5001";

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://backend-5kh4.onrender.com/api/newsletter", {
        email,
        category: "Magazine", // Set category to "Magazine"
      });

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred");
      console.error(err);
    }
  };

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

      <div className="flex flex-col md:flex-row items-center justify-center px-4 py-12 md:px-8 lg:px-16">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start lg:ml-8">
          {/* Title */}
          <h2 className="text-xl md:text-2xl mb-8">
            <span className="text-[#00603A] font-playfair">
              The Spotlight On Iconic Estate
            </span>{" "}
            <span className="text-[#000000] font-inter font-thin pr-2">|</span>
            <span className="text-black font-inter tracking-[4px]">2025</span>
            <span className="text-[#000000] font-inter font-thin"> EDITION</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 w-full md:w-[400px] mb-6 leading-relaxed">
            Be the first to receive our 2025 edition of SPOTLIGHTS ON by subscribing now!
          </p>

          {/* Subtext */}
          <p className="text-gray-700 font-medium mb-8">
            Luxury Living | Expert Interviews | Travel to Luxury
          </p>

          {/* Input & Button Container */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-4">
            <form onSubmit={handleSubscribe}>
              <div className="w-full">
                {/* Input & Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 p-3 w-full sm:flex-1 focus:outline-none"
                  />
                  <button className="bg-[#00603A] text-white px-5 py-3 border border-[#00603A] hover:bg-[#ffffff] hover:text-[#00603A] transition-all">
                    SIGN UP
                  </button>
                </div>
              </div>
              <span>{message && <p>{message}</p>}</span>
            </form>
          </div>
        </div>

        {/* Right Image with Left Border */}
        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0 border-0 lg:border-l lg:border-l-[#000000] pl-6">
          <img src={Mockupimg} alt="Magazine Preview" className="max-w-full h-auto" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignupSection;