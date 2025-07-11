// CarIcon.tsx
'use client';
import React from 'react';

const CarFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M480 192h-16.16L419.83 56.56A64 64 0 0 0 360.92 16H151.08a64 64 0 0 0-58.91 40.56L48.16 192H32A32 32 0 0 0 0 224v80a32 32 0 0 0 32 32v96a48 48 0 0 0 48 48h16a32 32 0 0 0 64 0h192a32 32 0 0 0 64 0h16a48 48 0 0 0 48-48v-96a32 32 0 0 0 32-32v-80a32 32 0 0 0-32-32zM134.58 76.09A32 32 0 0 1 151.08 64h209.84a32 32 0 0 1 16.5 4.58l40.71 123.33H93.87zM96 400a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm320 0a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm64-96H32v-64h448z" />
  </svg>
);

export default CarFIcon;
