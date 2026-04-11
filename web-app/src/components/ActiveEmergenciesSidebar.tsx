import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { NodeData } from '../data/mockData';
import { Flame, Wind, HeartPulse, ShieldCheck, MapPin, AlertCircle, Clock, Navigation, Zap, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  nodes: NodeData[];
  onFlyTo: (lat: number, lng: number) => void;
  onAcknowledge: (id: string) => void;
}

export function ActiveEmergenciesSidebar({ nodes, onFlyTo, onAcknowledge }: Props) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'ACKNOWLEDGED' | 'DISPATCHED'>('ALL');
  
  const incidents = nodes
    .filter(n => n.status !== 'RESOLVED')
    .filter(n => filter === 'ALL' || n.status === filter)
    .sort((a, b) => new Date(b.triggered_at).getTime() - new Date(a.triggered_at).getTime());

  return (
    <aside className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.5)] z-40 relative">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
          Active Threats
          <span className="bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full text-xs animate-pulse">
            {incidents.length} LIVE
          </span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'PENDING', 'ACKNOWLEDGED', 'DISPATCHED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all ${
                filter === f 
                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        <AnimatePresence>
          {incidents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-600 gap-3">
              <ShieldCheck className="w-12 h-12 text-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-widest">No active threats detected</p>
            </div>
          ) : (
            incidents.map((node) => (
              <EmergencyCard 
                key={node.node_id} 
                node={node} 
                onFlyTo={onFlyTo} 
                onAcknowledge={onAcknowledge} 
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

function EmergencyCard({ node, onFlyTo, onAcknowledge }: { node: NodeData; onFlyTo: Function; onAcknowledge: Function }) {
  const { hasPermission } = useAuth();
  const isFire = node.alert_type === 'FIRE';
  const isGas = node.alert_type === 'GAS';
  const isMedical = node.alert_type === 'MEDICAL';
  const isRobbery = node.alert_type === 'ROBBERY';

  const borderColor = isFire ? 'border-red-500/50' : isGas ? 'border-amber-500/50' : isMedical ? 'border-cyan-500/50' : isRobbery ? 'border-fuchsia-500/50' : 'border-emerald-500/50';
  const bgColor = isFire ? 'bg-red-500/10' : isGas ? 'bg-amber-500/10' : isMedical ? 'bg-cyan-500/10' : isRobbery ? 'bg-fuchsia-500/10' : 'bg-emerald-500/10';
  const accentColor = isFire ? 'text-red-400' : isGas ? 'text-amber-400' : isMedical ? 'text-cyan-400' : isRobbery ? 'text-fuchsia-400' : 'text-emerald-400';
  const glow = (node.status === 'PENDING' || node.status === 'DISPATCHED') ? `shadow-[0_0_15px_-3px_${isFire ? 'rgba(239,68,68,0.4)' : isRobbery ? 'rgba(217,70,239,0.4)' : isGas ? 'rgba(245,158,11,0.4)' : 'rgba(6,182,212,0.4)'}]` : '';

  const Icon = isFire ? Flame : isGas ? Wind : isMedical ? HeartPulse : isRobbery ? AlertCircle : ShieldCheck;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onFlyTo(node.lat, node.lng)}
      className={`group cursor-pointer rounded-lg border ${borderColor} ${bgColor} ${glow} overflow-hidden flex flex-col transition-all relative`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${isFire ? 'bg-red-500' : isGas ? 'bg-amber-500' : isRobbery ? 'bg-fuchsia-500' : 'bg-cyan-500'}`}></div>
      
      <div className="p-3 pl-4 flex gap-3">
        <div className={`mt-1 p-2 rounded-md bg-slate-950/50 border ${borderColor} shrink-0`}>
          <Icon className={`w-5 h-5 ${accentColor}`} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-200 tracking-wider truncate" title={node.facility_name ? `${node.facility_name} - ${node.camera_zone_id}` : node.camera_zone_id || node.node_id}>
              {node.facility_name ? node.facility_name : node.camera_zone_id || node.node_id}
            </span>
            <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-950/50 border ${borderColor} ${accentColor}`}>
              {node.status === 'DISPATCHED' ? 'DISPATCHED' : node.priority}
            </span>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <AlertCircle className="w-3 h-3" />
              <span className="truncate">{node.alert_type} PROTOCOL</span>
            </div>
            {node.snapshot_ref && (
              <a href="#" className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
                <ShieldCheck className="w-3 h-3" />
                VIEW SNAPSHOT
              </a>
            )}
          </div>
          
          {(node.building || node.floor || node.sector) && (
            <div className="flex flex-wrap gap-1 mt-1">
              {[node.building, node.floor, node.sector].filter(Boolean).map((loc, i) => (
                <span key={i} className="text-[9px] font-bold text-slate-400 bg-slate-800/50 border border-slate-700 px-1.5 py-0.5 rounded">
                  {loc}
                </span>
              ))}
            </div>
          )}

          {/* CV Analytics Metadata */}
          {node.confidence && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-950/50 px-1.5 py-0.5 rounded border border-slate-800">
                <Activity className="w-3 h-3 text-blue-400" />
                <span>CONF: {(node.confidence * 100).toFixed(0)}%</span>
              </div>
              {node.validation_frames && (
                <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-950/50 px-1.5 py-0.5 rounded border border-slate-800">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>{node.validation_frames} FRAMES</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span className="font-mono">{formatDistanceToNow(new Date(node.triggered_at))} ago</span>
          </div>
        </div>
      </div>

      {node.escalation_target && (
        <div className="bg-blue-900/20 border-y border-blue-500/20 p-2 pl-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-400 text-[10px] uppercase font-bold tracking-widest">
            <Navigation className="w-3.5 h-3.5 animate-pulse" />
            ROUTING TO: {node.escalation_target}
          </div>
        </div>
      )}

      <div className="bg-slate-950/60 p-2.5 pl-4 border-t border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase font-bold tracking-widest font-mono">
            {node.lat.toFixed(4)}, {node.lng.toFixed(4)}
          </span>
        </div>
        
        {node.status === 'PENDING' || node.status === 'DISPATCHED' ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // RBAC Validation
              if (hasPermission(['super_admin', 'facility_admin', 'operator'])) {
                onAcknowledge(node.node_id);
              } else {
                alert("Access Denied: You do not have permission to acknowledge alerts. Minimum role required: Operator.");
              }
            }}
            className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500 transition-colors shadow-lg"
          >
            ACKNOWLEDGE
          </button>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            ACKNOWLEDGED
          </span>
        )}
      </div>
    </motion.div>
  );
}
