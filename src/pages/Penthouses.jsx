import React, { useState } from "react";
import "../components/man.css";
import { FaSearch } from "react-icons/fa";
import logo from "../assests/TMM-LANDING PAGE 1.svg";
import Footer from "../components/Footer";
import { Menu, X, ChevronDown } from "lucide-react";
import PenthouseList from "../components/PenthouseList";
import { useMansions } from "../context/MansionContext";

const Penthouses = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    minSize: "",
    maxSize: "",
    sortBy: "newest"
  });
  const { mansions } = useMansions();

  // Split search query into individual terms
  const searchTerms = searchQuery
    .toLowerCase()
    .split(" ")
    .filter((term) => term);

  // Filter penthouses based on search query and filters
  const filteredPenthouses = mansions.filter((mansion) => {
    // Only include Penthouse property type
    if (mansion.propertytype !== "Penthouse") return false;

    // Search query filtering (country, area, district, city, community, subcommunity)
    if (searchTerms.length > 0) {
      const matchesSearch = searchTerms.some((term) =>
        [
          mansion.country,
          mansion.area,
          mansion.district,
          mansion.city,
          mansion.community,
          mansion.subcommunity,
        ].some((field) => field && field.toLowerCase().includes(term))
      );
      
      if (!matchesSearch) return false;
    }

    // Bedrooms filter
    if (filters.bedrooms && mansion.bedrooms < parseInt(filters.bedrooms)) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && mansion.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && mansion.price > parseInt(filters.maxPrice)) {
      return false;
    }

    // Size range filter
    if (filters.minSize && mansion.size < parseInt(filters.minSize)) {
      return false;
    }
    if (filters.maxSize && mansion.size > parseInt(filters.maxSize)) {
      return false;
    }

    return true;
  });

  // Sort the filtered penthouses
  const sortedPenthouses = [...filteredPenthouses].sort((a, b) => {
    switch (filters.sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "size_low":
        return a.size - b.size;
      case "size_high":
        return b.size - a.size;
      case "newest":
      default:
        // Assuming there's a date field, otherwise fall back to reference
        return a.reference < b.reference ? 1 : -1;
    }
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      minSize: "",
      maxSize: "",
      sortBy: "newest"
    });
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

            {/* Filter Button */}
            <button 
              className="bg-[#00603A] px-4 py-1 flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <span className="mr-1">Filters</span>
              <ChevronDown className="w-4 h-4" />
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

        {/* Filters Panel */}
        {filtersOpen && (
          <div className="w-full bg-white shadow-md rounded-md p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Bedrooms Filter */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                  <option value="6">6+</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Price Range (USD)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="border border-gray-300 px-3 py-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="border border-gray-300 px-3 py-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                  />
                </div>
              </div>

              {/* Size Range */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Size Range (sq.ft)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minSize"
                    placeholder="Min"
                    value={filters.minSize}
                    onChange={handleFilterChange}
                    className="border border-gray-300 px-3 py-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                  />
                  <input
                    type="number"
                    name="maxSize"
                    placeholder="Max"
                    value={filters.maxSize}
                    onChange={handleFilterChange}
                    className="border border-gray-300 px-3 py-2 w-1/2 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price (Low to High)</option>
                  <option value="price_high">Price (High to Low)</option>
                  <option value="size_low">Size (Small to Large)</option>
                  <option value="size_high">Size (Large to Small)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-end gap-2 col-span-1 md:col-span-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="px-4 py-2 bg-[#00603A] text-white hover:bg-[#004e30] transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

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

        {/* Results count */}
        <p className="text-gray-600">
          {sortedPenthouses.length} properties found
        </p>

        {/* Penthouse List */}
        <PenthouseList penthouses={sortedPenthouses} />
      </div>
      <Footer />
    </>
  );
};

export default Penthouses;