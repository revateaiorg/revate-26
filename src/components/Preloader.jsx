// components/Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <img
        src="/preloader.gif"
        alt="Loading..."
        className="w-40 h-auto md:w-64 md:h-auto"
      />
    </div>
  );
};

export default Preloader;
