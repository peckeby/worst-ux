import React, { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onComplete: () => void;
};

export const ProcessingFeeModal: React.FC<Props> = ({ open, onComplete }) => {
  const [authorizing, setAuthorizing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!authorizing) return;
    const interval = window.setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 2));
    }, 600);
    return () => window.clearInterval(interval);
  }, [authorizing]);

  useEffect(() => {
    if (progress >= 100 && authorizing) {
      setAuthorizing(false);
      setProgress(0);
      onComplete();
    }
  }, [authorizing, onComplete, progress]);

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Processing Fee</h3>
        <p>Before submission, please pay the $0.00 processing fee.</p>
        <button onClick={() => setAuthorizing(true)} disabled={authorizing}>
          Pay $0.00 Fee
        </button>
        {authorizing && (
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <span>Authorizing Transaction</span>
          </div>
        )}
      </div>
    </div>
  );
};

