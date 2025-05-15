
import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white shadow-sm rounded-lg p-2 md:p-3 min-w-[140px]">
      <div
        className={`text-lg md:text-xl flex justify-center items-center ${color} text-white w-10 h-10 md:w-12 md:h-12 rounded-md`}
      >
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-xs md:text-sm font-medium text-gray-600">{text}</p>
        <p className="text-base md:text-lg font-semibold text-black">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
