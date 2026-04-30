import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  // Sync index when initialIndex changes (e.g. clicking different product)
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
  }, [initialIndex, isOpen]);

  if (!isOpen) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[400] bg-[#152C60]/40 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[70vh]"
        >
          {/* Main Image Area */}
          <div className="flex-1 relative bg-[#F3F6FA]/30 flex items-center justify-center overflow-hidden">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt="Product view"
              animate={{ scale: zoom }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="max-w-full max-h-full object-contain p-12"
            />

            {/* Navigation inside image area */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm hover:bg-white text-[#152C60] rounded-full flex items-center justify-center transition-all pointer-events-auto shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm hover:bg-white text-[#152C60] rounded-full flex items-center justify-center transition-all pointer-events-auto shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
              <button onClick={handleZoomOut} className="text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
                <ZoomOut size={18} />
              </button>
              <span className="text-[10px] font-black uppercase text-[#152C60] min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={handleZoomIn} className="text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors">
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          {/* Thumbnails Sidebar/Bottom */}
          <div className="w-full md:w-32 bg-white border-l border-[#152C60]/5 flex md:flex-col gap-4 p-6 overflow-x-auto md:overflow-y-auto custom-scrollbar items-center">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setZoom(1); }}
                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                  currentIndex === i ? 'border-[#2B5DB6] scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white shadow-xl text-[#152C60] rounded-full flex items-center justify-center hover:bg-[#2B5DB6] hover:text-white transition-all z-20"
          >
            <X size={20} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
