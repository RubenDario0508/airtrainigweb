import React, { useRef, useEffect, useCallback } from 'react';

interface CanvasEngineProps {
  progress: number; // 0 to 1
  onLoadProgress: (pct: number) => void;
}

const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) => {
  const ratio = Math.max(cw / img.width, ch / img.height);
  const newWidth = img.width * ratio;
  const newHeight = img.height * ratio;
  const x = (cw - newWidth) / 2;
  const y = (ch - newHeight) / 2;
  
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, x, y, newWidth, newHeight);
};

export const CanvasEngine: React.FC<CanvasEngineProps> = ({ progress, onLoadProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());
  const progressRef = useRef(progress);
  const totalFrames = 76;

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Draw frame based on progress
  const drawFrame = useCallback((p: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const targetIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(p * totalFrames))
    );
    
    // Try exact frame first, then find nearest loaded frame
    let img = imagesRef.current[targetIndex];
    
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find the nearest loaded frame
      let bestImg: HTMLImageElement | null = null;
      let bestDist = Infinity;
      
      loadedSetRef.current.forEach(idx => {
        const dist = Math.abs(idx - targetIndex);
        if (dist < bestDist) {
          bestDist = dist;
          bestImg = imagesRef.current[idx];
        }
      });
      
      if (bestImg) img = bestImg;
    }

    if (img && img.complete && img.naturalWidth !== 0) {
      drawCover(ctx, img, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);
  
  // Preload images in priority order: first frame, then critical frames, then rest
  useEffect(() => {
    if (imagesRef.current.length > 0) return;

    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;
    
    // Priority 1: Load frame 0 first (visible immediately)
    const criticalFrames: number[] = [];
    for (let i = 5; i < totalFrames; i += 5) {
      criticalFrames.push(i);
    }
    
    // Priority 3: Load remaining frames
    const remainingFrames: number[] = [];
    for (let i = 1; i < totalFrames; i++) {
      if (!criticalFrames.includes(i)) {
        remainingFrames.push(i);
      }
    }

    const loadBatch = async (frames: number[]) => {
      const batchSize = 3; // Cargar de a 3 para no asfixiar el CPU
      for (let i = 0; i < frames.length; i += batchSize) {
        const batch = frames.slice(i, i + batchSize);
        await Promise.all(batch.map(idx => new Promise<void>(resolve => {
          const img = new Image();
          const paddedNumber = String(idx).padStart(3, '0');
          img.src = `/mejorahero/upscayl_png_upscayl-lite-4x_4x/Airplane_taking_off_into_sky_202606041437_${paddedNumber}.webp`;
          
          img.onload = () => {
            loadedCount++;
            loadedSetRef.current.add(idx);
            onLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            
            // Draw the first available frame immediately
            if (loadedCount === 1 && canvasRef.current) {
              const ctx = canvasRef.current.getContext('2d');
              if (ctx) {
                drawCover(ctx, img, canvasRef.current.width, canvasRef.current.height);
              }
            }
            images[idx] = img;
            resolve();
          };
          
          img.onerror = () => {
            loadedCount++;
            onLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            resolve();
          };
        })));
        
        // Ceder control al Hilo Principal (Main Thread) antes de procesar el siguiente lote
        await new Promise(r => setTimeout(r, 16));
      }
    };

    const startLoadingSequence = async () => {
      await loadBatch([0]); // Primero el frame 0
      await loadBatch(criticalFrames); // Luego los frames intermedios para interpolación
      loadBatch(remainingFrames); // Finalmente el resto en background
    };

    startLoadingSequence();
    
    imagesRef.current = images;
  }, [onLoadProgress]);

  // Resize canvas to window
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        drawFrame(progressRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Only draw when progress changes, no continuous loop needed
  useEffect(() => {
    drawFrame(progress);
  }, [progress, drawFrame]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'block' 
      }} 
    />
  );
};
