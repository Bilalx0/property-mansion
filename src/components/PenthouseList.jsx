import React from "react";
import MansionCard from "./Card";

const PenthouseList = ({ penthouses }) => {
  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {/* Consistent card spacing and centered layout */}
      {penthouses.length > 0 ? (
        penthouses.map((penthouse) => (
          <MansionCard key={penthouse.reference} mansion={penthouse} />
        ))
      ) : (
        <p className="text-gray-600 text-center w-full text-lg">
          No penthouses found matching your search.
        </p>
      )}
    </div>
  );
};

export default PenthouseList;