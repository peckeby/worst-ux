import React, { useState } from "react";

export const HelpCenter: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSection, setShowSection] = useState(false);

  return (
    <section className="panel">
      <h2>Circular Reference Help Center</h2>
      <button onClick={() => setShowHelp(true)}>Help</button>
      {showHelp && (
        <div className="modal">
          <div className="modal-content">
            <h3>Help</h3>
            <p>For help, please refer to Section 4B.</p>
            <button onClick={() => setShowSection(true)}>Open Section 4B</button>
            <button className="secondary" onClick={() => setShowHelp(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {showSection && (
        <div className="modal">
          <div className="modal-content">
            <h3>Section 4B</h3>
            <p>See the Help button on the home page.</p>
            <button className="secondary" onClick={() => setShowSection(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

