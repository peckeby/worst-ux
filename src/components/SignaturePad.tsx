import React, { useEffect, useRef, useState } from "react";

type Props = {
  onComplete: (dataUrl: string) => void;
  onTear: () => void;
};

type Point = { x: number; y: number; time: number };

export const SignaturePad: React.FC<Props> = ({ onComplete, onTear }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1a1a1a";
  }, []);

  const getPos = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getPos(event);
    lastPoint.current = { x, y, time: Date.now() };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const { x, y } = getPos(event);
    const now = Date.now();
    const prev = lastPoint.current;

    if (prev) {
      const dt = Math.max(1, now - prev.time);
      const dx = x - prev.x;
      const dy = y - prev.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      if (speed > 0.4) {
        onTear();
        return;
      }

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    lastPoint.current = { x, y, time: now };
  };

  const handleMouseUp = () => {
    if (!canvasRef.current) return;
    setIsDrawing(false);
    lastPoint.current = null;
    onComplete(canvasRef.current.toDataURL());
  };

  return (
    <div className="signature-pad">
      <canvas
        ref={canvasRef}
        width={320}
        height={140}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="signature-hint">Draw slowly. Fast strokes tear the paper.</div>
    </div>
  );
};

