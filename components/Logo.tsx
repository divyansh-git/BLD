/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-32 h-32" }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Business Lead Generation Service Logo"
    >
      <defs>
        <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B21B6" /> {/* Purple */}
          <stop offset="50%" stopColor="#0F766E" /> {/* Teal/Green */}
          <stop offset="100%" stopColor="#1E3A8A" /> {/* Deep Blue */}
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Inverted Triangle Background */}
      <path
        d="M50 50 L450 50 L250 450 Z"
        fill="url(#triangleGradient)"
        opacity="0.9"
      />

      {/* BL Typography */}
      <g style={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }} filter="url(#shadow)">
        {/* B */}
        <text x="140" y="280" fontSize="280" fill="white">B</text>
        {/* L overlapping */}
        <text x="260" y="340" fontSize="280" fill="white">L</text>
      </g>

      {/* Script Text "Business Lead" */}
      <text
        x="250"
        y="310"
        textAnchor="middle"
        fill="white"
        fontSize="60"
        style={{ fontFamily: '"Great Vibes", cursive' }}
        filter="url(#shadow)"
      >
        Business Lead
      </text>

      {/* Sans Text "GENERATION SERVICE" */}
      <text
        x="250"
        y="350"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        letterSpacing="4"
        style={{ fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase' }}
      >
        Generation
      </text>
      <text
        x="250"
        y="375"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        letterSpacing="4"
        style={{ fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase' }}
      >
        Service
      </text>
    </svg>
  );
};

export default Logo;
