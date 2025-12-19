import React from "react";

interface MainBtnProps {
  children: React.ReactNode; // button text or icon
  type?: "button" | "submit" | "reset"; // default is "button"
  onClick?: () => void; // optional click handler
  className?: string; // allow extra Tailwind classes
  disabled?: boolean; // disable state
}

export default function MainBtn({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: MainBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-linear-to-r from-teal-800 via-teal-600 to-teal-700 cursor-pointer  
                  text-gray-100 py-3 px-6 rounded-xl shadow-md hover:shadow-xl
                  hover:from-teal-500 hover:via-teal-400 hover:to-teal-300 hover:text-teal-900 font-Aladin
                  transition duration-300 ease-in-out 
                  disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
