// src/components/Logo.jsx
import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <>
      <style>
        {`
          @keyframes draw-border {
            from {
              stroke-dashoffset: 144;
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes fade-in-letter {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .logo-animated-border {
            stroke-dasharray: 144;
            stroke-dashoffset: 144;
            animation: draw-border 2s ease-out forwards;
          }

          .logo-animated-letter {
            opacity: 0;
            transform-origin: center;
            animation: fade-in-letter 0.8s ease-out 1.5s forwards;
          }
        `}
      </style>
      <svg 
        className={className}
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Kotak border dengan animasi menggambar */}
        <rect 
          x="2" 
          y="2" 
          width="36" 
          height="36" 
          rx="0" 
          stroke="#2563EB" 
          strokeWidth="3"
          className="logo-animated-border"
        />
        
        {/* Huruf G dengan animasi fade in */}
        <path 
          d="M14 10H26V14H18V26H26V20H22V18H28V28H14V10Z" 
          fill="#2563EB"
          className="logo-animated-letter"
        />
      </svg>
    </>
  );
};

export default Logo;