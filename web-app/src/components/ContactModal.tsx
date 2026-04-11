import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Globe, MessageSquare, Handshake } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: Props) {
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
            className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="h-16 px-6 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-bold tracking-widest text-slate-100 uppercase text-sm">Contact Us</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto leading-relaxed text-slate-300 space-y-8 font-sans bg-slate-950/50">
              
              <div>
                <h2 className="text-2xl font-black uppercase tracking-widest text-slate-100 mb-4">Get In Touch</h2>
                <p className="text-slate-400">
                  We’d love to hear from you! For any inquiries, support, or collaboration related to SentinelMesh: Zigbee-Based Emergency Response System, please reach out to us through the following channels:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                    <h3 className="font-bold uppercase tracking-wider text-slate-200 text-sm">Email</h3>
                  </div>
                  <a href="mailto:sentinelmesh.project@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    sentinelmesh.project@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                    <h3 className="font-bold uppercase tracking-wider text-slate-200 text-sm">Phone</h3>
                  </div>
                  <a href="tel:+919876543210" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>

                {/* Address */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                    <h3 className="font-bold uppercase tracking-wider text-slate-200 text-sm">Address</h3>
                  </div>
                  <p className="text-slate-400">
                    Department of Electronics and Communication Engineering<br />
                    KVG College of Engineering<br />
                    Sullia, Karnataka, India
                  </p>
                </div>

                {/* Website */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
                    <h3 className="font-bold uppercase tracking-wider text-slate-200 text-sm">Website</h3>
                  </div>
                  <a href="https://www.sentinelmesh.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    www.sentinelmesh.com
                  </a>
                </div>
              </div>

              <hr className="border-slate-800 my-6" />

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-200">Support & Feedback</h3>
                  </div>
                  <p className="text-slate-400 mt-2">
                    If you have any questions, suggestions, or feedback regarding the system, feel free to contact us. Our team is committed to improving emergency response solutions and ensuring reliable communication systems.
                  </p>
                </div>

                <hr className="border-slate-800" />

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Handshake className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-200">Collaboration</h3>
                  </div>
                  <p className="text-slate-400 mt-2">We welcome collaboration opportunities with:</p>
                  <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400 marker:text-emerald-500">
                    <li>Research institutions</li>
                    <li>Industry partners</li>
                    <li>Safety and emergency organizations</li>
                  </ul>
                  <p className="text-slate-400 mt-4 italic font-medium px-4 border-l-2 border-emerald-500">
                    Let’s work together to build safer and smarter environments.
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