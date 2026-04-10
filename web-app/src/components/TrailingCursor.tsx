import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function TrailingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Increased bubble count for an extremely long tail
  const totalBubbles = 45;

  return (
    <>
      {Array.from({ length: totalBubbles }).map((_, i) => {
        // Starts at 24px, shrinks down very slowly for a long ray
        const size = Math.max(2, 24 - i * 0.5);
        const offset = size / 2;
        
        // Very loose/stretchy physics to create a massive drag/tail effect
        const stiffness = Math.max(10, 400 - i * 12);
        const damping = 20 + i * 1.2;
        const mass = 0.1 + i * 0.2;

        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 pointer-events-none z-[100] mix-blend-screen"
            style={{ 
              width: size,
              height: size,
              boxShadow: `0 0 ${8 + size}px 3px rgba(168, 85, 247, ${0.7 - i * 0.015})`,
              opacity: Math.max(0, 1 - i * 0.02)
            }}
            animate={{
              x: mousePosition.x - offset,
              y: mousePosition.y - offset,
            }}
            transition={{ type: 'spring', stiffness, damping, mass }}
          />
        );
      })}
    </>
  );
}
