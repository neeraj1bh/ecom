import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex h-[220px] items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-t-4 border-gray-800"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
