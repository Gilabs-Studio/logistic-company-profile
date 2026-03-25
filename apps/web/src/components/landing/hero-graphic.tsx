import React from "react";

export function HeroGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#e5e7eb" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="line-glow" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Corporate Grid Background */}
      <g stroke="url(#grid-fade)" strokeWidth="1" opacity="0.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1="0" y1={i * 50} x2="1000" y2={i * 50} />
            <line x1={i * 50} y1="0" x2={i * 50} y2="1000" />
          </React.Fragment>
        ))}
      </g>

      {/* Abstract Logistics Nodes & Paths */}
      <g stroke="url(#line-glow)" strokeWidth="2" fill="none">
        <path d="M100 800 L300 650 L500 700 L800 300 L950 400" />
        <path d="M150 750 L350 550 L450 600 L700 250 L850 350" strokeDasharray="5 5" opacity="0.5" />
        <path d="M200 900 L400 750 L600 800 L900 400" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Connection Nodes */}
      <g fill="#ffffff" stroke="#3b82f6" strokeWidth="3">
        <circle cx="300" cy="650" r="6" />
        <circle cx="500" cy="700" r="8" />
        <circle cx="800" cy="300" r="10" />
      </g>
      
      {/* Outer Glows */}
      <g fill="#3b82f6" opacity="0.2">
        <circle cx="300" cy="650" r="16" />
        <circle cx="500" cy="700" r="20" />
        <circle cx="800" cy="300" r="28" />
      </g>

      {/* Geometric Overlay */}
      <rect x="750" y="250" width="100" height="100" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.5" transform="rotate(45 800 300)" />
      <rect x="470" y="670" width="60" height="60" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.5" transform="rotate(15 500 700)" />
    </svg>
  );
}
