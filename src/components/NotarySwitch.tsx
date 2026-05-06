import React, { useEffect, useMemo, useState } from "react";

const CHANNEL_NAME = "bureaucracy-notary";

export const NotarySwitch: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const channel = useMemo(() => new BroadcastChannel(CHANNEL_NAME), []);

  useEffect(() => {
    channel.onmessage = (event) => {
      if (event.data?.type === "stamp-dragged") {
        setUnlocked(true);
        window.setTimeout(() => setUnlocked(false), 5000);
      }
    };

    return () => channel.close();
  }, [channel]);

  const openDesk = () => {
    window.open(
      `${window.location.origin}/?desk=notary`,
      "notary",
      "width=320,height=220,menubar=no,toolbar=no,location=no,status=no",
    );
  };

  return (
    <section className="panel">
      <h2>Office of Records</h2>
      <div className="notary-row">
        <button onClick={openDesk}>Open The Notary's Desk</button>
        <label className="switch">
          <input
            type="checkbox"
            disabled={!unlocked}
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
          />
          <span>{unlocked ? "Enable Notifications" : "Pending Notarization"}</span>
        </label>
        {unlocked && <div className="timer">Unlocked for 5 seconds.</div>}
      </div>
    </section>
  );
};

