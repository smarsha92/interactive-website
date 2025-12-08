import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[var(--color-bg)] transition-colors duration-500 pointer-events-none">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Gradient Overlay - Reduced opacity to allow image to show through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0" />
        
        {/* Vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_100%)] z-0" />

        {/* Animated Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden z-0 opacity-40">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)] rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[140px] mix-blend-screen" 
          />
        </div>
    </div>
  );
};

export default Background;