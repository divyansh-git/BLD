/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  artist: ServiceItem; // Prop name kept as artist for compatibility, but types updated
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ artist: service, onClick }) => {
  return (
    <motion.div
      className="group relative h-[350px] md:h-[400px] w-full overflow-hidden border-b md:border-r border-slate-700 bg-slate-900 cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={service.image} 
          alt={service.name} 
          className="h-full w-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-500"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <div className="absolute top-6 right-6">
           <motion.div
             variants={{
               rest: { opacity: 0, x: 10, y: -10 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-cyan-500 text-white rounded-full p-2"
           >
             <ArrowUpRight className="w-5 h-5" />
           </motion.div>
        </div>

        <div className="relative z-10">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 block">
             {service.category}
          </span>
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            variants={{
              rest: { y: 0 },
              hover: { y: -5 }
            }}
            transition={{ duration: 0.4 }}
          >
            {service.name}
          </motion.h3>
          
          <motion.p 
            className="text-sm text-slate-300 line-clamp-2 max-w-[90%]"
            variants={{
              rest: { opacity: 0, height: 0 },
              hover: { opacity: 1, height: 'auto' }
            }}
          >
            {service.description}
          </motion.p>

          <div className="mt-4 flex items-center gap-2">
             <div className="h-px w-8 bg-cyan-500/50" />
             <span className="text-xs font-bold text-white">{service.highlight}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;