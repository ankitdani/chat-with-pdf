import Documents from "@/components/Documents";
import React from "react";

const dashboard = () => {
  return (
    <div className="h-full max-w-7xl max-auto">
      <h1 className="text-3xl p-5 bg-gray-100font-extralight text-indigo-600">
        My Documents
      </h1>
      <Documents />
    </div>
  );
};

export default dashboard;
