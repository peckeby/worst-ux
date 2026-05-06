import React, { createContext, useContext, useMemo, useState } from "react";

type InkContextValue = {
  inkLevel: number;
  consumeInk: (amount: number) => void;
  refillInk: () => void;
};

const InkContext = createContext<InkContextValue | undefined>(undefined);

export const InkProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [inkLevel, setInkLevel] = useState(100);

  const consumeInk = (amount: number) => {
    setInkLevel((prev) => Math.max(0, prev - amount));
  };

  const refillInk = () => {
    setInkLevel(100);
  };

  const value = useMemo(() => ({ inkLevel, consumeInk, refillInk }), [inkLevel]);

  return <InkContext.Provider value={value}>{children}</InkContext.Provider>;
};

export function useInk(): InkContextValue {
  const ctx = useContext(InkContext);
  if (!ctx) {
    throw new Error("useInk must be used within InkProvider");
  }
  return ctx;
}

