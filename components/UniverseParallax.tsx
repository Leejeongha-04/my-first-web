"use client";

export default function UniverseParallax() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Light Mode Planet (Sun-like) */}
      <div className="relative pointer-events-none block dark:hidden">
        <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          {/* Orbit */}
          <circle 
            cx="100" cy="100" r="85" 
            stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" 
            className="text-[#C0763C]/30" 
          />

          {/* Satellite - Revolves around the planet */}
          <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px' }}>
            <defs>
              <radialGradient id="satGradLight" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#64748B" />
              </radialGradient>
            </defs>
            <circle cx="35" cy="45" r="8" fill="url(#satGradLight)" stroke="#475569" strokeWidth="0.5" />
          </g>
          
          <defs>
            <radialGradient id="planetGradientLight" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="60%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </radialGradient>
            <filter id="planetGlowLight">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="surfaceTexture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="2">
                <feDistantLight azimuth="45" elevation="45" />
              </feDiffuseLighting>
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
          
          {/* Blue Glow */}
          <circle 
            cx="100" cy="100" r="52" 
            fill="#38BDF8" opacity="0.4" filter="url(#planetGlowLight)" 
          />
          
          {/* Main Planet */}
          <g>
            <circle cx="100" cy="100" r="48" fill="url(#planetGradientLight)" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="100" cy="100" r="48" filter="url(#surfaceTexture)" opacity="0.3" />
            
            {/* Shadow Overlay for 3D depth */}
            <circle cx="100" cy="100" r="48" fill="black" opacity="0.2" style={{ clipPath: 'circle(48px at 120px 120px)', filter: 'blur(10px)' }} />

            {/* Atmospheric Rim */}
            <circle cx="100" cy="100" r="48" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
            
            <ellipse cx="100" cy="85" rx="25" ry="8" fill="white" opacity="0.15" />
            <ellipse cx="85" cy="105" rx="20" ry="6" fill="white" opacity="0.05" />
            <ellipse cx="115" cy="115" rx="15" ry="5" fill="white" opacity="0.08" />
          </g>
        </svg>
      </div>

      {/* Dark Mode Planet */}
      <div className="relative pointer-events-none hidden dark:block scale-110 lg:scale-125">
        <svg width="350" height="350" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nebula1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#31105e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#31105e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nebula2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a1d7a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4a1d7a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="darkPlanetGrad" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="60%" stopColor="#5B21B6" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </radialGradient>
            <radialGradient id="sat1Grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#E879F9" />
              <stop offset="100%" stopColor="#701A75" />
            </radialGradient>
            <radialGradient id="sat2Grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#F3E8FF" />
              <stop offset="100%" stopColor="#7E22CE" />
            </radialGradient>
            <filter id="darkSurfaceTexture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="4" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </defs>

          {/* Nebula Clouds */}
          <circle cx="200" cy="200" r="180" fill="url(#nebula1)" />
          <circle cx="150" cy="180" r="120" fill="url(#nebula2)" />
          
          {/* Orbits - Two distinct tracks */}
          <circle 
            cx="200" cy="200" r="145" 
            stroke="#BA4E8B" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 5"
          />
          <circle 
            cx="200" cy="200" r="110" 
            stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 3"
          />

          {/* Satellite 1 - Outer Track */}
          <g className="animate-spin-slow" style={{ transformOrigin: '200px 200px', animationDuration: '15s' }}>
            <circle cx="55" cy="200" r="10" fill="url(#sat1Grad)" fillOpacity="0.8" style={{ filter: 'drop-shadow(0 0 4px #D946EF)' }}>
              <animate attributeName="r" values="10;11;10" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Small spherical highlight */}
            <circle cx="53" cy="198" r="3" fill="white" fillOpacity="0.3" filter="blur(1px)" />
          </g>

          {/* Satellite 2 - Inner Track (Brighter, Faster) */}
          <g className="animate-spin-slow" style={{ transformOrigin: '200px 200px', animationDirection: 'reverse', animationDuration: '10s' }}>
            <circle cx="310" cy="200" r="5" fill="url(#sat2Grad)" fillOpacity="0.9" style={{ filter: 'drop-shadow(0 0 4px #A855F7)' }}>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Small spherical highlight */}
            <circle cx="308" cy="198" r="1.5" fill="white" fillOpacity="0.4" filter="blur(0.5px)" />
          </g>

          {/* Planet Glow */}
          <circle 
            cx="200" cy="200" r="85" 
            fill="#5B21B6" opacity="0.15"
            style={{ filter: 'blur(25px)' }}
          />

          {/* Main Dark Planet */}
          <g>
            <circle cx="200" cy="200" r="75" fill="url(#darkPlanetGrad)" stroke="#8E3A6B" strokeWidth="1" />
            <circle cx="200" cy="200" r="75" filter="url(#darkSurfaceTexture)" opacity="0.1" />
            
            {/* Shadow Overlay */}
            <circle cx="200" cy="200" r="75" fill="black" opacity="0.4" style={{ clipPath: 'circle(75px at 230px 230px)', filter: 'blur(15px)' }} />

            {/* Atmospherics/Rim Light */}
            <circle cx="200" cy="200" r="75" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
            
            <path d="M140 200C140 190 260 170 260 200C260 230 140 210 140 200Z" fill="white" opacity="0.05" />
            <circle cx="170" cy="170" r="15" fill="white" opacity="0.1" />
            
            {/* New Glowing Point (RGB 106, 255, 235) */}
            <circle cx="195" cy="175" r="6" fill="rgb(106, 255, 235)" style={{ filter: 'drop-shadow(0 0 8px rgba(106, 255, 235, 0.9))' }}>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx="230" cy="220" r="10" fill="white" opacity="0.05" />
          </g>
        </svg>
      </div>
    </div>
  );
}

