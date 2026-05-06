import { useEffect, useRef } from "react";

type Options = {
  onShake: () => void;
  threshold?: number;
};

export function useShakeRefill({ onShake, threshold = 120 }: Options): void {
  const lastPos = useRef({ x: window.screenX, y: window.screenY, time: Date.now() });
  const shakeScore = useRef(0);

  useEffect(() => {
    let raf = 0;

    const check = () => {
      const now = Date.now();
      const dx = Math.abs(window.screenX - lastPos.current.x);
      const dy = Math.abs(window.screenY - lastPos.current.y);
      const dt = now - lastPos.current.time;

      if (dt < 350) {
        shakeScore.current += dx + dy;
      } else {
        shakeScore.current = Math.max(0, shakeScore.current - 40);
      }

      if (shakeScore.current > threshold) {
        shakeScore.current = 0;
        onShake();
      }

      lastPos.current = { x: window.screenX, y: window.screenY, time: now };
      raf = window.requestAnimationFrame(check);
    };

    raf = window.requestAnimationFrame(check);

    return () => window.cancelAnimationFrame(raf);
  }, [onShake, threshold]);
}

