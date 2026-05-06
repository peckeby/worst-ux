import React, { useEffect, useRef, useState } from "react";

const CHANNEL_NAME = "bureaucracy-notary";

export const NotaryDesk: React.FC = () => {
  const [onBreak, setOnBreak] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const channelClosedRef = useRef(false);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(CHANNEL_NAME);
    channelClosedRef.current = false;

    return () => {
      channelClosedRef.current = true;
      channelRef.current?.close();
      channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOnBreak(true);
      window.setTimeout(() => setOnBreak(false), 20 * 60 * 1000);
    }, 15 * 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  const ensureChannel = () => {
    if (!channelRef.current || channelClosedRef.current) {
      channelRef.current = new BroadcastChannel(CHANNEL_NAME);
      channelClosedRef.current = false;
    }
    return channelRef.current;
  };

  const triggerStamp = () => {
    console.log("[NotaryDesk] stamp trigger -> send stamp-dragged");
    try {
      ensureChannel().postMessage({ type: "stamp-dragged" });
    } catch (error) {
      channelClosedRef.current = true;
      console.warn("[NotaryDesk] failed to send stamp message", error);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerStamp();
    }
  };

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", "notary-stamp");
  };

  return (
    <div className="notary-window">
      <h2>The Notary's Desk</h2>
      {onBreak ? (
        <div className="break-sign">Back in 20 Minutes</div>
      ) : (
        <div className="stamp-area">
          <div
            className="stamp"
            draggable
            role="button"
            tabIndex={0}
            onDragStart={handleDragStart}
            onDragEnd={triggerStamp}
            onClick={triggerStamp}
            onKeyDown={handleKeyDown}
          >
            STAMP
          </div>
          <div className="hint">Drag or click the stamp to reject the form.</div>
        </div>
      )}
    </div>
  );
};
