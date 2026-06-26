 import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Smartphone, 
  Monitor, 
  Layers,
  Award
} from "lucide-react";
import { PortfolioItem } from "../types";

const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: "project-1",
    title: "Kiran Clinics",
    category: "Healthcare Website",
    conversionRate: "+8.92% Rate",
    speedRating: "99 Core Web Vitals",
    imageAccent: "from-[#FF9A00]/25 to-transparent",
    description: "A fast, patient-centric healthcare platform optimized for clinical appointments, modern medical consultations, and seamless patient intake.",
    previewUrl: "https://kiranclinics.in",
    imageUrl: "/images/portfolio-1.webp",
    tags: ["Healthcare SPA", "Appointment Scheduling", "Vite & React", "Optimized Core Vitals"],
  },
  {
    id: "project-2",
    title: "Fitranger Gym",
    category: "Fitness Website",
    conversionRate: "+6.84% Rate",
    speedRating: "98 Core Web Vitals",
    imageAccent: "from-[#FF9A00]/20 to-transparent",
    description: "Multi-layered luxury glass widgets and calculators engineered for modern wealth assets, resulting in record opt-in lead acquisition.",
    previewUrl: "https://www.fitranger.com/",
    imageUrl: "/images/portfolio-2.webp",
    tags: ["D3.js Charts", "Postgres", "GSAP Scroll", "Next.js"],
  },
  {
    id: "project-3",
    title: "Chhota Bheem Cafe",
    category: "Cafe Website",
    conversionRate: "+4.90% Rate",
    speedRating: "100 Core Web Vitals",
    imageAccent: "from-[#FF9A00]/30 to-transparent",
    description: "Stately typographic layouts paired with ambient breath counters. Optimizing high-density wellness conversions for consumer products.",
    previewUrl: "https://www.chhotabheemcafe.com/",
    imageUrl: "/images/portfolio-3.webp",
    tags: ["Tailwind v4", "Web Audio API", "Framer", "React 19"],
  },
];

// Extracted Sub-component for isolated high-efficiency tilt rendering
function PortfolioCard({ project }: { project: PortfolioItem; key?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Premium fine-tuned tilt angles (max 12 degrees tilt)
    const tiltX = -((y / rect.height) - 0.5) * 12;
    const tiltY = ((x / rect.width) - 0.5) * 12;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 15 }}
      transition={{ 
        type: "spring", 
        stiffness: 140, 
        damping: 18, 
        mass: 0.9 
      }}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glowing amber neon backlight on card hover */}
      <div 
        className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#FF9A00]/20 to-rose-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none" 
      />

      {/* Glassmorphism card container */}
      <motion.a
        href={project.previewUrl || undefined}
        target={project.previewUrl ? "_blank" : undefined}
        rel={project.previewUrl ? "noopener noreferrer" : undefined}
        className={`relative h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0c0c0c] via-[#070707] to-black border rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.85)] ${project.previewUrl ? 'block' : ''}`}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: "preserve-3d",
          borderColor: isHovered ? "rgba(255, 154, 0, 0.35)" : "rgba(255, 255, 255, 0.04)",
        }}
        animate={{
          scale: isHovered ? 1.025 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 22 
        }}
      >
        
        {/* Premium sweep light reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9A00]/5 via-transparent to-white/2 pointer-events-none" />
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FF9A00]/0 via-[#FF9A00]/10 to-[#FF9A00]/0 opacity-30 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          />
        )}

        {/* TOP SECTION: Custom Mockup UI Preview or Image Preview */}
        {project.imageUrl ? (
          <div className="relative aspect-video rounded-xl border border-white/10 bg-[#080808] overflow-hidden mb-6 select-none group/img">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Subtle elegant theme-matching gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-[#020617]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Minimalist Browser Dot Overlay for context */}
            <div className="absolute top-3 left-3 flex gap-1 z-10 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>
            
            {/* URL bar indicator overlay */}
            <div className="absolute top-3 right-3 z-10 bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 text-[7px] font-mono text-gray-300">
              {project.previewUrl?.replace("https://", "")}
            </div>
          </div>
        ) : (
          <div className="relative aspect-video rounded-xl border border-white/5 bg-[#080808] overflow-hidden mb-6 flex flex-col justify-between p-3 select-none">
            
            {/* Browser Window UI Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500/40 group-hover:bg-[#FF9A00]/80 transition-colors duration-300" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <span className="text-[8px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                {project.previewUrl ? project.previewUrl.replace("https://", "") : `lrrk-core-${project.id}.ai`}
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-gray-600 group-hover:text-[#FF9A00] transition-colors" />
            </div>

            {/* Vectorized High-Fidelity App UI with Glowing Accents */}
            <div className="flex-1 py-3 flex flex-col justify-between">
              <div className="space-y-1.5 text-left">
                <div className="h-2 w-1/3 bg-white/10 rounded-sm" />
                <div className="h-3.5 w-2/3 bg-gradient-to-r from-white via-white/80 to-[#FF9A00]/40 rounded-sm" />
              </div>

              {/* Interactive UI Mock elements */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-[#101010] border border-white/5 p-1.5 rounded flex flex-col justify-between items-center text-center transition-all duration-300 group-hover:border-[#FF9A00]/20">
                  <span className="text-[7px] text-gray-500 font-mono">CONV</span>
                  <span className="text-[9px] text-[#FF9A00] font-bold font-display">{project.conversionRate}</span>
                </div>
                <div className="bg-[#101010] border border-white/5 p-1.5 rounded flex flex-col justify-between items-center text-center transition-all duration-300 group-hover:border-[#FF9A00]/20">
                  <span className="text-[7px] text-gray-500 font-mono">SPEED</span>
                  <span className="text-[9px] text-white font-bold font-display">100/100</span>
                </div>
                <div className="bg-[#101010] border border-white/5 p-1.5 rounded flex flex-col justify-between items-center text-center transition-all duration-300 group-hover:border-[#FF9A00]/20">
                  <span className="text-[7px] text-gray-500 font-mono">LEADS</span>
                  <span className="text-[9px] text-emerald-400 font-bold font-display">+94%</span>
                </div>
              </div>
            </div>

            {/* Ambient Glowing dust trails inside Mockup frame */}
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FF9A00]/5 to-transparent pointer-events-none" />
          </div>
        )}

        {/* MID SECTION: Detail Typography */}
        <div className="space-y-2 text-left mt-4 mb-2">
          <span className="text-[10px] font-mono text-[#FF9A00] font-bold uppercase tracking-wider block">
            {project.category}
          </span>
          <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-[#FF9A00] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* BOTTOM SECTION: Bold Visit Button */}
        <div className="pt-4 mt-4 border-t border-white/5">
          <div className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#FF9A00] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(255,154,0,0.15)] group-hover:bg-[#FFD600] group-hover:shadow-[0_4px_25px_rgba(255,154,0,0.3)]">
            <span>VISIT SITE</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

      </motion.a>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(PORTFOLIO_PROJECTS.flatMap(p => p.tags)))].slice(0, 5);

  const filteredProjects = selectedTag === "All" 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.tags.includes(selectedTag));

  return (
    <section id="portfolio" className="relative w-full py-24 md:py-32 bg-[#020617] overflow-hidden border-b border-white/5">
      
      {/* Background glow references */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FF9A00]/2 blur-[200px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-[#FF9A00]/4 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header containing metadata details */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
              Websites That Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A00] to-[#FFD600]">Real Revenue.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-mono">
              Every design is custom-engineered from raw blueprints. No templates, no builders, no fat code. Just pristine layouts built explicitly to raise your bottom-line figures.
            </p>
          </div>


        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
