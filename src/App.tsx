import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Terminal, 
  Activity, 
  Zap, 
  TrendingUp, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowUpRight,
  MousePointer,
  Layers,
  XCircle,
  ChevronRight
} from "lucide-react";

import FloatingWhatsApp from "./components/FloatingWhatsApp";
import InteractiveBrowser from "./components/InteractiveBrowser";
import Portfolio from "./components/Portfolio";
import InteractiveContact from "./components/InteractiveContact";

// Custom type for mouse trail particle
interface TrailPoint {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom glowing cursor trail state
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  // Background parallax layers coordinates
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Quick statistics states for real-time counting numbers
  const [activeSitePerformance, setActiveSitePerformance] = useState(94);
  const [conversionMultiplier, setConversionMultiplier] = useState(2.8);

  useEffect(() => {
    // Speed counts animation
    const performanceTimer = setInterval(() => {
      setActiveSitePerformance((prev) => {
        if (prev >= 99) return 93;
        return prev + 1;
      });
    }, 1500);

    const conversionTimer = setInterval(() => {
      setConversionMultiplier((prev) => {
        const next = prev + (Math.random() - 0.5) * 0.15;
        return parseFloat(Math.max(2.4, Math.min(4.8, next)).toFixed(2));
      });
    }, 2800);

    return () => {
      clearInterval(performanceTimer);
      clearInterval(conversionTimer);
    };
  }, []);

  // Track cursor coordinates for trails and reactive particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Background parallax offset calculation
      const screenX = e.clientX / window.innerWidth - 0.5;
      const screenY = e.clientY / window.innerHeight - 0.5;
      setParallaxOffset({
        x: screenX * -35, // slow lag reaction
        y: screenY * -35,
      });

      // Append new trail point
      const id = trailIdRef.current++;
      const newPoint: TrailPoint = {
        id,
        x: e.clientX,
        y: e.clientY,
        opacity: 0.9,
        size: 8,
      };

