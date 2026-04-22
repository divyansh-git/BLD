/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-bold tracking-tight isolate ${className}`}>
      {/* Main Gradient Text */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-cyan-300 to-white bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translate3d(0,0,0)',
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer for solid white fallback */}
      <span 
        className="block text-white/90"
      >
        {text}
      </span>
      
      {/* Blur Glow Effect - Simplified */}
      <span
        className="absolute inset-0 -z-10 block text-cyan-500/30 blur-lg"
        style={{ 
          transform: 'translate3d(0,0,0)',
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;