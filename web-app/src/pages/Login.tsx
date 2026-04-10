import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, ShieldAlert, LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('sentinel_auth', 'true');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left side mapping graphic */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center border-r border-slate-800">
        <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center gap-6 p-12 text-center text-slate-300">
          <Network className="w-24 h-24 text-blue-500/50" />
          <h2 className="text-3xl font-bold text-slate-100">Sentinel Mesh</h2>
          <p className="max-w-md text-lg text-slate-400">
            Zigbee Emergency Response System - Mission Critical Protocol Network.
          </p>
        </div>
      </div>
      
      {/* Right side login form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-sm mx-auto space-y-8">
          <div className="flex flex-col items-start space-y-2">
            <div className="p-3 bg-red-500/10 rounded-xl rounded-bl-sm border border-red-500/20 mb-4 inline-flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-400" />
              <span className="font-bold text-red-400 uppercase tracking-widest text-xs">Operator access</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-100">Command Center</h1>
            <p className="text-slate-400 text-sm">Sign in to monitor system nodes.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Operator ID / Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="admin@sentinelmesh.net"
                  required
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Access Key</label>
                  <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Recover</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-50 font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Engage
                  <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
