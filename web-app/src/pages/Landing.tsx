import { Link } from 'react-router-dom';
import { Shield, Users, Info, Activity, ArrowRight } from 'lucide-react';
import { SentinelLogo } from '../components/SentinelLogo';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#020610] text-slate-200 overflow-x-hidden selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020610]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Shield className="w-8 h-8 text-blue-500" />
             <span className="font-black text-xl italic tracking-tighter text-white">
               Sentinel<span className="text-amber-500">Mesh</span>
             </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-slate-400">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#team" className="hover:text-blue-400 transition-colors">Team</a>
          </div>
          <Link 
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Operator Login <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020610] to-[#020610] -z-10" />
        <div className="scale-75 md:scale-100 mb-8 pointer-events-none">
          <SentinelLogo />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-3xl z-10"
        >
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            The next-generation mission-critical protocol network offering real-time geospatial threat detection, telemetry monitoring, and automated emergency response.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black italic tracking-tighter text-white mb-4">Command Center Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Full operator visibility embedded with critical real-time incident responses mapping directly from Zigbee edge nodes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-blue-500/50 transition-colors">
              <Activity className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-200">Live Telemetry</h3>
              <p className="text-slate-400 text-sm">Monitor real-time network health, battery status, RSSI strength, and environmental conditions (Gas/Temp) across all nodes.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-red-500/50 transition-colors">
              <Shield className="w-10 h-10 text-red-500 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-200">Automated Threat Alerting</h3>
              <p className="text-slate-400 text-sm">Instant visual prioritization of Fire, Gas, and Medical emergencies, dropping the average acknowledgement time to seconds.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-amber-500/50 transition-colors">
              <Info className="w-10 h-10 text-amber-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-slate-200">Protocol Execution</h3>
              <p className="text-slate-400 text-sm">Execute data packet protocols manually to modules in the field, opening continuous localized comms boundaries directly from the Command GUI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black italic tracking-tighter text-white mb-6">About The Project</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            The Zigbee Emergency Protection System solves critical blind spots in rapidly unfolding disaster scenarios. By creating an automated mesh network of specialized sensors, operators are no longer flying blind—they receive exact lat/long geospatial markers, atmospheric conditions, and active responder requirements within milliseconds of incident inception. Designed for absolute reliability when standard infrastructures fail.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 border-t border-slate-900 bg-slate-950/50 outline-none">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black italic tracking-tighter text-white mb-4">Core Engineering Team</h2>
            <p className="text-slate-400">The minds behind Sentinel Mesh protocols.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            {[1, 2, 3].map((member) => (
              <div key={member} className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                  <Users className="w-10 h-10 text-slate-500" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-slate-200">Engineer 0{member}</h4>
                  <span className="text-xs text-blue-400 font-black uppercase tracking-widest">Systems Design</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-slate-900 text-slate-600 text-xs font-black uppercase tracking-widest">
        © 2026 Sentinel Mesh - Zigbee Emergency Response System. Secure Channel.
      </footer>
    </div>
  );
}
