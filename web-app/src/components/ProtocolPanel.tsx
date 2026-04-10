import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Send, Download, Terminal, Flame, Wind, HeartPulse } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ProtocolPanel({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'FIRE' | 'GAS' | 'MEDICAL'>('FIRE');
  const [logs, setLogs] = useState<string[]>(["> INITIALIZING SENSORS... OK"]);

  const handleSend = () => {
    setLogs(prev => [...prev, `> TX (${activeTab}): PACKET TRANSMITTED`]);
    setTimeout(() => {
        setLogs(prev => [...prev, `> RX (${activeTab}): ACKNOWLEDGED BY EDGE NODE`]);
    }, 600);
  };

  const handleReceive = () => {
    setLogs(prev => [...prev, `> REQ: PULLING CACHED ${activeTab} STATES...`]);
    setTimeout(() => {
        const val = activeTab === 'FIRE' ? 'TEMP: 86C' : activeTab === 'GAS' ? 'CH4: 12ppm' : 'HB: 110bpm';
        setLogs(prev => [...prev, `> RX (${activeTab}): ${val} - CONTINUOUS STREAM OPEN`]);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute top-20 right-4 z-50 w-[400px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-500" />
              <h2 className="font-bold uppercase tracking-widest text-slate-100 text-sm">Protocol Control</h2>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900">
            <button 
              onClick={() => setActiveTab('FIRE')} 
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'FIRE' ? 'bg-red-500/10 text-red-400 border-b-2 border-red-500' : 'text-slate-500 hover:bg-slate-800'}`}
            >
              <Flame className="w-3.5 h-3.5" /> FIRE
            </button>
            <button 
              onClick={() => setActiveTab('GAS')} 
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'GAS' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' : 'text-slate-500 hover:bg-slate-800'}`}
            >
              <Wind className="w-3.5 h-3.5" /> GAS
            </button>
            <button 
              onClick={() => setActiveTab('MEDICAL')} 
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'MEDICAL' ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-500 hover:bg-slate-800'}`}
            >
              <HeartPulse className="w-3.5 h-3.5" /> MEDICAL
            </button>
          </div>

          {/* Actions */}
          <div className="p-6 flex gap-4">
             <button 
               onClick={handleSend}
               className="flex-1 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-white rounded-lg py-4 flex flex-col items-center gap-2 transition-all shadow-lg"
             >
                <Send className="w-6 h-6 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Send Data</span>
             </button>
             <button 
               onClick={handleReceive}
               className="flex-1 bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 text-white rounded-lg py-4 flex flex-col items-center gap-2 transition-all shadow-lg"
             >
                <Download className="w-6 h-6 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Recv Data</span>
             </button>
          </div>

          {/* Terminal Console */}
          <div className="p-4 bg-black border-t border-slate-800 h-40 overflow-y-auto font-mono text-[10px] leading-relaxed text-slate-400 relative">
             <div className="absolute top-2 right-2 opacity-30"><Terminal className="w-4 h-4" /></div>
             {logs.map((log, i) => (
                <div key={i} className={`${log.includes('TX') ? 'text-blue-400' : log.includes('RX') ? 'text-emerald-400' : ''}`}>{log}</div>
             ))}
             <div className="animate-pulse">_</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
