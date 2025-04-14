import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import image1 from "../assests/Private Homes.jpeg";
import image2 from "../assests/Waterfront Living.jpeg";
import Footer from "../components/Footer";
import { Menu, X } from "lucide-react";
const NewDevelopment = () => {
  const properties = [
    {
      id: 1,
      image: image1,
      name: "Sobha Estates Villas",
      location: "Sobha Hartland II",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 2,
      image: image2,
      name: "SLS Residences the Palm",
      location: "Palm Jumeirah",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 3,
      image: image1,
      name: "Amali Island",
      location: "The World Islands",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 4,
      image: image2,
      name: "Keturah Reserve",
      location: "Mohammed Bin Rashid City",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 1,
      image: image1,
      name: "Sobha Estates Villas",
      location: "Sobha Hartland II",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 2,
      image: image2,
      name: "SLS Residences the Palm",
      location: "Palm Jumeirah",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 3,
      image: image1,
      name: "Amali Island",
      location: "The World Islands",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 4,
      image: image2,
      name: "Keturah Reserve",
      location: "Mohammed Bin Rashid City",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 1,
      image: image1,
      name: "Sobha Estates Villas",
      location: "Sobha Hartland II",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 2,
      image: image2,
      name: "SLS Residences the Palm",
      location: "Palm Jumeirah",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 3,
      image: image1,
      name: "Amali Island",
      location: "The World Islands",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 4,
      image: image2,
      name: "Keturah Reserve",
      location: "Mohammed Bin Rashid City",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 1,
      image: image1,
      name: "Sobha Estates Villas",
      location: "Sobha Hartland II",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 2,
      image: image2,
      name: "SLS Residences the Palm",
      location: "Palm Jumeirah",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 3,
      image: image1,
      name: "Amali Island",
      location: "The World Islands",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 4,
      image: image2,
      name: "Keturah Reserve",
      location: "Mohammed Bin Rashid City",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 1,
      image: image1,
      name: "Sobha Estates Villas",
      location: "Sobha Hartland II",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 2,
      image: image2,
      name: "SLS Residences the Palm",
      location: "Palm Jumeirah",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 3,
      image: image1,
      name: "Amali Island",
      location: "The World Islands",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
    {
      id: 4,
      image: image2,
      name: "Keturah Reserve",
      location: "Mohammed Bin Rashid City",
      link: "https://leafy-salamander-9c8dbb.netlify.app/blogpage",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  const [visibleProperties, setVisibleProperties] = useState(15);
  const handleLoadMore = () => {
    setVisibleProperties(properties.length);
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
        <div className="flex flex-col md:space-x-6 mt-4 py-6 md:mt-6 space-x-2 md:space-y-0">
          <h3 className="text-3xl pt-8 font-playfair text-[#00603A] text-center mb-8 bg-white">
            Explore the Finest New Luxury Developments Globally
          </h3>

          <p className="text-base max-w-[650px] text-center font-inter">
            Uncover the latest in luxury real estate, featuring stunning designs
            and exclusive amenities across the globe.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.slice(0, visibleProperties).map((property) => (
            <a
              key={property.id}
              href={property.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-3 text-white">
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
        {visibleProperties < properties.length && (
          <div className="flex justify-center mt-20 mb-6">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 w-60 font-inter px-20 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
            >
              See More
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewDevelopment;
