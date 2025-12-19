import React from "react";

interface MainTitleProps {
  children: React.ReactNode; // title text
  level?: 1 | 2 | 3; // size level
  className?: string; // optional extra Tailwind classes
  gradient?: boolean; // toggle gradient on/off
}

export default function MainTitle({
  children,
  level = 2,
  className = "",
  gradient = false,
}: MainTitleProps) {
  const sizeClasses =
    level === 1
      ? "text-4xl md:text-6xl"
      : level === 2
      ? "text-3xl md:text-4xl"
      : "text-2xl md:text-3xl";

  const colorClasses = gradient
    ? "bg-gradient-to-r from-teal-800 via-teal-600 to-teal-700 bg-clip-text text-transparent"
    : "text-Pine";

  return (
    <h2
      style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.1)" }}
      className={`${sizeClasses} font-bold font-Aladin mb-6 text-center text-shadow-lime-300 ${colorClasses} ${className}`}
    >
      {children}
    </h2>
  );
}
