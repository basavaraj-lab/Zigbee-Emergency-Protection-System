import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { auth, googleProvider } from '../services/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Redirect to dashboard directly if already logged in!
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('sentinel_auth', 'true');
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Google sign-in failed:", error);
      if (error.code === 'auth/operation-not-allowed') {
        setError("Google Auth not enabled in Firebase Console.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError("Authentication popup closed before finishing.");
      } else {
        setError(error.message || "Authentication failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex relative justify-center items-center overflow-hidden">
      
      {/* Background Graphic/Animation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 transition-opacity bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg px-8 py-10"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 rounded-2xl shadow-2xl space-y-8">
          
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.15)] relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
              <ShieldAlert className="w-8 h-8 text-red-500 relative z-10 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Command Center
              </h1>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                Emergency Protection System
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 text-red-400 p-4 border border-red-500/20 rounded-xl text-sm"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                disabled={loading}
                onClick={handleGoogleLogin}
                className="w-full relative group overflow-hidden bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-4 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating secure link...</span>
                  </div>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 41.939 C -8.804 40.009 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-xs text-slate-500">
              Only authorized operators hold credentials. All activity is logged.
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
