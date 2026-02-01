/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NodeField = () => {
  // Changed stars to "nodes" (data points)
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-blue-200 will-change-[opacity,transform]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: node.opacity, scale: 1 }}
          animate={{
            opacity: [node.opacity, 0.8, node.opacity],
            scale: [1, 1.2, 1],
            y: [0, -20, 0] // Floating effect
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      
      <NodeField />

      {/* Blob 1: Deep Blue */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] bg-blue-900 rounded-full mix-blend-screen filter blur-[60px] opacity-40 will-change-transform"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Cyan */}
      <motion.div
        className="absolute top-[20%] right-[-20%] w-[100vw] h-[80vw] bg-cyan-900 rounded-full mix-blend-screen filter blur-[80px] opacity-30 will-change-transform"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 3: Slate/Indigo */}
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-indigo-900 rounded-full mix-blend-screen filter blur-[60px] opacity-30 will-change-transform"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Subtle Grid Overlay instead of Grain */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-900/20 to-slate-900/80 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;