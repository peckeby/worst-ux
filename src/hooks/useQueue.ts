import { useCallback, useRef, useState } from "react";

type QueueState = {
  position: number;
  isProcessing: boolean;
  setPosition: (next: number) => void;
  gateUpdate: (action: () => void) => void;
};

export function useQueue(): QueueState {
  const [position, setPositionState] = useState(84);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  const gateUpdate = useCallback((action: () => void) => {
    if (processingRef.current) {
      return;
    }
    setIsProcessing(true);
    processingRef.current = true;
    window.setTimeout(() => {
      action();
      setIsProcessing(false);
      processingRef.current = false;
    }, 700);
  }, []);

  const setPosition = useCallback(
    (next: number) => {
      gateUpdate(() => setPositionState(next));
    },
    [gateUpdate],
  );

  return { position, isProcessing, setPosition, gateUpdate };
}
