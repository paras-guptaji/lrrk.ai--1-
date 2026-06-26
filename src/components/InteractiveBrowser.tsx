import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { 
  Laptop, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  CheckCircle,
  Eye,
  MousePointer,
  Cpu,
  Zap,
  Globe,
  RefreshCw,
  Sun,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Monitor,
  Smartphone,
  ShoppingBag
} from "lucide-react";

export default function InteractiveBrowser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"saas" | "portfolio" | "ecom">("saas");
  const [screenBrightness, setScreenBrightness] = useState<number>(100);
  const [visitorCount, setVisitorCount] = useState<number>(1420);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Custom states for demo actions inside the laptop
  const [cartCount, setCartCount] = useState<number>(0);
  const [customLoadTime, setCustomLoadTime] = useState<string>("0.32s");
  
  // Motion values for fluid 3D magnetic tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 95, mass: 1.1 };
  const animatedRotateX = useSpring(rotateX, springConfig);
  const animatedRotateY = useSpring(rotateY, springConfig);

  // Dynamic live-simulated metrics inside showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => 
        Math.max(1100, Math.min(1900, prev + Math.floor(Math.random() * 19) - 9))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    // Refined tilt limits (7 to -7 degrees)
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Dynamic random fast latency score generator on website reload
    const speeds = ["0.28s", "0.31s", "0.33s", "0.29s", "0.35s"];
    setTimeout(() => {
      setCustomLoadTime(speeds[Math.floor(Math.random() * speeds.length)]);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative w-full py-8 md:py-12 flex flex-col items-center justify-center select-none"
      style={{ perspective: 1500 }}
    >
      
      {/* 1. TOP INTERACTIVE SCREEN TABS SELECTOR */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#0a0a0a]/80 border border-white/5 p-1.5 rounded-2xl relative z-30 backdrop-blur-md">
        <button
          onClick={() => { setActiveTab("saas"); handleRefresh(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
            activeTab === "saas"
              ? "bg-[#FF9A00] text-black font-extrabold shadow-[0_4px_16px_rgba(255,154,0,0.35)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          SaaS Engine
        </button>
        <button
          onClick={() => { setActiveTab("portfolio"); handleRefresh(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
            activeTab === "portfolio"
              ? "bg-[#FF9A00] text-black font-extrabold shadow-[0_4px_16px_rgba(255,154,0,0.35)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Refined Work
        </button>
        <button
          onClick={() => { setActiveTab("ecom"); handleRefresh(); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
            activeTab === "ecom"
              ? "bg-[#FF9A00] text-black font-extrabold shadow-[0_4px_16px_rgba(255,154,0,0.35)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Lux Brands
        </button>
      </div>

      {/* 2. DYNAMIC 3D LAPTOP HARDWARE UNIT */}
      <motion.div
        id="3d-laptop-assembly"
        style={{
          rotateX: animatedRotateX,
          rotateY: animatedRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[580px] flex flex-col items-center transition-shadow duration-300 pointer-events-auto"
      >
        <div 
          className="relative w-full aspect-[16/10] rounded-2xl bg-[#080808] border-2 border-white/10 p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ 
            transform: "translateZ(10px)",
            transformStyle: "preserve-3d"
          }}
        >
          <img 
            src="/images/showcase.webp" 
            alt="Showcase Mockup" 
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-xl" />
        </div>
        
        {/* REFINED PHYSICAL GROUND REFLECTION BACKPLATE SHADOW */}
        <div className="absolute -bottom-4 w-full h-[12px] bg-gradient-to-r from-[#FF9A00]/25 via-[#FF9A00]/30 to-[#FF9A00]/25 blur-lg rounded-full opacity-60 z-0 pointer-events-none" />

      </motion.div>

      {/* 3. HARDWARE CONTROL PANEL & METRICS PANEL */}
      <div className="w-full max-w-[500px] mt-6 grid grid-cols-2 gap-4 bg-[#0a0a0a]/50 border border-white/5 rounded-2xl p-4 backdrop-blur-sm relative z-30">
        
        {/* Brightness / Display Light Controller */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Sun className="w-3.5 h-3.5 text-[#FF9A00]" />
              IPS Panel Backlight
            </span>
            <span className="text-[#FF9A00]">{screenBrightness}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="130"
            value={screenBrightness}
            onChange={(e) => setScreenBrightness(parseInt(e.target.value))}
            className="w-full h-1 bg-[#151515] rounded-lg appearance-none cursor-pointer accent-[#FF9A00] outline-none"
          />
        </div>

        {/* Load speed performance badge */}
        <div className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-3 py-2 text-left">
          <div className="space-y-0.5">
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">Speed Latency</span>
            <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {customLoadTime}
            </span>
          </div>
          <button 
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-[#FF9A00]/20 hover:bg-[#FF9A00] text-[#FF9A00] hover:text-black transition-all cursor-pointer font-bold text-[8px] font-mono uppercase tracking-wider"
          >
            PING
          </button>
        </div>

      </div>

      {/* FLOATING PERFORMANCE PERSPECTIVE CHIPS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
        
        {/* Hover Hint cursor simulation */}
        <motion.div
          className="absolute -top-[5%] right-[5%] flex items-center gap-2 bg-[#020617]/90 border border-[#FF9A00]/30 p-2.5 rounded-xl shadow-[0_10px_25px_rgba(255,154,0,0.05)] backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-1 rounded bg-[#FF9A00]/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9A00] animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-gray-300">Hover panel to tilt laptop in 3D space</p>
        </motion.div>

      </div>

    </div>
  );
}
