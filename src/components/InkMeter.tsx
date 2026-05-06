import React from "react";
import { useInk } from "../context/InkContext";

export const InkMeter: React.FC = () => {
  const { inkLevel } = useInk();

  return (
    <div className="ink-meter">
      <div className="ink-label">Ink Reservoir</div>
      <div className="ink-bar">
        <div className="ink-fill" style={{ width: `${inkLevel}%` }} />
      </div>
      <div className="ink-value">{inkLevel}%</div>
    </div>
  );
};

