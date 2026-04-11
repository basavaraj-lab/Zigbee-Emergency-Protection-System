import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Mail } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers = [
  {
    name: "Basavaraju R K",
    role: "Backend Developer",
    skills: ["HTML", "CSS", "JavaScript", "Python"],
    image: "https://ui-avatars.com/api/?name=Basavaraju+R+K&background=0D8ABC&color=fff&size=128",
    github: "#",
    linkedin: "#",
    email: "mailto:member1@example.com"
  },
  {
    name: "Karthik M",
    role: "Hardware Engineer",
    skills: ["PCB Designer", "IoT Developer"],
    image: "https://ui-avatars.com/api/?name=Karthik+M&background=0D8ABC&color=fff&size=128",
    github: "#",
    linkedin: "#",
    email: "mailto:member2@example.com"
  },
  {
    name: "Ganesha R S",
    role: "Frontend developer",
    skills: ["HTML", "React Native", "Kotlin"],
    image: "https://ui-avatars.com/api/?name=Ganesha+R+S&background=0D8ABC&color=fff&size=128",
    github: "#",
    linkedin: "#",
    email: "mailto:member3@example.com"
  },
  {
    name: "Bhoomika D",
    role: "Team lead",
    skills: ["Java"],
    image: "https://ui-avatars.com/api/?name=Bhoomika+D&background=0D8ABC&color=fff&size=128",
    github: "#",
    linkedin: "#",
    email: "mailto:member4@example.com"
  }
];

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export function TeamModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#02050A]/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="h-16 px-6 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="font-bold tracking-widest text-slate-100 uppercase text-sm">IRIS Team</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto bg-slate-950/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center hover:border-slate-700 transition-colors group"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/30 mb-4 group-hover:border-indigo-400/60 transition-colors">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <h3 className="font-bold text-slate-100 text-lg mb-1">{member.name}</h3>
                    <p className="text-indigo-400 text-sm font-medium mb-4">{member.role}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] rounded uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex items-center gap-4 pt-4 border-t border-slate-800 w-full justify-center">
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                        <GithubIcon />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors">
                        <LinkedinIcon />
                      </a>
                      <a href={member.email} className="text-slate-500 hover:text-red-400 transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
