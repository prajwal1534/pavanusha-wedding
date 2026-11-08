'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ScratchCardProps = {
  value: string;
  label: string;
  onReveal: () => void;
  revealed: boolean;
};

export function ScratchCard({ value, label, onReveal, revealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const completedRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(revealed);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d9c49b');
    gradient.addColorStop(0.48, '#f0e4c9');
    gradient.addColorStop(1, '#b89b68');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255,255,255,.42)';
    ctx.font = '600 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('✧  SCRATCH TO REVEAL  ✧', rect.width / 2, rect.height / 2 + 4);
    ctx.strokeStyle = 'rgba(105,79,42,.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      rect.width / 2,
      rect.height / 2,
      Math.min(rect.width, rect.height) * 0.39,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  useEffect(() => {
    if (!isRevealed) paintCover();
    const onResize = () => {
      if (!isRevealed) paintCover();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [paintCover, isRevealed]);

  useEffect(() => {
    if (revealed) setIsRevealed(true);
  }, [revealed]);

  const erase = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed || !drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || completedRef.current) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    // Sample every 32nd pixel for a lightweight progress estimate.
    for (let i = 3; i < pixels.length; i += 128) if (pixels[i] < 80) transparent++;
    const sampled = Math.ceil(pixels.length / 128);
    if (transparent / sampled > 0.48) {
      completedRef.current = true;
      setIsRevealed(true);
      onReveal();
    }
  };

  const finishStroke = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    checkProgress();
  };

  const revealNow = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsRevealed(true);
    onReveal();
  };

  return (
    <div className="scratch-wrap">
      <div className="scratch-value" aria-live="polite">
        <span className="scratch-number">{value}</span>
        <span className="scratch-label">{label}</span>
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          aria-label={`Scratch to reveal ${label.toLowerCase()}`}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            drawingRef.current = true;
            const ctx = event.currentTarget.getContext('2d');
            const rect = event.currentTarget.getBoundingClientRect();
            if (ctx) {
              ctx.beginPath();
              ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
            }
            erase(event);
          }}
          onPointerMove={erase}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
          onLostPointerCapture={finishStroke}
        />
      )}
      <button
        className="scratch-tap"
        type="button"
        onClick={revealNow}
        disabled={isRevealed}
      >
        {isRevealed ? 'Revealed' : 'Tap to reveal'}
      </button>
    </div>
  );
}
