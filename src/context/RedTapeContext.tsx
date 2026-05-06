import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type RedTapeContextValue = {
  themeColor: string;
};

const RedTapeContext = createContext<RedTapeContextValue | undefined>(undefined);

const colors = ["#f4e27b", "#8ab1ff", "#f9f9f9"];

export const RedTapeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [themeColor, setThemeColor] = useState(colors[0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const next = colors[Math.floor(Math.random() * colors.length)];
      setThemeColor(next);
    }, 18000);
    return () => window.clearInterval(interval);
  }, []);

  const value = useMemo(() => ({ themeColor }), [themeColor]);

  return <RedTapeContext.Provider value={value}>{children}</RedTapeContext.Provider>;
};

export function useRedTape(): RedTapeContextValue {
  const ctx = useContext(RedTapeContext);
  if (!ctx) {
    throw new Error("useRedTape must be used within RedTapeProvider");
  }
  return ctx;
}

