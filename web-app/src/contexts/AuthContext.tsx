import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  role: string;
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  hasPermission: (requiredRole: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  hasPermission: () => false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // RBAC Helper
  const hasPermission = (requiredRoles: string | string[]) => {
    if (!profile) return false;
    if (profile.role === 'super_admin') return true;
    
    // Normalize to array
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return roles.includes(profile.role);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      try {
        if (firebaseUser) {
          // Fetch or create user profile in Firestore
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Operator',
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
              role: 'operator', // Default role
              createdAt: serverTimestamp(),
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
          } else {
            setProfile(userSnap.data() as UserProfile);
          }

          // Register user's email locally for the CV Engine Alert Dispatcher
          if (firebaseUser.email) {
            fetch('/api/register-email', {
              method: 'POST',
              body: JSON.stringify({ email: firebaseUser.email })
            }).catch(e => console.error("Local registration failed", e));
          }
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth context error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('sentinel_auth');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}