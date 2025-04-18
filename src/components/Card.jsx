import { FaTwitter } from "react-icons/fa"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import sharelogo from "../assests/Share Icon_1.svg";
import sharelogoHover from "../assests/Share Icon White.svg";

const MansionCard = ({ mansion, onShare }) => {
  const FALLBACK_IMAGE = "/images/fallback.jpg";
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setShareModalOpen(true);
    if (onShare) onShare();
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/mansion/${mansion.reference}`;
  };

  const encodeShareText = () => {
    return encodeURIComponent(
      `Check out this property: ${mansion.title} - AED ${mansion.price || "N/A"} in ${mansion.community || "N/A"}, ${mansion.country || "N/A"}`
    );
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToInstagram = () => {
    navigator.clipboard.writeText(getShareUrl());
    alert("Instagram sharing is not directly supported. Link copied to clipboard for sharing!");
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getShareUrl())}&title=${encodeShareText()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeShareText()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeShareText()}%20${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white overflow-hidden relative max-w-sm">
      <div className="relative">
        <img
          src={mansion.images?.[0] || mansion.image || FALLBACK_IMAGE}
          alt={mansion.title || "Property"}
          className="w-full h-48 object-cover"
        />
        {mansion.tag === "Featured" && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-sm uppercase font-bold rounded">
            {mansion.tag}
          </span>
        )}
        <button
          onClick={handleShareClick}
          onMouseEnter={() => setIsShareHovered(true)}
          onMouseLeave={() => setIsShareHovered(false)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
        >
          <img
            src={isShareHovered ? sharelogoHover : sharelogo}
            alt="Share"
            className="w-5 h-5"
          />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xl font-semibold text-gray-800">
          AED {mansion.price || "N/A"}
        </p>
        <p className="text-sm text-gray-600">{mansion.propertytype || "N/A"}</p>
        <p className="text-sm text-gray-600">
          {mansion.bedrooms || 0} Beds | {mansion.bathrooms || 0} Baths | {mansion.size || 0} sqft
        </p>
        <p className="text-sm text-gray-600">
          {mansion.community || "N/A"}, {mansion.subcommunity || "N/A"}, {mansion.country || "N/A"}
        </p>
        <div className="mt-3">
          <Link
            to={`/mansion/${mansion.reference}`}
            className="inline-block text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
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
                  src={mansion.image || FALLBACK_IMAGE}
                  alt={mansion.title}
                  className="w-full h-full object-cover mt-8"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-transparent"></div>
                <div className="absolute top-4 left-4 text-white">
                  <h2 className="text-2xl text-left font-playfair">
                    {mansion.title}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold">Share</h3>
              <p className="text-gray-600 mt-2">
                {mansion.subtitle || "Check out this amazing property!"}
              </p>
              <div className="flex justify-left space-x-4 mt-4">
                <button
                  onClick={shareToFacebook}
                  className="p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook size={20} />
                </button>
                <button
                  onClick={shareToInstagram}
                  className="p-2 bg-gray-200 rounded-full hover:bg-pink-600 hover:text-white transition-colors"
                  aria-label="Share on Instagram"
                >
                  <FaInstagram size={20} />
                </button>
                <button
                  onClick={shareToLinkedIn}
                  className="p-2 bg-gray-200 rounded-full hover:bg-blue-800 hover:text-white transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin size={20} />
                </button>
                <button
                  onClick={shareToTwitter}
                  className="p-2 bg-gray-200 rounded-full hover:bg-blue-400 hover:text-white transition-colors"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter size={20} />
                </button>
                <button
                  onClick={shareToWhatsApp}
                  className="p-2 bg-gray-200 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </button>
              </div>
            </div>
            <div className="bg-green-700 h-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};


export default MansionCard;