import { ShieldAlert, Bell, Search, RefreshCw, Globe, Menu, Activity, ChevronLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import type { NodeData } from '../data/mockData';
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onToggleProtocolPanel?: () => void;
  nodes: NodeData[];
  onRefresh: () => void;
  onCenterMap: () => void;
}

export function CommandTopBar({ nodes, onRefresh, onCenterMap, onToggleProtocolPanel }: Props) {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const activeIncidents = nodes.filter(n => n.status !== 'RESOLVED').length;
  const onlineCount = nodes.filter(n => new Date().getTime() - new Date(n.last_heartbeat).getTime() < 600000).length;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-50 shrink-0 shadow-md">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-slate-400 lg:hidden" />
        <button onClick={() => navigate('/dashboard')} className="p-1 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 animate-pulse cursor-pointer" onClick={() => navigate('/dashboard')}>
          <ShieldAlert className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-slate-50 tracking-wider hidden sm:block">SENTINEL COMMAND</span>
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
          <Activity className="w-4 h-4" /> <span className="hidden sm:inline">PROTOCOLS</span>
        </button>
        <div className="w-px h-6 bg-slate-800 mx-2 hidden sm:block"></div>
        <button onClick={onRefresh} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-all hidden sm:block" title="Refresh Feed">
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
        
        {/* Profile Dropdown */}
        <div className="relative ml-2">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center justify-center p-0.5 rounded-full ring-2 ring-transparent hover:ring-slate-700 transition-all"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-slate-700" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-slate-700 flex items-center justify-center font-bold text-xs uppercase text-white shadow-sm">
                {profile?.name?.substring(0, 2) || 'OP'}
              </div>
            )}
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-2 z-50 flex flex-col"
              >
                <div className="px-4 py-3 border-b border-slate-800/60 mb-2">
                  <p className="text-sm font-bold text-slate-100 truncate">{profile?.name || user?.displayName || 'Operator'}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {profile?.role || 'operator'}
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="mx-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors text-left font-medium"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
