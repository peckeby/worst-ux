import React, { useEffect, useMemo, useState } from "react";
import { TriplicateAuth } from "./components/TriplicateAuth";
import { NotaryDesk } from "./components/NotaryDesk";
import { NotarySwitch } from "./components/NotarySwitch";
import { WaitingRoom } from "./components/WaitingRoom";
import { InkMeter } from "./components/InkMeter";
import { HelpCenter } from "./components/HelpCenter";
import { ProcessingFeeModal } from "./components/ProcessingFeeModal";
import { RegulationsModal } from "./components/RegulationsModal";
import { RejectionStamp } from "./components/RejectionStamp";
import { ShredderOverlay } from "./components/ShredderOverlay";
import { InkProvider, useInk } from "./context/InkContext";
import { RedTapeProvider, useRedTape } from "./context/RedTapeContext";
import { useShakeRefill } from "./hooks/useShakeRefill";
import { withBureaucracy } from "./hoc/withBureaucracy";

const BureauTriplicate = withBureaucracy(TriplicateAuth);
const BureauNotarySwitch = withBureaucracy(NotarySwitch);
const BureauWaitingRoom = withBureaucracy(WaitingRoom);
const BureauHelpCenter = withBureaucracy(HelpCenter);
const BureauInkMeter = withBureaucracy(InkMeter);

const NOTARY_CHANNEL_NAME = "bureaucracy-notary";

const DeskApp: React.FC = () => {
  return <NotaryDesk />;
};

const BureauDeskApp = withBureaucracy(DeskApp);

const MainApp: React.FC = () => {
  const { inkLevel, consumeInk, refillInk } = useInk();
  const { themeColor } = useRedTape();
  const [authenticated, setAuthenticated] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showRegulationsModal, setShowRegulationsModal] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showShredder, setShowShredder] = useState(false);
  const [authResetToken, setAuthResetToken] = useState(0);
  const notaryChannel = useMemo(() => new BroadcastChannel(NOTARY_CHANNEL_NAME), []);

  useEffect(() => {
    notaryChannel.onmessage = (event) => {
      if (event.data?.type === "stamp-dragged") {
        setShowRejected(true);
        window.setTimeout(() => setShowRejected(false), 5000);
      }
    };

    return () => notaryChannel.close();
  }, [notaryChannel]);

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types.includes("text/plain")) {
        event.preventDefault();
      }
    };

    const handleDrop = (event: DragEvent) => {
      if (event.dataTransfer?.getData("text/plain") === "notary-stamp") {
        event.preventDefault();
        setShowRejected(true);
        window.setTimeout(() => setShowRejected(false), 5000);
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  useShakeRefill({
    onShake: () => {
      if (inkLevel === 0) {
        refillInk();
      }
    },
  });

  const handleClickCapture = () => {
    if (inkLevel > 0) {
      consumeInk(5);
    }
  };

  const handleTextChange = (value: string) => {
    const diff = value.length - textValue.length;
    if (diff > 0 && inkLevel > 0) {
      consumeInk(diff * 2);
    }
    setTextValue(value);
  };

  const handleFinalSubmit = () => {
    setShowFeeModal(false);
    setShowRegulationsModal(true);
  };

  const handleAcceptRegulations = () => {
    setShowRegulationsModal(false);
    setShowFeeModal(true);
  };

  const completeSubmission = () => {
    setShowFeeModal(false);
    setShowShredder(true);
    window.setTimeout(() => {
      setShowShredder(false);
      setTextValue("");
      setAuthenticated(false);
      setAuthResetToken((prev) => prev + 1);
    }, 6000);
    setSubmitCount((prev) => {
      const next = prev + 1;
      if (next % 3 === 0) {
        setShowRejected(true);
        window.setTimeout(() => setShowRejected(false), 5000);
      }
      return next;
    });
  };

  const appStyle = useMemo(() => ({ backgroundColor: themeColor }), [themeColor]);
  const inkEmpty = inkLevel === 0;

  return (
    <div className={`app ${inkEmpty ? "ink-empty" : ""}`} style={appStyle} onClickCapture={handleClickCapture}>
      <header>
        <h1>Bureaucracy Simulator</h1>
        <BureauInkMeter />
      </header>

      {!authenticated ? (
        <BureauTriplicate onAuthenticated={() => setAuthenticated(true)} resetToken={authResetToken} />
      ) : (
        <div className="grid">
          <BureauNotarySwitch />
          <BureauWaitingRoom />
          <section className="panel">
            <h2>Form 17-B</h2>
            <div className="meta">Submission attempts: {submitCount}</div>
            <textarea
              value={textValue}
              onChange={(event) => handleTextChange(event.target.value)}
              placeholder="Every character costs 2% ink."
              rows={5}
            />
            <button onClick={handleFinalSubmit}>Finalize Application</button>
          </section>
          <BureauHelpCenter />
        </div>
      )}

      {inkEmpty && (
        <div className="ink-overlay">
          <div className="ink-message">Ink depleted. Shake the window to refill.</div>
        </div>
      )}

      <RegulationsModal open={showRegulationsModal} onAccept={handleAcceptRegulations} />
      <ProcessingFeeModal open={showFeeModal} onComplete={completeSubmission} />
      <RejectionStamp show={showRejected} />
      <ShredderOverlay show={showShredder} />
    </div>
  );
};

const BureauMainApp = withBureaucracy(MainApp);

const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const isNotaryDesk = params.get("desk") === "notary";

  return (
    <RedTapeProvider>
      <InkProvider>
        {isNotaryDesk ? <BureauDeskApp /> : <BureauMainApp />}
      </InkProvider>
    </RedTapeProvider>
  );
};

export default App;

