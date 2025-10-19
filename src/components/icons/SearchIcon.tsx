import React from "react";

const SearchIcon = () => {
  return (
    <div className="w-[14.92px] h-[16.12px] relative">
      <div className="w-[13px] h-[13px] left-0 top-0 absolute rounded-full border border-[#818181]" />
      <div data-svg-wrapper className="left-[10.20px] top-[11px] absolute">
        <svg
          width="7"
          height="7"
          viewBox="0 0 7 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.19922 1L5.71945 6.11909"
            stroke="#828282"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchIcon;
