import React, { useEffect, useState } from "react";

export function withBureaucracy<TProps extends object>(
  Component: React.ComponentType<TProps>,
): React.FC<TProps> {
  const Wrapped: React.FC<TProps> = (props) => {
    const [delayedProps, setDelayedProps] = useState<TProps>(props);

    useEffect(() => {
      const delayMs = 1000 + Math.floor(Math.random() * 1000);
      const timer = window.setTimeout(() => {
        setDelayedProps(props);
      }, delayMs);
      return () => window.clearTimeout(timer);
    }, [props]);

    return <Component {...delayedProps} />;
  };

  Wrapped.displayName = `withBureaucracy(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
}
