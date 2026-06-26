import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Calendar, 
  Lock, 
  MousePointer,
  ArrowUpRight,
  TrendingUp,
  Activity
} from "lucide-react";

export default function InteractiveContact() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    requirement: "",
    bookingDate: "",
    bookingTime: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCursorHoveringCTA, setIsCursorHoveringCTA] = useState(false);
  const [laserPulse, setLaserPulse] = useState(false);
  const [expandedGlow, setExpandedGlow] = useState(false);

  // Auto-play simulated click loop to show the interactive cursor click every 6s
  useEffect(() => {
    const loop = setInterval(() => {
      // Begin drag
      setIsCursorHoveringCTA(true);

      // Trigger structural pulse/glow at click
      setTimeout(() => {
        setLaserPulse(true);
        setTimeout(() => setLaserPulse(false), 800);
      }, 1500);

      // Return idle cursor
      setTimeout(() => {
        setIsCursorHoveringCTA(false);
      }, 3500);

    }, 7000);

    return () => clearInterval(loop);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Expand gorgeous orange light across the frame
    setExpandedGlow(true);

    const phoneNumber = "919691529501";
    const formattedDate = formData.bookingDate 
      ? new Date(formData.bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
      : "";

    const message = `Hi Lrrk.ai 👋

I have just booked a strategic audit/consultation session through your website. Here are my details:

• Name: ${formData.name}
• Business Name: ${formData.businessName || "Not specified"}
• Phone: ${formData.phone}
• Preferred Date: ${formattedDate || "Not specified"}
• Preferred Time: ${formData.bookingTime || "Not specified"}
• Requirement: ${formData.requirement || "Not specified"}

Please confirm my slot!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        window.open(whatsappUrl, "_blank");
      } catch (err) {
        console.warn("Popup blocked, fallback to button on success screen", err);
      }
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      businessName: "",
      phone: "",
      requirement: "",
      bookingDate: "",
      bookingTime: ""
    });
    setIsSubmitted(false);
    setExpandedGlow(false);
  };

  const handleCTAButtonClick = () => {
    const formElement = document.getElementById("booking-form-panel");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const nameInput = document.getElementById("contact-name-input");
    if (nameInput) {
      setTimeout(() => {
        nameInput.focus();
      }, 600);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 md:py-28 bg-[#020617] overflow-hidden">
      
      {/* EXPANDING ORANGE LIGHT SUNBURST GLOW SUBMISSION OVERLAY SYSTEM */}
      <AnimatePresence>
        {expandedGlow && (
          <motion.div
            className="absolute inset-0 z-40 bg-radial-gradient pointer-events-none"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              background: "radial-gradient(circle, rgba(255, 154, 0, 0.45) 0%, rgba(2,6,23,0.95) 75%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Grid patterns */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] rounded-full bg-[#FF9A00]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Big High-Converting Contact Statement & Booking Simulation */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF9A00]/10 border border-[#FF9A00]/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9A00]" />
              <span className="text-[10px] font-mono tracking-widest text-[#FF9A00] font-bold uppercase">
                ACQUISITION CONSOLE
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-none">
              Ready to Triple Your <span className="text-[#FF9A00]">Conversion Benchmarks?</span>
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Book a call with Lrrk.ai. We'll audit your current digital asset, dissect load speed, pinpoint layout friction points, and deliver a conversion blueprint.
            </p>

            {/* Simulated Live Book-A-Call Browser with Automatic Cursor Interaction */}
            <div className="relative border border-white/10 rounded-2xl bg-[#080808] p-5 shadow-2xl overflow-hidden mt-8">
              
              {/* Browser bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF9A00]/30" />
                  <span className="w-2 h-2 rounded-full bg-[#FF9A00]/20" />
                  <span className="w-2 h-2 rounded-full bg-[#FF9A00]/10" />
                </div>
                <span className="text-[9px] font-mono text-gray-500">cal.com/lrrk-ai/strategy-session</span>
                <div className="w-10 h-1 bg-white/5 rounded-sm" />
              </div>

              {/* Simulated active booking view */}
              <div className="space-y-4 relative">
                
                {/* Simulated Click Wave Glow Expansion Ring */}
                {laserPulse && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9A00]/20 border border-[#FF9A00]/60 pointer-events-none"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: "300px", height: "300px", opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                )}

                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex gap-2.5 items-center">
                    <Calendar className="w-4 h-4 text-[#FF9A00]" />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">Discovery Call (15m)</p>
                      <p className="text-[10px] text-gray-400">Discuss business goals & speeds</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-lime-500/10 text-lime-400 px-2 py-0.5 rounded font-bold font-mono">
                    AVAILABLE NOW
                  </span>
                </div>

                {/* Simulated Book Button CTA - Click Target for the simulated mouse */}
                <div className="relative">
                  <button
                    onClick={handleCTAButtonClick}
                    className="w-full py-3 rounded-xl font-display font-bold text-sm tracking-wide transition-all bg-[#FF9A00] text-black shadow-[0_0_25px_rgba(255,154,0,0.4)] hover:bg-[#ffaa22] hover:shadow-[0_0_30px_rgba(255,154,0,0.6)] cursor-pointer active:scale-98 relative z-20"
                  >
                    Book Discovery Session
                  </button>

                  {/* SIMULATED FLOATING CURSOR CLICKING THE BUTTON */}
                  <motion.div
                    className="absolute pointer-events-none text-[#FF9A00] drop-shadow-[0_0_8px_#FF9A00]"
                    initial={{ x: 180, y: 70 }}
                    animate={
                      isCursorHoveringCTA 
                        ? { x: 100, y: 15, scale: [1, 0.85, 1] }  // mouse travels and clicks
                        : { x: 220, y: 60 }
                    }
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    <MousePointer className="w-5.5 h-5.5 fill-current" />
                  </motion.div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Real Functional Form Panel */}
          <div id="booking-form-panel" className="lg:col-span-6 relative z-10">
            <div className="bg-gradient-to-b from-[#0c0c0c]/98 via-[#060606]/98 to-black border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-xl font-display font-semibold text-white tracking-tight flex items-center gap-2">
                       Establish Connection
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">FILLING THESE SECURES STRATEGIC CONNECTION BLUEPRINTS</p>

                    <div className="space-y-4 pt-2">
                      {/* Name field */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-gray-400 font-mono uppercase">YOUR NAME</label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="What should we call you?"
                          className="bg-[#121212] border border-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF9A00]/60 transition-colors w-full"
                        />
                      </div>

                      {/* Business Name */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-gray-400 font-mono uppercase">YOUR BUSINESS NAME</label>
                        <input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="What is your business called?"
                          className="bg-[#121212] border border-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF9A00]/60 transition-colors w-full"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-gray-400 font-mono uppercase">YOUR PHONE NUMBER</label>
                        <input
                          type="tel"
                          required
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={formData.phone}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, "");
                            setFormData({ ...formData, phone: digitsOnly });
                          }}
                          placeholder="Best Number to Reach You (Digits Only)"
                          className="bg-[#121212] border border-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF9A00]/60 transition-colors w-full"
                        />
                      </div>

                      {/* Preferred Date & Time Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-xs font-semibold text-gray-400 font-mono uppercase">PREFERRED DATE</label>
                          <input
                            type="date"
                            required
                            value={formData.bookingDate}
                            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                            onClick={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            onFocus={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            onMouseDown={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            onTouchStart={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            className="bg-[#121212] border border-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF9A00]/60 transition-colors w-full [color-scheme:dark] cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-xs font-semibold text-gray-400 font-mono uppercase">PREFERRED TIME</label>
                          <input
                            type="time"
                            required
                            value={formData.bookingTime}
                            onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                            onClick={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            onFocus={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            onMouseDown={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            onTouchStart={(e) => {
                              try {
                                e.currentTarget.showPicker();
                              } catch (err) {
                                console.debug(err);
                              }
                            }}
                            className="bg-[#121212] border border-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF9A00]/60 transition-colors w-full [color-scheme:dark] cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Requirement specification */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-semibold text-gray-400 font-mono uppercase">CONVERSION & SPEEDS REQUIREMENT</label>
                        <textarea
                          required
                          value={formData.requirement}
                          onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                          placeholder="Tell us about your business, current website, goals, and the performance you expect from your new website..."
                          rows={3}
                          className="bg-[#121212] border border-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF9A00]/60 transition-colors w-full resize-none"
                        />
                      </div>



                      {/* Submit form */}
                      <div className="pt-2 space-y-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#FF9A00] text-black font-display font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,154,0,0.3)] disabled:opacity-50 text-sm"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                              Launching Alignment Grid lasers...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" /> Assemble My Customized Website Blueprint
                            </>
                          )}
                        </button>

                        <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-white/5"></div>
                          <span className="flex-shrink mx-4 text-[10px] text-gray-500 tracking-wider font-mono font-medium">OR CALL US INSTANTLY</span>
                          <div className="flex-grow border-t border-white/5"></div>
                        </div>

                        <a
                          href="tel:+919691529501"
                          className="w-full border border-white/10 bg-white/5 text-white font-display font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/15 hover:border-[#FF9A00]/30 active:scale-[0.99] transition-all cursor-pointer text-sm"
                        >
                          <PhoneCall className="w-4 h-4 text-[#FF9A00]" /> Call Strategy Expert +91 96915 29501
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-gray-500 justify-center">
                        <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Data Endpoint Secure Transmission
                      </div>

                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="py-12 text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF9A00]/20 to-transparent border border-[#FF9A00]/40 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-[#FF9A00]" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-display font-bold text-white">Consoling Connection Complete!</h4>
                      <div className="space-y-2 text-gray-400 text-sm max-w-sm mx-auto">
                        <p>
                          Hi <span className="text-[#FF9A00] font-semibold">{formData.name}</span>, your conversion request has been synthesized.
                        </p>
                        {formData.bookingDate && formData.bookingTime && (
                          <div className="bg-[#121212] border border-white/5 rounded-lg p-3.5 text-xs font-mono text-center mt-3">
                            <span className="text-gray-500 uppercase block text-[9px] mb-1">YOUR CONFIRMED SLOT</span>
                            <span className="text-white font-semibold">
                              {new Date(formData.bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="text-[#FF9A00] mx-2">@</span>
                            <span className="text-white font-semibold">{formData.bookingTime}</span>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          We will reach out to you shortly to lock in your strategy session.
                        </p>
                      </div>
                    </div>

                    {/* Dynamic WhatsApp Button */}
                    {(() => {
                      const phoneNumber = "919691529501";
                      const formattedDate = formData.bookingDate 
                        ? new Date(formData.bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
                        : "";

                      const message = `Hi Lrrk.ai 👋

I have just booked a strategic audit/consultation session through your website. Here are my details:

• Name: ${formData.name}
• Business Name: ${formData.businessName || "Not specified"}
• Phone: ${formData.phone}
• Preferred Date: ${formattedDate || "Not specified"}
• Preferred Time: ${formData.bookingTime || "Not specified"}
• Requirement: ${formData.requirement || "Not specified"}

Please confirm my slot!`;

                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

                      return (
                        <div className="pt-2 flex justify-center">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full max-w-xs bg-[#25D366] hover:bg-[#20ba5a] text-black font-display font-semibold py-3 px-4 rounded-lg items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-[0_4px_20px_rgba(37,211,102,0.3)] text-sm"
                          >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.264 2.268 3.51 5.28 3.507 8.484-.007 6.655-5.344 11.993-11.95 11.993a11.92 11.92 0 01-5.705-1.46L0 24zm6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c5.444 0 9.873-4.43 9.876-9.877a9.78 9.78 0 00-2.893-6.988A9.782 9.782 0 0012.01 2.89c-5.441 0-9.872 4.43-9.875 9.878-.001 1.9.49 3.748 1.422 5.378l-.316.945-3.327-.872z" />
                            </svg>
                            Confirm & Send on WhatsApp
                          </a>
                        </div>
                      );
                    })()}

                    <button
                      onClick={resetForm}
                      className="text-xs font-mono text-[#FF9A00] border-b border-[#FF9A00]/30 hover:border-b-[#FF9A00] pb-0.5"
                    >
                      Establish another connection query
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
