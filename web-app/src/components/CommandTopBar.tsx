import { ShieldAlert, Bell, Search, RefreshCw, Globe, ArrowDownToLine, Menu, Activity } from "lucide-react";
import type { NodeData } from '../data/mockData';

interface Props {
  onToggleProtocolPanel?: () => void;
  nodes: NodeData[];
  onRefresh: () => void;
  onCenterMap: () => void;
}

export function CommandTopBar({ nodes, onRefresh, onCenterMap, onToggleProtocolPanel }: Props) {
  const activeIncidents = nodes.filter(n => n.status !== 'RESOLVED').length;
  const onlineCount = nodes.filter(n => new Date().getTime() - new Date(n.last_heartbeat).getTime() < 600000).length;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-50 shrink-0 shadow-md">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-slate-400 lg:hidden" />
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 animate-pulse">
          <ShieldAlert className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-slate-50 tracking-wider">SENTINEL COMMAND</span>
        </div>
        <div className="hidden lg:flex items-center ml-4 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
          <span className="text-xs font-bold text-red-500 tracking-wider">DEFCON 3</span>
        </div>
      </div>

      {/* Center Console */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8 gap-4 justify-between">
        <div className="flex items-center gap-6 px-6 py-1.5 bg-slate-950 rounded-lg border border-slate-800 flex-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-black">Incidents</span>
            <span className="text-sm font-bold text-red-400">{activeIncidents} ACTIVE</span>
          </div>
          <div className="w-px h-6 bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-black">Network Health</span>
            <span className="text-sm font-bold text-emerald-400">{onlineCount}/{nodes.length} ONLINE</span>
          </div>
          <div className="w-px h-6 bg-slate-800"></div>
          <div className="flex items-center gap-2 flex-1 group">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="System Search..." 
              className="bg-transparent border-none text-sm text-slate-300 w-full focus:outline-none placeholder-slate-600"
            />
          </div>
        </div>
      </div>

      {/* User / Actions */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleProtocolPanel} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white border border-indigo-500/30 font-bold text-[10px] tracking-widest rounded transition-all flex items-center gap-2" title="Protocol Data Interface">
          <Activity className="w-4 h-4" /> PROTOCOLS
        </button>
        <div className="w-px h-6 bg-slate-800 mx-2"></div>
        <button onClick={onRefresh} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-all" title="Refresh Feed">
          <RefreshCw className="w-5 h-5" />
        </button>
        <button onClick={onCenterMap} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-all" title="Center Map">
          <Globe className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-slate-800 mx-2"></div>
        <button className="relative p-2 text-slate-400 hover:text-slate-100 transition-all">
          <Bell className="w-5 h-5" />
          {activeIncidents > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
          )}
        </button>
        <div className="h-8 w-8 ml-2 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-slate-700 flex items-center justify-center font-bold text-xs uppercase cursor-pointer">
          OP
        </div>
      </div>
    </header>
  );
}
