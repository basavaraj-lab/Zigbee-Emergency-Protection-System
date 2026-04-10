import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AboutModal } from '../components/AboutModal';
import { Home, Phone, Info, Users, LogOut, AlertTriangle, Eye, ArrowRight, ShieldAlert, Activity, ScanLine } from 'lucide-react';
import { TrailingCursor } from '../components/TrailingCursor';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-[#02050A] text-slate-100 flex flex-col font-sans overflow-hidden cursor-crosshair">
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <TrailingCursor />
      
      {/* Top Navbar */}
      <nav className="h-16 px-6 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between shadow-2xl shrink-0 z-50">
        <div className="flex gap-4 sm:gap-8 items-center">
          <div className="flex items-center gap-2 mr-8 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors" onClick={() => navigate('/home')}>
            <div className="relative">
              <ShieldAlert className="w-6 h-6 text-blue-500" />
              <div className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-20" />
            </div>
            <span className="font-bold text-slate-50 tracking-widest text-sm">SENTINEL COMMAND</span>
          </div>

          <button className="flex items-center gap-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg transition-all duration-300">
            <Home className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider text-xs">Home</span>
          </button>
          <div className="w-px h-4 bg-slate-800"></div>
          <button 
            onClick={() => setShowAbout(true)}
            className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all duration-300"
          >
            <Info className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider text-xs">About</span>
          </button>
          <div className="w-px h-4 bg-slate-800"></div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all duration-300">
            <Users className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider text-xs">Team</span>
          </button>
          <div className="w-px h-4 bg-slate-800"></div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all duration-300">
            <Phone className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider text-xs">Contact Us</span>
          </button>
        </div>
        
        <button onClick={() => {
          localStorage.removeItem('sentinel_auth');
          navigate('/login');
        }} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-all duration-300 bg-slate-900/50 px-5 py-2 rounded-lg border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10">
          <LogOut className="w-4 h-4" />
          <span className="font-bold uppercase tracking-wider text-xs">Logout</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-y-auto relative items-center justify-center p-8">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
        </div>

        <div className="flex flex-col gap-10 z-10 w-full max-w-5xl justify-center items-center">
          
          <div className="text-center space-y-4 mb-2">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500 uppercase"
            >
              Control Modules
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 font-mono text-sm tracking-widest uppercase"
            >
              Select operational overlay
            </motion.p>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {/* ALERTS BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/alerts')}
              className="w-full h-48 rounded-2xl flex items-center p-8 gap-8 border transition-all duration-500 shadow-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border-slate-800 hover:border-red-500 hover:from-red-950/40 hover:to-slate-900/90 text-slate-400 hover:text-red-400 relative overflow-hidden group cursor-pointer backdrop-blur-sm"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-24 h-24 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-colors">
                <Activity className="w-12 h-12 text-slate-500 group-hover:text-red-500 transition-colors" />
              </div>

              <div className="flex flex-col items-start text-left flex-1">
                <span className="text-3xl font-black uppercase tracking-widest text-slate-100 group-hover:text-white mb-2">Tactical Map</span>
                <span className="text-sm font-medium text-slate-500 group-hover:text-red-200/80 mb-4 max-w-lg leading-relaxed">
                  Engage real-time geospatial intelligence. Monitor live threats, dispatch nodes, and review network telemetry.
                </span>
                <div className="flex items-center gap-4 text-xs font-bold font-mono tracking-widest uppercase text-red-500/70 group-hover:text-red-400">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 3 Active Threat Vectors</span>
                  <span>|</span>
                  <span className="flex items-center gap-1">Initialize Interface <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </motion.button>

            {/* LIVE CV BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => console.log('Live CV functionality pending')}
              className="w-full h-48 rounded-2xl flex items-center p-8 gap-8 border transition-all duration-500 shadow-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border-slate-800 hover:border-blue-500 hover:from-blue-950/40 hover:to-slate-900/90 text-slate-400 hover:text-blue-400 relative overflow-hidden group cursor-pointer backdrop-blur-sm"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-24 h-24 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                <ScanLine className="w-12 h-12 text-slate-500 group-hover:text-blue-500 transition-colors" />
              </div>

              <div className="flex flex-col items-start text-left flex-1">
                <span className="text-3xl font-black uppercase tracking-widest text-slate-100 group-hover:text-white mb-2">Live Cameras</span>
                <span className="text-sm font-medium text-slate-500 group-hover:text-blue-200/80 mb-4 max-w-lg leading-relaxed">
                  Stream high-fidelity CCTV nodes across the security mesh. Apply structural edge detection to live feeds.
                </span>
                <div className="flex items-center gap-4 text-xs font-bold font-mono tracking-widest uppercase text-blue-500/70 group-hover:text-blue-400">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> 102 Online Feeds</span>
                  <span>|</span>
                  <span className="flex items-center gap-1">Open Matrix <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </motion.button>
          </div>

        </div>
      </main>
    </div>
  );
}
