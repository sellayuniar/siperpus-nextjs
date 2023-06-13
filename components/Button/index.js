import React from "react";

const Button = ({ nama }) => {
  return (
    <button className="mt-3 w-56 rounded-full bg-sky-500 py-2 text-white hover:bg-sky-700">
      {nama}
    </button>
  );
};

export default Button;
