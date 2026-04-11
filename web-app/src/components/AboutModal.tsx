import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Cpu, HeartPulse, Shield, Network } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#02050A]/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="h-16 px-6 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                  <Network className="w-4 h-4 text-blue-400" />
                </div>
                <span className="font-bold tracking-widest text-slate-100 uppercase text-sm">System Overview</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto leading-relaxed text-slate-300 space-y-8 font-sans">
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shrink-0 mt-1">
                  <ShieldAlert className="w-12 h-12 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-slate-100 mb-3 flex items-center gap-3">
                    About SentinelMesh
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">ACTIVE</span>
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    SentinelMesh is an intelligent, decentralized emergency communication system designed to ensure fast, reliable, and internet-independent alert transmission during critical situations such as medical emergencies, fire hazards, and security threats.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                  <Cpu className="w-6 h-6 text-indigo-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Self-Healing Mesh</h3>
                  <p className="text-sm text-slate-500">
                    Built using ESP32 and Zigbee, forming a mesh network. Each node acts as both a sender and receiver, enabling distributed communication without centralized infrastructure.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                  <HeartPulse className="w-6 h-6 text-red-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Emergency Propagation</h3>
                  <p className="text-sm text-slate-500">
                    Nodes generate alerts containing type, ID, and priority. This propagates across multiple nodes using multi-hop communication instantly.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group pl-5 col-span-1 md:col-span-2">
                  <Shield className="w-6 h-6 text-emerald-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Reliability & Edge Processing</h3>
                  <p className="text-sm text-slate-500">
                    Incorporates ACK mechanisms—if an acknowledgment fails, the system automatically retransmits via alternate paths. Equipped with local alert systems (OLED, bells), edge processing ensures ultra-low latency without internet connectivity.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
