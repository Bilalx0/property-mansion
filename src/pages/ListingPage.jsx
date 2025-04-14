import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMansions } from "../context/MansionContext";
import { 
  ArrowUp, 
  X, 
  Menu, 
  Phone, 
  Mail, 
  MessageSquare, 
  Check, 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Square, 
  Tag, 
  Info 
} from "lucide-react";
import { 
  FaSearch,
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaWhatsapp,
  FaPhoneAlt 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsFlag } from "react-icons/bs";

import logo from "../assests/TMM-LANDING PAGE 1.svg";
import sharelogo from "../assests/Share Icon_1.svg";
import sharelogoHover from "../assests/Share Icon White.svg";
import ImageGallery from "../components/ImageGallery";
import Listing from "../components/listings";
import Footer from "../components/Footer";

const ListingPage = () => {
  const { reference } = useParams();
  const { mansions, loading, error } = useMansions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  
  // Scroll to top button visibility
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700">Error loading property</h2>
          <p className="text-red-600 mt-2">{error.message || "Please try again later."}</p>
        </div>
      </div>
    );
  }

  const property = mansions?.find(m => m.reference === reference) || {
    title: "Exquisite villa in Palm Jumeirah with private pool",
    subtitle: "Presidential penthouse in luxury branded residence on Palm Jumeirah",
    status: "For Sale",
    tag: "Exclusive",
    price: "95,000,000",
    reference: "44421",
    propertyaddress: "Palm Jumeirah",
    community: "Dubai",
    subcommunity: "Signature Villas",
    country: "UAE",
    bedrooms: 6,
    bathrooms: 8,
    size: 9729,
    builtuparea: 9729,
    propertytype: "Mansion",
    furnishingtype: "Furnished",
    projectstatus: "Ready",
    unitno: "Villa 22",
    agentname: "Stephan Hirzel",
    designation: "Associate Director",
    callno: "+971 50 123 4567",
    whatsaapno: "+971 50 123 4567",
    email: "stephan@luxuryproperty.com",
    description: "It is hard to imagine a luxury property more impressive than this extraordinary five-bedroom Presidential penthouse apartment in the Armani Beach Residences, Palm Jumeirah. The Armani Beach Residences is one of Dubai's most anticipated luxury branded residences and its Presidential penthouse apartments represent the pinnacle of indulgent opulence. This expansive five-bedroom penthouse apartment has a meticulously designed interior by Armani/Casa and a host of state-of-the-art features that blend elegant style with contemporary functionality. The living areas are spacious and inviting, with unique detailing and stunning accents. The gourmet kitchen is equipped with premium appliances and finishes, offering an exceptional culinary experience. Each bedroom is a private sanctuary with designer ensuite bathrooms. The property enjoys unparalleled views of the Dubai skyline and the Arabian Gulf, creating an unforgettable backdrop for luxurious living.",
    amenities: "Central A/C & heating, Balcony, Equipped kitchen, Built-in wardrobes, Private pool, Maids room, Security, Gym, Concierge service, Beach access, Private garden, Smart home system",
    images: [
      "/path/to/image1.jpg",
      "/path/to/image2.jpg",
      "/path/to/image3.jpg",
    ],
    video: "https://www.youtube.com/embed/example",
    agentimage: "/path/to/agent.jpg"
  };

  // Parse amenities to array
  const amenitiesList = property.amenities ? property.amenities.split(",").map(item => item.trim()) : [];

  // Split amenities into columns
  const amenitiesColumns = [];
  const columnsCount = 3;
  const itemsPerColumn = Math.ceil(amenitiesList.length / columnsCount);
  
  for (let i = 0; i < columnsCount; i++) {
    amenitiesColumns.push(
      amenitiesList.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://backend-5kh4.onrender.com/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Inquiry submitted!");
    } else {
      alert(result.error || "Something went wrong.");
    }
  };


  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-6 md:py-12 bg-gray-50 min-h-screen">
        {/* Header with Logo and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 relative mb-6">
          <img src={logo} className="w-[250px] md:w-[400px]" alt="logo" />

          <div className="flex gap-2 w-full md:w-auto items-center">
            <div className="flex items-center w-full md:w-[300px] border border-gray-300 overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-gray-700 text-sm bg-white focus:outline-none"
              />
            </div>

            <button className="bg-green-800 px-4 py-2 flex items-center justify-center border border-green-800 text-white hover:text-green-800 hover:bg-transparent transition">
              <FaSearch className="font-thin" />
            </button>

            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu Popup */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white shadow-lg p-6 w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-start space-y-4 relative">
              {[
                { name: "Mansions", href: "/mansions" },
                { name: "Penthouses", href: "/penthouses" },
                { name: "New Developments", href: "/new-developments" },
                { name: "Magazine", href: "/magazine" },
                { name: "Luxe Collectibles", href: "/luxe-collectibles" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter pb-2 text-gray-800 hover:text-green-800 text-lg"
                >
                  {link.name}
                </a>
              ))}

              <button
                className="absolute top-4 right-4 text-black"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Main Hero Image and Property Title */}
        <div className="relative w-full h-[50vh] mb-8">
          <img
            src={`https://backend-5kh4.onrender.com${property.image}`}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end">
            <div className="p-6 text-white max-w-7xl mx-auto w-full">
              <div className="flex gap-2 mb-3">
                <div className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md">
                  {property.status}
                </div>
                {property.tag && (
                  <div className="inline-block px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-md">
                    {property.tag}
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-playfair">{property.title}</h1>
              <p className="text-xl mt-1 opacity-90">{property.subtitle}</p>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <p className="text-sm opacity-90">
                  {property.propertyaddress}, {property.community}, {property.subcommunity}, {property.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details Summary Card */}
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-green-700">AED {property.price}</p>
              <p className="text-gray-500 text-sm">PROPERTY REF: {property.reference}</p>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 sm:mt-0">
              <div className="flex items-center">
                <Bed className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{property.bedrooms}</p>
                  <p className="text-xs text-gray-500">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{property.bathrooms}</p>
                  <p className="text-xs text-gray-500">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{property.size}</p>
                  <p className="text-xs text-gray-500">sq. ft.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4 font-playfair">
                Property Details
              </h2>
              <p className="text-base text-gray-700 leading-7 font-inter">
                {showFullDescription 
                  ? property.description 
                  : `${property.description.substring(0, 300)}...`}
              </p>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-6 font-inter px-8 py-3 text-black border border-green-700 hover:bg-green-700 hover:text-white transition-all duration-300"
              >
                {showFullDescription ? "Show less" : "Show full description"}
              </button>

              <div className="border-t border-green-700 mt-8 pt-6">
                <h3 className="text-xl font-playfair text-green-800 mb-4">Property Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Home className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">{property.propertytype}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Info className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Furnishing</p>
                      <p className="font-medium">{property.furnishingtype}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Square className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Built-up Area</p>
                      <p className="font-medium">{property.builtuparea} sqft</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Tag className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Project Status</p>
                      <p className="font-medium">{property.projectstatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4 font-playfair">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {amenitiesColumns.map((column, colIndex) => (
                  <ul key={colIndex} className="space-y-2 font-inter">
                    {column.map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4 font-playfair">
                Location Map
              </h2>
              <div className="w-full relative">
                <iframe
                  className="w-full h-64 border-0 rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.496236789558!2d55.270782315318835!3d25.2048499838886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4347f51ff62d%3A0x9e2df8d4d7e8f12a!2sDubai!5e0!3m2!1sen!2sae!4v1631234567890!5m2!1sen!2sae"
                  allowFullScreen
                  loading="lazy"
                  title="map"
                ></iframe>
              </div>
            </div>

            {/* Video Section */}
            {property.video && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4 font-playfair">
                  Property Video
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={property.video}
                    title="Property Video"
                    className="w-full h-64 rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Share Listing Button */}
            <div className="mb-8">
              <button
                onClick={() => setShareModalOpen(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-3 flex items-center justify-center gap-2 font-inter text-black border border-green-700 hover:bg-green-700 hover:text-white transition-all duration-300"
              >
                <span>Share Listing</span>
                <img
                  src={isHovered ? sharelogoHover : sharelogo}
                  className="w-4"
                  alt="Share"
                />
              </button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{property.agentname}</h3>
                  <p className="text-sm text-gray-500">{property.designation}</p>
                </div>
                {property.agentimage ? (
                  <img
                    src={`https://backend-5kh4.onrender.com${property.agentimage}`}
                    alt={property.agentname}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-700 font-bold text-xl">
                      {property.agentname.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 border-b pb-4">
                <a href={`tel:${property.callno}`} className="text-green-700 font-inter flex items-center space-x-1">
                  <FaPhoneAlt />
                  <span>Call</span>
                </a>
                <span className="text-gray-300">|</span>
                <a href={`https://wa.me/${property.whatsaapno}`} className="text-green-700 font-inter flex items-center space-x-1">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
              </div>

              <form className="mt-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First name *"
          className="border p-2 w-full text-gray-700"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name *"
          className="border p-2 w-full text-gray-700"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email *"
        className="border p-2 w-full mt-4 text-gray-700"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <div className="flex items-center mt-4">
        <span className="bg-gray-200 p-2 flex items-center text-gray-700">
          +971
        </span>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border-t border-b border-r p-2 w-full text-gray-700"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <textarea
        name="message"
        placeholder="I'd like to have more information about this property..."
        className="border p-2 w-full mt-4 text-gray-700"
        rows="4"
        required
        value={formData.message}
        onChange={handleChange}
      ></textarea>

      <button
        type="submit"
        className="w-full mt-6 py-3 font-inter text-white bg-green-700 border border-green-700 hover:bg-white hover:text-green-700 transition-all duration-300"
      >
        Submit enquiry
      </button>
    </form>
            </div>
          </div>
        </div>

        {/* Similar Listings Section */}
        <div className="w-full max-w-7xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 font-playfair">
            Similar Properties You May Like
          </h2>
          <Listing />
        </div>
      </div>

      {/* Share Modal Popup */}
      {shareModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white shadow-lg max-w-md w-full">
            <div className="relative">
              <button
                onClick={() => setShareModalOpen(false)}
                className="absolute -top-8 right-2 p-1"
              >
                <X size={22} />
              </button>
              <div className="relative w-full h-64">
                <img
                  src={`http://localhost:5001${property.image}`}
                  alt={property.title}
                  className="w-full h-full object-cover mt-8"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-transparent"></div>
                <div className="absolute top-4 left-4 text-white">
                  <h2 className="text-2xl text-left font-playfair">
                    {property.title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold">Share</h3>
              <p className="text-gray-600 mt-2">
                {property.subtitle}
              </p>

              <div className="flex justify-left space-x-4 mt-4">
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaFacebook size={20} />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaInstagram size={20} />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaLinkedin size={20} />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaXTwitter size={20} />
                </button>
                <button className="p-2 bg-gray-200 rounded-full">
                  <FaWhatsapp size={20} />
                </button>
              </div>
            </div>
            <div className="bg-green-700 h-4"></div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-all"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </>
  );
};

export default ListingPage;