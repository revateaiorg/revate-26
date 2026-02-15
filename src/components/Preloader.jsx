// components/Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <img
        src="/preloader.gif"
        alt="Loading..."
        className="w-52 h-52 md:w-76 md:h-76"
      />
    </div>
  );
};

export default Preloader;
