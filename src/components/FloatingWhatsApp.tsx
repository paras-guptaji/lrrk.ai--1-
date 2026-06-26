import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
}

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  // Check scroll position to appear after 20%
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      if (scrolled >= 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic hover effect & particles generation
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    // Generate drift particles while hovered
    const interval = setInterval(() => {
      setParticles((prev) => {
        const id = particleIdRef.current++;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        const size = 3 + Math.random() * 4;
        const newParticle: Particle = {
          id,
          x: 0,
          y: 0,
          size,
          angle,
          speed,
        };
        // Keep clean
        return [...prev.slice(-15), newParticle];
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Particle update loop
  useEffect(() => {
    if (particles.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed,
            y: p.y + Math.sin(p.angle) * p.speed,
            size: Math.max(0, p.size - 0.08),
          }))
          .filter((p) => p.size > 0)
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [particles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Calculate delta between mouse and center
    const deltaX = e.clientX - btnCenterX;
    const deltaY = e.clientY - btnCenterY;

    // Pull stronger if closer
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance < 120) {
      // Magnetic pull: limit to max 18px displace
      const pullStrength = 0.25;
      setPosition({
        x: deltaX * pullStrength,
        y: deltaY * pullStrength,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Premium orange ripples expansion
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = rippleIdRef.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);

    // Prepare message contents
    const phoneNumber = "919691529501";
    const message = `Hi Lrrk.ai 👋

I came across your website and I'm interested in getting a high-converting website for my business.

Here are my details:

• Business Name: 
• Industry: 
• Current Website (if any): 
• Requirement: 

Looking forward to discussing this with you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp after brief ripple animation
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="whatsapp-cta-container"
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 select-none"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Custom CTA Tooltip */}
          <motion.div
            id="whatsapp-tooltip"
            className="flex flex-col items-end pointer-events-none"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: isHovered ? 1 : 0.85, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#0b0b0b]/90 border border-[#FF9A00]/20 px-4 py-2 rounded-xl backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.8)] text-right">
              <p className="text-gray-400 text-xs font-medium font-mono leading-tight">Need a website?</p>
              <p className="text-[#FF9A00] text-sm font-semibold font-display tracking-wide mt-0.5">
                Chat with us <span className="inline-block animate-pulse">→</span>
              </p>
            </div>
          </motion.div>

          {/* Glowing Circular Magnetic Glass Button */}
          <div className="relative">
            {/* Animated Pulses */}
            <div className="absolute inset-0 rounded-full bg-[#FF9A00]/10 blur-xl scale-125 animate-pulse" />
            
            {/* 4s ambient border pulse indicator */}
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-[#FF9A00]/25 opacity-70 pointer-events-none"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.button
              id="whatsapp-trigger"
              ref={buttonRef}
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-[60px] h-[60px] rounded-full bg-[#020617]/80 flex items-center justify-center border transition-all cursor-pointer overflow-hidden shadow-[0_10px_35px_rgba(255,154,0,0.15)] select-none focus:outline-none"
              style={{
                borderColor: isHovered ? "#FF9A00" : "rgba(255, 154, 0, 0.3)",
                boxShadow: isHovered
                  ? "0 0 30px rgba(255, 154, 0, 0.4), inset 0 0 12px rgba(255, 154, 0, 0.1)"
                  : "0 0 15px rgba(255, 154, 0, 0.1), inset 0 0 6px rgba(255,154,0,0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              animate={{
                x: position.x,
                y: position.y,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            >
              {/* Floating Orbiting Tiny Particles inside click zone */}
              {isHovered &&
                particles.map((p) => (
                  <div
                    key={p.id}
                    className="absolute rounded-full bg-[#FF9A00] pointer-events-none opacity-80"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      left: `calc(50% + ${p.x}px)`,
                      top: `calc(50% + ${p.y}px)`,
                    }}
                  />
                ))}

              {/* Click Ripple Effect */}
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="absolute rounded-full bg-[#FF9A00]/45 pointer-events-none animate-ping"
                  style={{
                    width: "120px",
                    height: "120px",
                    left: `${r.x - 60}px`,
                    top: `${r.y - 60}px`,
                  }}
                />
              ))}

              {/* White Elegant WhatsApp Vector Icon (Brand Styled) */}
              <svg
                className="w-7 h-7 text-white relative z-10 transition-transform duration-300"
                style={{
                  transform: isHovered ? "rotate(12deg) scale(1.15)" : "none",
                }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
