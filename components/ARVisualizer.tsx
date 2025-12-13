import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, Zap, ArrowRight, Check, Download, Layers } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { generateRoomVisualisation } from '../services/geminiService';
import { Product } from '../types';

const ARVisualizer: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(image);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setGeneratedImage(null);
    setSliderPosition(50);
    startCamera();
  };

  const generateVisualization = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    try {
      const result = await generateRoomVisualisation(
        capturedImage, 
        selectedProduct.name,
        selectedProduct.description
      );
      setGeneratedImage(result);
    } catch (error) {
      console.error("Failed to generate:", error);
      alert("Neural Link unstable. Could not generate visualization.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `aether-ar-${selectedProduct.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pt-24 min-h-screen px-4 pb-12 max-w-6xl mx-auto flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
          Reality <span className="text-aether-accent">Augmented</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Project Aether artifacts directly into your environment using our Generative AR Core.
        </p>
      </div>

      <div className="w-full grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-aether-panel border border-white/10 p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-aether-accent" /> Select Artifact
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {PRODUCTS.map(p => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedProduct.id === p.id 
                      ? 'bg-aether-accent/10 border-aether-accent text-white' 
                      : 'bg-black/40 border-white/5 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-12 h-12 rounded object-cover" alt={p.name} />
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-xs font-mono opacity-70">${p.price}</div>
                    </div>
                    {selectedProduct.id === p.id && <Check className="ml-auto h-4 w-4 text-aether-accent" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {generatedImage && (
             <div className="p-6 bg-aether-panel border border-white/10 rounded-2xl">
                <button 
                  onClick={downloadImage}
                  className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider rounded hover:bg-aether-accent transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" /> Save Visual
                </button>
             </div>
          )}
        </div>

        {/* Viewport */}
        <div className="lg:col-span-2">
          <div 
            ref={containerRef}
            className="relative aspect-[4/3] bg-black rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group select-none"
          >
            
            {/* Camera View */}
            {!capturedImage && (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-64 h-64 border-2 border-white/20 rounded-xl border-dashed"></div>
                </div>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                   <button 
                     onClick={capturePhoto}
                     className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                   >
                     <div className="w-12 h-12 rounded-full bg-black/10"></div>
                   </button>
                </div>
                <div className="absolute top-4 right-4 z-20">
                   <label className="p-3 bg-black/50 backdrop-blur rounded-full cursor-pointer hover:bg-black/70 transition-colors block">
                      <Upload className="h-6 w-6 text-white" />
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                   </label>
                </div>
              </>
            )}

            {/* Captured / Generated View */}
            {capturedImage && (
              <div className="relative w-full h-full">
                
                {generatedImage ? (
                  // Before / After Slider
                  <div className="relative w-full h-full">
                     {/* Base Image (Generated / After) */}
                     <img 
                       src={generatedImage} 
                       alt="After" 
                       className="absolute inset-0 w-full h-full object-cover"
                     />
                     
                     {/* Overlay Image (Original / Before) - clipped by width */}
                     <div 
                       className="absolute inset-0 overflow-hidden border-r-2 border-aether-accent/50 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                       style={{ width: `${sliderPosition}%` }}
                     >
                        <img 
                          src={capturedImage} 
                          alt="Before" 
                          className="absolute inset-0 h-full max-w-none object-cover"
                          style={{ width: containerWidth ? `${containerWidth}px` : '100%' }} 
                        />
                     </div>
                     
                     {/* Label Indicators */}
                     <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs font-bold text-white pointer-events-none">ORIGINAL</div>
                     <div className="absolute top-4 right-4 bg-aether-accent/80 px-2 py-1 rounded text-xs font-bold text-black pointer-events-none">AETHER_ENHANCED</div>

                     {/* Slider Handle */}
                     <input 
                       type="range" 
                       min="0" 
                       max="100" 
                       value={sliderPosition} 
                       onChange={(e) => setSliderPosition(Number(e.target.value))}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                     />
                     
                     {/* Visual Handle Icon */}
                     <div 
                       className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10 pointer-events-none"
                       style={{ left: `calc(${sliderPosition}% - 16px)` }}
                     >
                        <Layers className="h-4 w-4 text-black" />
                     </div>
                  </div>
                ) : (
                  // Just captured image or loading state
                  <img 
                    src={capturedImage} 
                    alt="Visualization" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${isProcessing ? 'blur-sm scale-105' : 'blur-0 scale-100'}`} 
                  />
                )}
                
                {isProcessing && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30">
                      <div className="w-16 h-16 border-4 border-aether-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                      <div className="text-aether-accent font-mono animate-pulse">GENERATING REALITY...</div>
                   </div>
                )}

                {!generatedImage && !isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
                    <button 
                      onClick={generateVisualization}
                      className="px-8 py-4 bg-aether-accent text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2"
                    >
                      <Zap className="h-5 w-5" /> GENERATE PREVIEW
                    </button>
                  </div>
                )}
                
                <div className="absolute bottom-4 right-4 z-40">
                  <button 
                    onClick={reset}
                    className="p-3 bg-black/50 backdrop-blur rounded-full hover:bg-red-500/80 hover:text-white transition-colors text-white"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="mt-6 flex justify-between items-center text-sm text-gray-500 font-mono">
             <div>MODE: {capturedImage ? (generatedImage ? 'COMPARE_VIEW' : 'IMAGE_LOCKED') : 'LIVE_FEED'}</div>
             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stream ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                SYSTEM_STATUS: ONLINE
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVisualizer;