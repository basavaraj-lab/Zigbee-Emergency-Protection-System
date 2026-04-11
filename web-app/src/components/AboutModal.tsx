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
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
                    SentinelMesh is a high-reliability automated emergency response and incident escalation platform designed for hospitals, laboratories, factories, and other safety-critical facilities. It transforms passive surveillance infrastructure into an active safety and security network.
                  </p>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    By combining computer vision, secure cloud authentication, geospatial alert routing, and real-time incident delivery, the platform minimizes the risk of delayed human intervention, reducing Emergency Response Time (ERT) during fire, medical, and security emergencies.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group pl-5 col-span-1 md:col-span-2">
                  <Cpu className="w-6 h-6 text-indigo-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">AI & Computer Vision Pipeline</h3>
                  <p className="text-sm text-slate-500 mb-2">
                    A multi-stage OpenCV and deep learning pipeline for real-time visual event detection without cloud dependency.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-500 space-y-1">
                    <li><strong className="text-slate-300">Fire Detection:</strong> HSV-based flame segmentation, contour dynamics, and flicker analysis to distinguish true fire.</li>
                    <li><strong className="text-slate-300">Human Analytics:</strong> Person detection and centroid-based multi-object tracking to monitor occupancy and presence.</li>
                    <li><strong className="text-slate-300">Posture Analysis:</strong> Skeletal keypoints and geometry analysis to detect falls and medical distress.</li>
                    <li><strong className="text-slate-300">Security & Intrusion:</strong> Person detection in restricted zones and abnormal movement patterns for robbery detection.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                  <ShieldAlert className="w-6 h-6 text-emerald-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Geospatial Alert Routing</h3>
                  <p className="text-sm text-slate-500">
                    Events contain GPS metadata to dispatch alerts to the nearest responders depending on the incident type: Fire Protocols to fire stations, Health Protocols to hospitals, and Intrusion Protocols to safety teams.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                  <Shield className="w-6 h-6 text-blue-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Auth & Role-Based Access</h3>
                  <p className="text-sm text-slate-500">
                    Secured by Firebase Identity Platform using TLS/SSL, providing OAuth 2.0 Auth and verifiable Custom Claims to restrict Privileged Escelation, Operator controls, and Admin dashboards.
                  </p>
                </div>
                
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                  <HeartPulse className="w-6 h-6 text-red-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Temporal Decision Engine</h3>
                  <p className="text-sm text-slate-500">
                    Reduces false positives by requiring a rule-based state engine to validate multiple events over time (e.g. checking inactivity duration after a fall event).
                  </p>
                </div>
                
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                  <Network className="w-6 h-6 text-orange-400 mb-3 group-hover:-translate-y-1 transition-transform" />
                  <h3 className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-xs">Real-Time Connectivity</h3>
                  <p className="text-sm text-slate-500">
                    Low-latency alerts through WebSockets, MQTT, and FCM to notify users with exact camera locations and confidence intervals across Mobile and Web applications.
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