      setTrail((prev) => {
        // Keep trailing length constrained to max 12 items for absolute peak performance
        const active = [...prev, newPoint];
        if (active.length > 12) {
          active.shift();
        }
        return active.map((pt, idx) => ({
          ...pt,
          size: Math.max(2, 8 - (active.length - idx) * 0.6),
          opacity: Math.max(0.05, 0.9 - (active.length - idx) * 0.08),
        }));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Frame updater loop for mouse trail degradation
  useEffect(() => {
    if (trail.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setTrail((prev) => 
        prev
          .map((pt) => ({
            ...pt,
            opacity: pt.opacity - 0.04,
            size: Math.max(0, pt.size - 0.2),
          }))
          .filter((pt) => pt.opacity > 0)
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [trail]);

  // Premium smooth-scrolling interceptor for all internal anchor links of the app
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      // Check if it's an internal hash link
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Perform a luxury custom eased smooth scroll calculation
          const headerOffset = 72; // height of our refined sticky header
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          let startTime: number | null = null;
          const duration = 900; // Premium eased duration (900ms)

          const easeInOutCubic = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          };

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
            window.scrollTo(0, startPosition + distance * run);
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
          
          // Smoothly update browser URL hash without causing an instant layout jump
          if (history.pushState) {
            history.pushState(null, '', href);
          } else {
            location.hash = href;
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white relative select-none">
      
      {/* 1. SEAMLESS DEEP GLOWING CURSOR TRAIL CONTAINER */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {trail.map((point) => (
          <div
            key={point.id}
            className="absolute rounded-full bg-[#FF9A00] pointer-events-none"
            style={{
              left: `${point.x - point.size / 2}px`,
              top: `${point.y - point.size / 2}px`,
              width: `${point.size}px`,
              height: `${point.size}px`,
              opacity: point.opacity,
              boxShadow: `0 0 ${point.size * 2}px rgba(255, 154, 0, ${point.opacity + 0.2})`,
            }}
          />
        ))}
      </div>

      {/* 2. CINEMATIC AMBIENT BACKGROUND Spotlights & dust tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Responsive Parallax Floating Glow Dust spot 1 */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-[#FF9A00]/4 blur-[140px] transition-transform duration-700 ease-out" 
          style={{
            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
            top: "10%",
            left: "15%",
          }}
        />

        {/* Parallax Glow Spot 2 */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full bg-[#FF9A00]/3 blur-[160px] transition-transform duration-1000 ease-out" 
          style={{
            transform: `translate(${parallaxOffset.x * -0.7}px, ${parallaxOffset.y * -0.7}px)`,
            bottom: "20%",
            right: "10%",
          }}
        />

        {/* GEOMETRICAL ELEMENTS BLENDING WITH THE THEME */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {/* Concentric Technical Blueprint Circles */}
          <div className="absolute top-[8%] right-[12%] w-[450px] h-[450px] animate-[spin_120s_linear_infinite]">
            <svg viewBox="0 0 200 200" className="w-full h-full text-white/5 select-none">
              <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 3" />
              <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#FF9A00" strokeWidth="0.2" strokeOpacity="0.4" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="6 4" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.4" />
              
              {/* Radial tick marks */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 100 + Math.cos(angle) * 75;
                const y1 = 100 + Math.sin(angle) * 75;
                const x2 = 100 + Math.cos(angle) * 82;
                const y2 = 100 + Math.sin(angle) * 82;
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.4" />
                );
              })}
            </svg>
          </div>

          {/* Concentric Polyhedral Geometry (Hexagonal Wireframe) */}
          <div className="absolute top-[45%] left-[5%] w-[380px] h-[380px] animate-[spin_80s_linear_infinite_reverse] opacity-60">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#FF9A00]/10 select-none">
              <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="100,30 161,65 161,135 100,170 39,135 39,65" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
              <polygon points="100,50 143,75 143,125 100,150 57,125 57,75" fill="none" stroke="currentColor" strokeWidth="0.4" />
              
              {/* Connected vertex lines */}
              <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.2" strokeOpacity="0.5" />
              <line x1="22" y1="55" x2="178" y2="145" stroke="currentColor" strokeWidth="0.2" strokeOpacity="0.5" />
              <line x1="22" y1="145" x2="178" y2="55" stroke="currentColor" strokeWidth="0.2" strokeOpacity="0.5" />
            </svg>
          </div>

          {/* Mathematical Grid Matrix Coordinate Dots / Marks */}
          <div className="absolute top-[25%] left-[10%] text-white/5 font-mono text-[8px] flex flex-col gap-1 tracking-widest leading-none">
            <div>SYS.LOC: [47.19.82.02]</div>
            <div>RENDER.SCALE: 1.61803 (GOLDEN_RATIO)</div>
            <div>GRID.DENSITY: COMPLIANT</div>
          </div>

          {/* Fine Grid Alignment Crosshairs */}
          <div className="absolute top-[18%] left-[45%] w-8 h-8 text-white/10">
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="0.5">
              <path d="M12 2v20M2 12h20" />
              <circle cx="12" cy="12" r="6" />
            </svg>
          </div>
          <div className="absolute bottom-[28%] right-[8%] w-8 h-8 text-white/10">
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="0.5">
              <path d="M12 2v20M2 12h20" />
              <circle cx="12" cy="12" r="6" />
            </svg>
          </div>

          {/* Sine Wave / Mathematical Function Graph Line in background */}
          <div className="absolute bottom-[10%] left-[12%] right-[12%] h-[120px] opacity-40">
            <svg viewBox="0 0 1000 100" className="w-full h-full text-[#FF9A00]/5 select-none" preserveAspectRatio="none">
              <path 
                d="M 0,50 Q 125,100 250,50 T 500,50 T 750,50 T 1000,50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                strokeDasharray="4 4"
              />
              <path 
                d="M 0,60 Q 125,20 250,60 T 500,60 T 750,60 T 1000,60" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Ambient floating dust speck illustration (Procedural CSS) */}
        {[...Array(12)].map((_, idx) => (
          <div
            key={idx}
            className="absolute bg-[#FF9A00] rounded-full opacity-15"
            style={{
              width: `${2 + (idx % 3)}px`,
              height: `${2 + (idx % 3)}px`,
              top: `${15 + idx * 8}%`,
              left: `${10 + (idx * 17) % 80}%`,
              boxShadow: "0 0 8px rgba(255,154,0,0.5)",
            }}
          />
        ))}
      </div>

      {/* 3. HERO GLASS REFINED HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/75 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Glowing brand logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="Lrrk.ai Logo" 
              className="w-10 h-10 object-cover rounded-full shadow-[0_0_15px_rgba(255,154,0,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="relative flex items-center">
              <span className="text-xl font-bold tracking-wider text-white font-sans select-none">
                Lrrk<span className="text-[#FF9A00] font-extrabold animate-pulse">.ai</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF9A00] group-hover:w-full transition-all duration-300" />
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-semibold tracking-wider text-gray-400">
            <a href="#hero" className="hover:text-white transition-colors">HOME</a>
            <a href="#portfolio" className="hover:text-white transition-colors uppercase">VIEW OUR WORK</a>
            <a href="#speed-comparator" className="hover:text-white transition-colors uppercase">PERFORMANCE</a>
            <a href="#contact" className="hover:text-white transition-colors uppercase">CONTACT</a>
          </nav>

          {/* Right Header button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-2.5 bg-[#FF9A00] text-black rounded-full text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,154,0,0.3)] hover:bg-white hover:text-black transition-all animate-none"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FF9A00] p-1 border border-white/10 rounded bg-white/5 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/5 bg-[#020617]/95 backdrop-blur-xl px-6 py-6 space-y-4 text-left flex flex-col font-mono text-sm uppercase tracking-wider text-gray-400">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">HOME</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">VIEW OUR WORK</a>
            <a href="#speed-comparator" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">PERFORMANCE</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">CONTACT</a>
            <div className="pt-2 border-t border-white/5">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block py-2.5 rounded-lg bg-[#FF9A00] text-black font-semibold uppercase tracking-widest text-xs"
              >
                REQUEST AUDIT CALL
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 4. MAIN BODY WRAPPER */}
      <main className="relative z-10">

        {/* HERO SECTION CONTAINER */}
        <section id="hero" className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-28 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT SIDE: Highly Conversional Statement Layout */}
            <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 relative">
              
              {/* Trust Badge identifier */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF9A00]/10 border border-[#FF9A00]/30 rounded-full text-[10px] uppercase tracking-widest text-[#FF9A00] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A00] shadow-[0_0_5px_#FF9A00]" />
                Future of Conversion
              </div>

              {/* Core bold typography */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-display font-extrabold text-white tracking-tight leading-none">
                  Websites That <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A00] to-[#FFD600]">
                    Drive Business
                  </span> Growth.
                </h1>
                
                <h3 className="text-lg md:text-xl font-display font-medium text-gray-300 leading-relaxed max-w-xl">
                  We build high-converting websites that turn passive visitors into permanent, active customers.
                </h3>
              </div>

              {/* Highlight bullet cards to prove speed commitment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                {[
                  "Loads fully under 350 milliseconds",
                  "Built purely on custom React components",
                  "Optimized bento layouts designed for clicks",
                  "Engineered with 100% PageSpeed score"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#FF9A00]/15 flex items-center justify-center border border-[#FF9A00]/30 select-none">
                      <Check className="w-2.5 h-2.5 text-[#FF9A00] stroke-[4px]" />
                    </div>
                    <span className="text-xs font-mono font-medium text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons with custom glow emitter on hover */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contact"
                  className="group px-7 py-3.5 rounded-xl bg-[#FF9A00] text-black font-display font-bold text-sm tracking-wide flex items-center gap-2 shadow-[0_5px_22px_rgba(255,154,0,0.35)] hover:shadow-[0_8px_30px_rgba(255,154,0,0.55)] transition-all duration-300 cursor-pointer hover:scale-102"
                >
                  Book a Call 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
                </a>

                <a
                  href="#portfolio"
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-display font-bold text-sm tracking-wide flex items-center gap-2 hover:bg-white/10 hover:border-[#FF9A00]/30 transition-all duration-300 cursor-pointer"
                >
                  View Work
                </a>
              </div>

              {/* Live interactive numbers section */}
              <div className="pt-6 border-t border-white/5 max-w-lg grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-mono text-gray-500">SPEED INDEX</p>
                  <p className="text-lg font-bold font-display text-white mt-0.5">{activeSitePerformance}% Paint</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500">AVG CONV GAIN</p>
                  <p className="text-lg font-bold font-display text-[#FF9A00] mt-0.5">{conversionMultiplier}x Delta</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500">SYSTEM ARCH</p>
                  <p className="text-lg font-bold font-display text-emerald-400 mt-0.5">Compliant</p>
                </div>
              </div>

            </div>

            {/* HERO RIGHT SIDE: Floating 3D Browser Component */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <InteractiveBrowser />
            </div>

          </div>

        </section>

        {/* 5. MULTI-WIDGET METRIC STATS STRIP */}
        <section className="bg-black/80 border-y border-white/5 py-12 relative overflow-hidden">
          <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "350ms", label: "AVERAGE LOAD TIME", desc: "Leaves competitors in the dust" },
              { value: "+300%", label: "ENGAGEMENT ELEVATION", desc: "Based on active layout bento grids" },
              { value: "99.8%", label: "DESKTOP RESPONSIVENESS", desc: "No fluid scale coordinate glitches" },
              { value: "$12M+", label: "ACCUMULATED CLIENT VALUE", desc: "Driven through precise CTA pipelines" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1 text-center md:text-left border-l border-white/10 pl-4">
                <span className="text-2xl font-extrabold font-display text-white tracking-tight flex items-center justify-center md:justify-start gap-1">
                  {stat.value}
                  <span className="h-2 w-2 rounded-full bg-[#FF9A00] inline-block animate-pulse" />
                </span>
                <p className="text-[10px] font-mono tracking-widest text-[#FF9A00] font-bold uppercase">{stat.label}</p>
                <p className="text-xs text-gray-400 font-mono text-gray-500 leading-tight">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>



        {/* 7. IMMERSIVE COMPARISON WORKSTATION */}
        <section id="speed-comparator" className="py-24 md:py-32 bg-gradient-to-b from-[#020617] to-[#0b1329] border-y border-white/5 relative overflow-hidden">
          {/* Background enhancement */}
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9A00]/5 rounded-full blur-[160px] pointer-events-none" />
          
          {/* Subtle slow floating particle indicators */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#FF9A00]/30"
                style={{
                  top: `${15 + i * 14}%`,
                  left: `${10 + (i * 17) % 80}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Section Heading & Subheading */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-24">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF9A00]/10 border border-[#FF9A00]/25 rounded-full text-[10px] font-mono tracking-widest text-[#FF9A00] font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                CONVERSION ARCHITECTURE AUDIT
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
                Not All Websites Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A00] to-[#FFD600]">Built To Convert.</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-mono text-gray-400">
                One is just another website. <br />
                <span className="text-white font-semibold">The other is built to turn visitors into customers.</span>
              </p>
            </div>

            {/* Immersive Comparison Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-23 gap-8 items-stretch relative">
              
              {/* LEFT CARD: Lrrk.ai Experience Card */}
              <div className="lg:col-span-11 flex flex-col justify-between bg-[#090909]/90 border border-[#FF9A00]/30 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden shadow-[0_10px_50px_rgba(255,154,0,0.08)] group/card">
                
                {/* Visual Glass Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9A00]/5 via-transparent to-white/2 pointer-events-none" />
                
                {/* Header Information for Left Card */}
                <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#FF9A00] font-bold tracking-wider uppercase bg-[#FF9A00]/10 border border-[#FF9A00]/20 px-3 py-1 rounded-full">
                      Interactive • Premium • High-Converting
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ACTIVE EXPERIENCE
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">
                    Lrrk.ai Experience
                  </h3>
                </div>

                {/* Left Card: Glowing Floating Website Mockup */}
                <motion.div 
                  className="w-full bg-[#020617] rounded-xl border border-white/10 overflow-hidden relative shadow-[0_15px_40px_rgba(0,0,0,0.8)] h-[240px] md:h-[280px]"
                  animate={{ 
                    y: [0, -8, 0],
                    rotateX: [0, 1.5, 0],
                    rotateY: [0, -1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  
                  {/* Browser simulated bar */}
                  <div className="bg-[#0e0e0e]/90 border-b border-white/5 py-2 px-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="bg-[#151515] text-[8px] font-mono text-gray-500 px-8 py-0.5 rounded-md border border-white/5 select-none">
                      solstice.lrrk.ai
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-600 invisible" />
                  </div>

                  {/* Browser client area */}
                  <div className="p-4 md:p-5 h-full relative overflow-hidden bg-radial from-[#1e293b] via-[#020617] to-[#020617] flex flex-col justify-between pb-12">
                    
                    {/* Animated Golden Particles Travelling */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-[#FF9A00]"
                          style={{
                            left: `${10 + i * 20}%`,
                            top: `${40 + (i * 15) % 40}%`
                          }}
                          animate={{
                            scale: [1, 2, 1],
                            opacity: [0.1, 0.7, 0.1],
                            y: [0, -40, 0]
                          }}
                          transition={{
                            duration: 3.5 + i,
                            repeat: Infinity,
                            delay: i * 0.4
                          }}
                        />
                      ))}
                    </div>

                    {/* Animated Cursor Simulator */}
                    <motion.div 
                      className="absolute z-20 pointer-events-none flex flex-col items-start gap-1"
                      animate={{
                        x: [40, 160, 220, 80, 40],
                        y: [160, 80, 140, 60, 160]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <MousePointer className="w-4 h-4 text-[#FF9A00] drop-shadow-[0_0_4px_#FF9A00]" />
                      <span className="text-[6px] font-mono bg-[#FF9A00] text-black px-1 rounded uppercase tracking-wider font-bold shadow-lg">
                        Hover Effect
                      </span>
                    </motion.div>

                    {/* Simulated Hero design inside browser */}
                    <div className="space-y-4 relative z-10">
                      
                      {/* Smooth title animation mock */}
                      <motion.div 
                        className="space-y-1"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <h4 className="text-[14px] md:text-[16px] font-display font-black text-white leading-none tracking-tight">
                          Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A00] to-yellow-300">Solstice</span>
                        </h4>
                        <p className="text-[8px] text-gray-400 font-mono max-w-[170px] leading-relaxed">
                          Autonomous UI generation layer built on reactive client speed paradigms.
                        </p>
                      </motion.div>

                      {/* Animated CTA Button with Soft Pulse Glow */}
                      <div className="flex gap-2 items-center">
                        <motion.button 
                          className="px-3.5 py-1.5 rounded bg-[#FF9A00] text-black text-[9px] font-mono font-bold border border-[#FFD600]/30 tracking-wider shadow-[0_0_15px_rgba(255,154,0,0.3)] hover:scale-105 transition-all"
                          animate={{ 
                            boxShadow: [
                              "0 0 4px rgba(255, 154, 0, 0.2)",
                              "0 0 16px rgba(255, 154, 0, 0.7)",
                              "0 0 4px rgba(255, 154, 0, 0.2)"
                            ] 
                          }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        >
                          Synthesize Layout
                        </motion.button>

                        <span className="text-[8px] font-mono text-gray-500 animate-pulse flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          Ready
                        </span>
                      </div>
                    </div>

                    {/* Glass card floating component simulated */}
                    <motion.div 
                      className="absolute right-4 bottom-14 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg p-2.5 space-y-1 text-left w-[110px] select-none"
                      animate={{
                        y: [-2, 4, -2],
                        rotate: [0, 1.5, 0]
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#FF9A00]" />
                        <span className="text-[8px] font-mono font-bold text-white">CONVERSION</span>
                      </div>
                      <p className="text-[12px] font-display font-black text-[#FF9A00]">+382%</p>
                      <p className="text-[6px] font-mono text-gray-400">Layout customized</p>
                    </motion.div>

                    {/* Scroll indicator simulated */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
                      <span className="text-[6px] font-mono text-gray-500 tracking-wider">SCROLL</span>
                      <motion.div 
                        className="w-1 h-2 rounded-full bg-white/40 flex justify-center p-[1px]"
                        animate={{ y: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <span className="w-0.5 h-0.5 rounded-full bg-white block" />
                      </motion.div>
                    </div>

                  </div>
                </motion.div>

                {/* Floating validation badges */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "✓ Smooth Animations",
                    "✓ Conversion Focused",
                    "✓ Premium UI",
                    "✓ Mobile Optimized"
                  ].map((badge) => (
                    <div key={badge} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF9A00]/5 border border-[#FF9A00]/15 select-none hover:bg-[#FF9A00]/10 hover:border-[#FF9A00]/30 transition-all">
                      <span className="text-[11px] font-mono font-bold text-[#FF9A00]">{badge}</span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <a
                  href="#contact"
                  className="w-full py-3.5 rounded-xl bg-[#FF9A00] text-black text-center text-xs font-display font-bold hover:bg-[#FFB033] hover:scale-101 transition-all duration-300 block shadow-[0_4px_22px_rgba(255,154,0,0.2)] hover:shadow-[0_4px_30px_rgba(255,154,0,0.35)]"
                >
                  Explore Interactive Experience →
                </a>

              </div>

              {/* CENTER COMPONENT: Vertical glowing line & energy container */}
              <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center relative">
                {/* Energy pipeline glow */}
                <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FF9A00]/50 to-transparent" />
                <div className="absolute top-12 bottom-12 w-[3px] bg-gradient-to-b from-transparent via-[#FF9A00]/70 to-transparent blur-[2px] shadow-[0_0_10px_#FF9A00]" />
                
                {/* Centered rotate text label */}
                <div className="bg-[#020617] border border-white/10 px-3 py-6 rounded-full rotate-270 z-10 flex flex-col items-center justify-center space-y-1.5 whitespace-nowrap">
                  <span className="text-[9px] font-mono tracking-widest text-[#FF9A00] uppercase font-bold">
                    Experience over Templates
                  </span>
                </div>
              </div>

              {/* RIGHT CARD: Generic Builder Card */}
              <div className="lg:col-span-11 flex flex-col justify-between bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden opacity-75 hover:opacity-85 transition-opacity">
                
                {/* Header Information for Right Card */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-500 font-bold tracking-wider uppercase bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                      Template • Static • Forgettable
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 font-bold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      STATIC PAGE
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-gray-400 tracking-tight">
                    Generic Website
                  </h3>
                </div>

                {/* Right Card: Completely Flat Website Mockup */}
                <div className="w-full bg-[#0d0d0d] rounded-xl border border-white/5 overflow-hidden shadow-2xl h-[240px] md:h-[280px]">
                  
                  {/* Browser bar simulated */}
                  <div className="bg-[#121212] border-b border-white/5 py-2 px-3 flex items-center justify-start gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                  </div>

                  {/* Browser client area (Completely static, boring template feel) */}
                  <div className="p-4 md:p-5 h-full bg-[#0d0d0d] flex flex-col justify-between pb-12 text-left">
                    
                    <div className="space-y-3.5">
                      
                      {/* Boring headline */}
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-32 bg-gray-800 rounded" />
                        <div className="h-6 w-44 bg-gray-800/60 rounded" />
                        
                        {/* Fake slow loading graphic boxes */}
                        <div className="space-y-1 pt-2">
                          <div className="w-full h-1.5 bg-gray-800/40 rounded" />
                          <div className="w-[85%] h-1.5 bg-gray-800/40 rounded" />
                          <div className="w-[40%] h-1.5 bg-gray-800/30 rounded" />
                        </div>
                      </div>

                      {/* Flat basic button mock */}
                      <div className="w-24 h-6 rounded bg-gray-800 border border-transparent flex items-center justify-center select-none">
                        <span className="text-[8px] font-mono text-gray-500">Submit Button</span>
                      </div>
                    </div>

                    {/* Standard Boring card layout */}
                    <div className="border border-white/5 bg-white/2 rounded p-2 flex justify-between items-center text-[7px] font-mono text-gray-500">
                      <span>No features enabled</span>
                      <span>0% Engagement</span>
                    </div>

                  </div>
                </div>

                {/* Flat static badges */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "✕ Static Layout",
                    "✕ Generic Template",
                    "✕ No Micro Interactions",
                    "✕ Low Engagement"
                  ].map((badge) => (
                    <div key={badge} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/2 border border-white/5 select-none">
                      <span className="text-[11px] font-mono text-gray-500 font-medium">{badge}</span>
                    </div>
                  ))}
                </div>

                {/* Outdated Button with disabled appearance */}
                <button 
                  disabled
                  className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 font-display font-medium text-xs cursor-not-allowed uppercase"
                >
                  Looks Like Every Other Website
                </button>

              </div>

            </div>

          </div>
        </section>

        {/* 8. WORK ARMED SHOWCASE */}
        <Portfolio />

        {/* 9. SECURE CONNECTION CONTACT SYSTEM */}
        <InteractiveContact />

      </main>

      {/* 10. LUXURIOUS LRRK.AI MINIMAL FOOTER */}
      <footer className="bg-black border-t border-white/10 py-12 relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          <div className="space-y-2">
            <span className="text-lg font-display font-black tracking-tight text-white">
              Lrrk.ai
            </span>
            <p className="text-xs text-gray-500 font-mono max-w-xs mx-auto md:mx-0">
              High-converting mathematical web layouts engineered strictly for luxury tech & SaaS enterprises.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-mono">
            <a href="#hero" className="hover:text-[#FF9A00] transition-colors">HOME</a>
            <a href="#portfolio" className="hover:text-white transition-colors">VIEW OUR WORK</a>
            <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-xs text-gray-500 font-mono">© 2026 Lrrk.ai Operations. All rights reserved.</p>
            <p className="text-[10px] text-[#FF9A00] font-mono tracking-wider">CRAFTED FOR PEAK PERFORMANCE CONVERSION</p>
          </div>

        </div>
      </footer>

      {/* 11. DYNAMIC PRESTIGE WHATSAPP OVERLAY */}
      <FloatingWhatsApp />

    </div>
  );
}
