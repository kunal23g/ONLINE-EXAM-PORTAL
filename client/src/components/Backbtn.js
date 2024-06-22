import React from "react";

const Backbtn = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="  text-black text-xl px-4 py-2 rounded-md hover:bg-blue-200 focus:outline-none"
    >
      &larr; Go Back
    </button>
  );
};

export default Backbtn;
