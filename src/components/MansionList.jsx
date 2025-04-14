import React from "react";
import { useMansions } from "../context/MansionContext";
import MansionCard from "./Card";

const MansionList = () => {
  const { mansions } = useMansions();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {mansions.map((mansion) => (
        mansion.propertytype === "Mansion" ? (
          <MansionCard key={mansion.reference} mansion={mansion} />
        ) : null
      ))}
    </div>
  );
};

export default MansionList;