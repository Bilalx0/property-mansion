import React from "react";
import { Link } from "react-router-dom";

const MansionCard = ({ mansion }) => {
  return (
    <div
      key={mansion.reference}
      className="bg-white overflow-hidden relative w-full"
    >
      {/* Image and 'Featured' tag */}
      <div className="relative">
        <img
          src={`http://localhost:5001${mansion.image}`}
          alt={mansion.title}
          className="w-full h-48 object-cover"
        />
        {mansion.tag === "Featured" && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-sm uppercase font-bold rounded">
            {mansion.tag}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <p className="text-xl font-semibold text-gray-800">
          AED {mansion.price}
        </p>
        <p className="text-sm text-gray-600">{mansion.propertytype}</p>
        <p className="text-sm text-gray-600">
          {mansion.bedrooms} Beds | {mansion.bathrooms} Baths | {mansion.size} sqft
        </p>
        <p className="text-sm text-gray-600">
          {mansion.community}, {mansion.subcommunity}, {mansion.country}
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
    </div>
  );
};

export default MansionCard;
