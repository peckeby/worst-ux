import React, { useEffect, useMemo, useState } from "react";
import { SignaturePad } from "./SignaturePad";

type Props = {
  onAuthenticated: () => void;
  resetToken: number;
};

export const TriplicateAuth: React.FC<Props> = ({ onAuthenticated, resetToken }) => {
  const [username, setUsername] = useState("");
  const [copyA, setCopyA] = useState("");
  const [copyB, setCopyB] = useState("");
  const [signatureReady, setSignatureReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pressCount, setPressCount] = useState(0);
  const [pressMessage, setPressMessage] = useState<string | null>(null);
  const [pressPulse, setPressPulse] = useState(0);

  const isAligned = useMemo(() => username && username === copyA && username === copyB, [username, copyA, copyB]);
  const pressLabel = useMemo(() => {
    if (pressCount === 0) return "Press Harder";
    if (pressCount < 3) return "Press Harder (Bureaucratic)";
    if (pressCount < 6) return "Press Harder (With Feeling)";
    return "Press Harder (Legally Binding)";
  }, [pressCount]);

  const pressHarder = () => {
    const outcomes = [
      "The carbon paper sighs in relief.",
      "A clerk nods approvingly somewhere.",
      "A stamp rolls its eyes but complies.",
      "Your effort has been recorded in triplicate.",
      "You hear distant filing cabinets applauding.",
    ];

    const targets = ["A", "B"].filter((label) => (label === "A" ? !copyA : !copyB));
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    if (targets.length === 0) {
      setPressMessage(`${outcome} Nothing else to imprint.`);
      setPressPulse((prev) => prev + 1);
      return;
    }

    const pick = targets[Math.floor(Math.random() * targets.length)];
    if (pick === "A") {
      setCopyA(username);
    } else {
      setCopyB(username);
    }

    setPressCount((prev) => prev + 1);
    setPressMessage(`${outcome} Copy ${pick} takes the hint.`);
    setPressPulse((prev) => prev + 1);
  };

  const resetForm = (message: string | null) => {
    setError(message);
    setUsername("");
    setCopyA("");
    setCopyB("");
    setSignatureReady(false);
    setPressCount(0);
    setPressMessage(null);
  };

  useEffect(() => {
    resetForm(null);
  }, [resetToken]);

  useEffect(() => {
    if (!pressMessage) return;
    const timeout = window.setTimeout(() => setPressMessage(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [pressMessage]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isAligned) {
      resetForm("Carbon copies do not match. Form reset.");
      return;
    }
    if (!signatureReady) {
      setError("Signature required. Please sign again.");
      return;
    }
    setError(null);
    onAuthenticated();
  };

  const handleTear = () => {
    setError("Paper torn due to excessive speed. Reloading...");
    window.setTimeout(() => window.location.reload(), 900);
  };

  return (
    <section className="panel">
      <h2>Triplicate Authentication</h2>
      <form onSubmit={handleSubmit}>
        <label className="field">
          Username (Original)
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Type carefully"
          />
        </label>
        <div className="press-row">
          <button type="button" onClick={pressHarder} className="press-button" data-pulse={pressPulse}>
            {pressLabel}
          </button>
          <div className="press-status">
            Copies: {copyA ? "A" : "_"} {copyB ? "B" : "_"}
          </div>
        </div>
        {pressMessage && <div className="press-message">{pressMessage}</div>}
        <input className="hidden-copy" value={copyA} readOnly />
        <input className="hidden-copy" value={copyB} readOnly />

        <SignaturePad onComplete={() => setSignatureReady(true)} onTear={handleTear} />

        <button type="submit" className="primary">
          Submit Authentication
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {isAligned && signatureReady && <div className="success">Authentication paperwork appears valid.</div>}
    </section>
  );
};
