import React, { useState } from "react";
import "../components/man.css";
import { FaSearch } from "react-icons/fa";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import Footer from "../components/Footer";
import { Menu, X } from "lucide-react";
import PenthouseList from "../components/PenthouseList";
import { useMansions } from "../context/MansionContext";

const Penthouses = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { mansions } = useMansions();

  // Split search query into individual terms
  const searchTerms = searchQuery
    .toLowerCase()
    .split(" ")
    .filter((term) => term);

  // Filter mansions based on search query (country, area, district, city)
  const filteredPenthouses = mansions.filter((mansion) => {
    if (mansion.propertytype !== "Penthouse") return false;
    if (!searchQuery) return true;

    // Check if any term matches any relevant field
    return searchTerms.some((term) =>
      [
        mansion.country,
        mansion.area,
        mansion.district,
        mansion.city,
      ].some((field) => field && field.toLowerCase().includes(term))
    );
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 space-y-10">
        {/* Vertical spacing between sections */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 relative">
          {/* Gap between logo and search/menu */}
          {/* Logo */}
          <img src={logo} className="w-[250px] md:w-[400px]" alt="logo" />

          <div className="flex gap-4 w-full md:w-auto items-center">
            {/* Gap between search bar, button, and menu icon */}
            {/* Search Bar */}
            <div className="flex items-center w-full md:w-[300px] border border-[#000000] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-[#000000] text-sm bg-[#f5f5f5] focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Search Button */}
            <button className="bg-[#00603A] px-4 py-2 flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition">
              <FaSearch className="font-thin hover:text-[#00603A]" />
            </button>

            {/* Menu Icon */}
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#000000]" />
              ) : (
                <Menu className="w-6 h-6 text-[#000000]" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Popup */}
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

        {/* Subtitle */}
        <h2 className="text-xl md:text-3xl pt-12 font-playfair text-[#00603A] text-center">
          Explore luxurious penthouses for sale globally
        </h2>

        {/* Description */}
        <p className="text-sm font-inter md:text-lg text-gray-600 text-center max-w-3xl leading-relaxed">
          Discover a curated selection of exceptional penthouses from around the
          globe at The Mansion Market. Each listing is handpicked to meet your
          ultra-luxury requirements, offering unparalleled elegance, opulence, and
          breathtaking views.
        </p>

        {/* Penthouse List */}
        <PenthouseList penthouses={filteredPenthouses} />
      </div>
      <Footer />
    </>
  );
};

export default Penthouses;