import React from "react";

const rejectionReasons = [
  "Inconsistent margin width detected.",
  "Missing Form 12-C in triplicate.",
  "Signature spilled outside the approved signature box.",
  "Ink hue not compliant with Regulation 4.2-B.",
  "Staple orientation exceeds allowed tilt tolerance.",
  "Date format conflicts with the Interoffice Calendar Act.",
  "Handwriting legibility score below minimum quota.",
  "Submitted during non-submission hours.",
];

type Props = {
  show: boolean;
};

export const RejectionStamp: React.FC<Props> = ({ show }) => {
  const reason = React.useMemo(() => {
    const index = Math.floor(Math.random() * rejectionReasons.length);
    return rejectionReasons[index];
  }, [show]);

  if (!show) return null;
  return (
    <div className="rejected-overlay">
      <div className="rejected-text">REJECTED</div>
      <div className="rejected-reason">{reason}</div>
    </div>
  );
};
