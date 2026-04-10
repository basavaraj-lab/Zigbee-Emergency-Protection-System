export function SentinelLogo() {
  return (
    <div className="flex flex-col items-center justify-center p-8 scale-110">
      <div className="relative w-72 h-[320px] flex flex-col items-center">
        {/* Antenna at top */}
        <svg viewBox="0 0 100 40" className="absolute -top-10 w-24 h-16 z-20">
          <circle cx="50" cy="30" r="5" fill="#e5e7eb" />
          <path d="M 50 25 V 10" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" />
          <path d="M 33 22 C 40 10 60 10 67 22" fill="none" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
          <path d="M 23 15 C 36 -2 64 -2 77 15" fill="none" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Main Shield */}
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] absolute z-10">
          <defs>
            <linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="40%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="silverPadlock" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>

          {/* Outer silver rim */}
          <path d="M 100 5 L 195 25 L 190 120 C 185 170 120 225 100 235 C 80 225 15 170 10 120 L 5 25 Z" fill="url(#silverRim)" />
          
          {/* Inner dark rim spacing */}
          <path d="M 100 12 L 187 30 L 182 118 C 177 165 118 216 100 225 C 82 216 23 165 18 118 L 13 30 Z" fill="#0f172a" />

          {/* Top Red/Orange Section */}
          <path d="M 100 15 L 184 33 L 180 100 L 100 100 L 20 100 L 16 33 Z" fill="url(#redGrad)" />
          
          {/* Bottom Blue Mesh Section - Polygon chevron style */}
          <path d="M 180 98 L 100 80 L 20 98 L 18 118 C 23 163 82 214 100 222 C 118 214 177 163 182 118 Z" fill="url(#blueGrad)" stroke="#1e40af" strokeWidth="2.5" />

          {/* Medical Cross */}
          <path d="M 33 45 H 48 V 32 H 58 V 45 H 73 V 55 H 58 V 68 H 48 V 55 H 33 Z" fill="#ffffff" />

          {/* Flame */}
          <path d="M 140 70 C 130 70 125 55 125 45 C 135 55 140 50 145 35 C 150 40 155 45 155 55 C 160 50 162 40 160 30 C 165 40 170 55 165 65 C 160 75 145 75 140 70 Z" fill="#ffffff" />
          <path d="M 140 68 C 135 68 132 60 132 55 C 140 62 145 50 145 45 C 150 55 155 70 140 68 Z" fill="#dc2626" />

          {/* Mesh Network Nodes */}
          <g stroke="#bfdbfe" strokeWidth="1.5">
            <line x1="25" y1="110" x2="60" y2="135" />
            <line x1="60" y1="135" x2="70" y2="175" />
            <line x1="70" y1="175" x2="100" y2="200" />
            <line x1="100" y1="200" x2="130" y2="175" />
            <line x1="130" y1="175" x2="140" y2="135" />
            <line x1="140" y1="135" x2="175" y2="110" />
            
            <line x1="60" y1="135" x2="100" y2="145" />
            <line x1="140" y1="135" x2="100" y2="145" />
            <line x1="70" y1="175" x2="100" y2="145" />
            <line x1="130" y1="175" x2="100" y2="145" />
            
            <line x1="25" y1="110" x2="60" y2="85" />
            <line x1="175" y1="110" x2="140" y2="85" />
            <line x1="60" y1="85" x2="100" y2="80" />
            <line x1="140" y1="85" x2="100" y2="80" />
          </g>
          
          <g fill="#ffffff">
            <circle cx="25" cy="110" r="4.5" />
            <circle cx="60" cy="135" r="4" />
            <circle cx="70" cy="175" r="4" />
            <circle cx="100" cy="200" r="4.5" />
            <circle cx="130" cy="175" r="4" />
            <circle cx="140" cy="135" r="4" />
            <circle cx="175" cy="110" r="4.5" />
            <circle cx="60" cy="85" r="4" />
            <circle cx="140" cy="85" r="4" />
            <circle cx="100" cy="80" r="5" />
          </g>

          {/* Central Padlock */}
          <g transform="translate(68, 100)">
            {/* Shackle */}
            <path d="M 17 25 V 15 C 17 -5 47 -5 47 15 V 25" fill="none" stroke="#f1f5f9" strokeWidth="9" strokeLinecap="round" />
            <path d="M 17 25 V 15 C 17 -1 47 -1 47 15 V 25" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Lock Body */}
            <rect x="5" y="20" width="54" height="42" rx="10" fill="url(#silverPadlock)" stroke="#334155" strokeWidth="2.5" />
             {/* Bottom curved reflection */}
            <path d="M 5 28 Q 32 36 59 28" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
            
            {/* Keyhole */}
            <circle cx="32" cy="40" r="4.5" fill="#0f172a" />
            <path d="M 30 43 L 27 52 H 37 L 34 43 Z" fill="#0f172a" />
          </g>
        </svg>
      </div>

      {/* Typography scaled to match logo size precisely */}
      <div className="mt-[20px] text-center z-10 w-full flex flex-col items-center">
        <h1 className="text-[3.5rem] md:text-[4rem] font-black italic tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex">
          <span className="text-[#f8fafc]">Sentinel</span>
          <span className="text-[#facc15] drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">Mesh</span>
        </h1>
        
        {/* Glowing Divider Line */}
        <div className="relative w-full max-w-[380px] h-[1px] mt-1 mb-2 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-70" />
          <div className="absolute w-1/2 h-[2px] bg-cyan-400 blur-[2px]" />
          <div className="absolute w-1/4 h-[2px] bg-[#06b6d4] shadow-[0_0_12px_#06b6d4]" />
        </div>

        {/* Subtitle with side lines */}
        <div className="flex items-center justify-center w-full max-w-[400px] px-2 gap-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-400 opacity-80" />
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.16em] text-slate-200 uppercase whitespace-nowrap truncate">
            Zigbee Emergency Response System
          </h2>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-400 opacity-80" />
        </div>
      </div>
    </div>
  );
}
