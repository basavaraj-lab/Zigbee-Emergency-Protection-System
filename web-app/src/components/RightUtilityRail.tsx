import type { NodeData } from '../data/mockData';
import { BarChart3, Clock, AlertOctagon, Zap } from 'lucide-react';
import { motion, } from 'framer-motion';

export function RightUtilityRail({ nodes }: { nodes: NodeData[] }) {
  const fireC = nodes.filter(n => n.alert_type === 'FIRE').length;
  const gasC = nodes.filter(n => n.alert_type === 'GAS').length;
  const medC = nodes.filter(n => n.alert_type === 'MEDICAL').length;
  const robC = nodes.filter(n => n.alert_type === 'ROBBERY').length;
  
  return (
    <div className="absolute right-4 top-4 z-40 flex flex-col gap-3 pointer-events-none drop-shadow-2xl">
      
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="pointer-events-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-4 rounded-xl shadow-lg w-56 flex flex-col gap-4">
        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
          Threat Distribution
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-red-400">FIRE</span>
            <span className="font-mono text-slate-300">{fireC} active</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: `${(fireC / nodes.length) * 100}%` }}></div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-amber-400">GAS</span>
            <span className="font-mono text-slate-300">{gasC} active</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full" style={{ width: `${(gasC / nodes.length) * 100}%` }}></div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-cyan-400">MEDICAL</span>
            <span className="font-mono text-slate-300">{medC} active</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full" style={{ width: `${(medC / nodes.length) * 100}%` }}></div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-fuchsia-400">ROBBERY</span>
            <span className="font-mono text-slate-300">{robC} active</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-fuchsia-500 h-full animate-pulse" style={{ width: `${(robC / nodes.length) * 100}%` }}></div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="pointer-events-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-4 rounded-xl shadow-lg w-56 grid grid-cols-2 gap-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-5">
           <Zap className="w-24 h-24" />
        </div>
        <div className="col-span-2">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-slate-800 pb-2 mb-3">Response KPI</h4>
        </div>
        <div className="flex flex-col gap-1">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-lg font-bold text-slate-100 font-mono">1.2m</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Avg ACK Time</span>
        </div>
        <div className="flex flex-col gap-1">
          <AlertOctagon className="w-4 h-4 text-red-500" />
          <span className="text-lg font-bold text-slate-100 font-mono">3</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Critical Nodes</span>
        </div>
      </motion.div>
      
    </div>
  );
}

