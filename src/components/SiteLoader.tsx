import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Pill, Sparkles, FlaskConical } from 'lucide-react';

export function SiteLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence of animations
    const timer1 = setTimeout(() => setStep(1), 1000); // Scale -> Pouring
    const timer2 = setTimeout(() => setStep(2), 2000); // Pouring -> Pill
    const timer3 = setTimeout(() => setStep(3), 3000); // Pill -> Spinning -> Sparkles
    const timer4 = setTimeout(() => onComplete(), 4000); // Done

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-[100] bg-[#152C60] flex flex-col items-center justify-center">
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 text-xs font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors z-50"
      >
        Pular
      </button>

      <div className="relative w-32 h-32 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="scale"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className="flex flex-col items-center text-white"
            >
              <Scale size={48} strokeWidth={1.5} />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-2 w-2 h-2 bg-white rounded-full"
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="flask"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className="flex flex-col items-center text-white relative"
            >
              <Pill size={48} strokeWidth={1.5} />
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-2 border-white/20 border-t-white rounded-full scale-150 relative top-0"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="sparkles"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              className="flex flex-col items-center text-[#5C88DA]"
            >
              <Sparkles size={64} strokeWidth={1.5} className="text-[#5C88DA]" />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="sparkles-end"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              className="flex flex-col items-center text-[#5C88DA]"
            >
              <Sparkles size={64} strokeWidth={1.5} className="text-white" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white rounded-full filter blur-xl -z-10"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 h-6 flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.span key="txt1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm font-medium tracking-widest text-white uppercase">
              Bem-vindo à
            </motion.span>
          )}
          {step === 1 && (
            <motion.span key="txt2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm font-medium tracking-widest text-white uppercase">
              Botica Guaraní
            </motion.span>
          )}
          {step === 2 && (
            <motion.span key="txt3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm font-medium tracking-widest text-white uppercase">
              A farmácia
            </motion.span>
          )}
          {step === 3 && (
            <motion.span key="txt4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm font-medium tracking-widest text-white uppercase">
              Do futuro
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
