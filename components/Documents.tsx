import React from "react";
import PlaceholderDocument from "./PlaceholderDocument";

const Documents = () => {
  return (
    <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      {/* TODO - Implement Firestore document storage */}
      <PlaceholderDocument />
    </div>
  );
};

export default Documents;
