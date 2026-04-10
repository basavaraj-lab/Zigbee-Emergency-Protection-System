import { useState } from 'react';
import type { NodeData } from '../data/mockData';
import { ChevronUp, ChevronDown, Activity, Battery, Wifi, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export function SystemHealthDrawer({ nodes, onRowClick }: { nodes: NodeData[], onRowClick: (lat: number, lng: number) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNodes = nodes.filter(n => n.node_id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-slate-900 border border-slate-700 border-b-0 px-6 py-2 rounded-t-xl flex items-center gap-2 text-slate-400 hover:text-white transition-colors shadow-[0_-5px_15px_rgba(0,0,0,0.5)] backdrop-blur-md"
      >
        <Activity className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-bold uppercase tracking-widest">System Health Monitor</span>
        {isOpen ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronUp className="w-4 h-4 ml-2" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "30vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-700 pointer-events-auto shadow-2xl flex flex-col"
          >
            <div className="p-3 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Node Status</div>
              <input 
                type="text" 
                placeholder="Search Node ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs px-3 py-1.5 rounded focus:outline-none focus:border-blue-500 text-white w-64"
              />
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-950/50 text-slate-500 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 font-bold tracking-wider uppercase border-b border-slate-800">Node ID</th>
                    <th className="p-3 font-bold tracking-wider uppercase border-b border-slate-800">Status</th>
                    <th className="p-3 font-bold tracking-wider uppercase border-b border-slate-800">Alert Type</th>
                    <th className="p-3 font-bold tracking-wider uppercase border-b border-slate-800">Battery</th>
                    <th className="p-3 font-bold tracking-wider uppercase border-b border-slate-800">Signal (RSSI)</th>
                    <th className="p-3 font-bold tracking-wider uppercase border-b border-slate-800">Last Heartbeat</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {filteredNodes.map(node => {
                    const isOffline = new Date().getTime() - new Date(node.last_heartbeat).getTime() > 600000;
                    const lowBattery = node.battery < 20;
                    return (
                      <tr 
                        key={node.node_id} 
                        onClick={() => onRowClick(node.lat, node.lng)}
                        className="border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer transition-colors"
                      >
                        <td className="p-3 font-mono font-bold text-slate-200">{node.node_id}</td>
                        <td className="p-3">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${isOffline ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                            {isOffline ? 'OFFLINE' : 'ONLINE'}
                          </div>
                        </td>
                        <td className="p-3 font-bold">{node.alert_type}</td>
                        <td className="p-3">
                          <div className={`flex items-center gap-1.5 ${lowBattery ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
                            <Battery className="w-3.5 h-3.5" />
                            {node.battery}%
                            {lowBattery && <AlertTriangle className="w-3 h-3 ml-1 text-red-500 animate-pulse" />}
                          </div>
                        </td>
                        <td className="p-3 flex items-center gap-1.5 font-mono">
                          <Wifi className="w-3.5 h-3.5 text-blue-400" />
                          {node.rssi} dBm
                        </td>
                        <td className="p-3 text-slate-500">{formatDistanceToNow(new Date(node.last_heartbeat))} ago</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
