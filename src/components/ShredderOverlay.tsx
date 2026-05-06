import React from "react";

const shredderMessages = [
  "Error 1234: Bureaucratic overflow. All paperwork voided pending Form 17-B/P.",
  "Error 451: Access denied by the Office of Redundant Copies. Resubmit in triplicate.",
  "Error 604: Shredding initiated per Section 12, Subclause C. Appeals in 6-8 weeks.",
  "Error 302: Document redirected to the Archive of Lost Forms.",
  "Error 999: Compliance achieved. Documentation destroyed for your protection.",
];

type Props = {
  show: boolean;
};

export const ShredderOverlay: React.FC<Props> = ({ show }) => {
  const message = React.useMemo(() => {
    const index = Math.floor(Math.random() * shredderMessages.length);
    return shredderMessages[index];
  }, [show]);

  if (!show) return null;

  return (
    <div className="shredder-overlay">
      <div className="shredder-box">
        <div className="shredder-title">Document Shredder Active</div>
        <div className="shredder-doc">Form 17-B</div>
        <div className="shredder-strips">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className="shred-strip" />
          ))}
        </div>
        <div className="shredder-note">{message}</div>
      </div>
    </div>
  );
};
