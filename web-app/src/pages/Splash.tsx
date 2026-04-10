import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SentinelLogo } from '../components/SentinelLogo';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#02050A] overflow-hidden relative">
      <AnimatePresence>
        <motion.div 
          key="logo-container"
          initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 1.1, opacity: 0, filter: "blur(15px)" }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center justify-center w-full h-full"
        >
          {/* Subtle pulse ring behind the drawn logo */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] -z-10"
          />

          <SentinelLogo />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
