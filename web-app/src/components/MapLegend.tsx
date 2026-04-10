import { Flame, Wind, HeartPulse, ShieldCheck, Zap } from 'lucide-react';

export function MapLegend() {
  return (
    <div className="absolute left-4 bottom-4 z-[400] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-3 rounded-lg shadow-xl drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] flex flex-col gap-2">
       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          Map Overlay Legend
       </h4>
       
       <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
          <div className="flex items-center gap-2">
            <div className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-red-400"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Flame className="w-3 h-3 text-red-500" /> Fire Threat</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] border border-amber-400"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><Wind className="w-3 h-3 text-amber-500" /> Gas Leak</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] border border-cyan-400"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1"><HeartPulse className="w-3 h-3 text-cyan-500" /> Medical SOS</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500/50 border border-emerald-500/40"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500/50" /> Normal Node</span>
          </div>
       </div>
    </div>
  );
}
