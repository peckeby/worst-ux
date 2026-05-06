import React, { useEffect, useRef, useState } from "react";
import { useQueue } from "../hooks/useQueue";

export const WaitingRoom: React.FC = () => {
  const { position, setPosition, gateUpdate } = useQueue();
  const [vipNotice, setVipNotice] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioRunning, setAudioRunning] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastMouse = useRef(Date.now());

  useEffect(() => {
    const handleMouse = () => {
      lastMouse.current = Date.now();
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const focused = document.hasFocus();
      const moving = Date.now() - lastMouse.current < 800;
      const canAdvance = focused && moving && audioRunning;

      if (canAdvance) {
        gateUpdate(() => setPosition(Math.max(0, position - 1)));
      }
    }, 1200);

    return () => window.clearInterval(interval);
  }, [audioRunning, gateUpdate, position, setPosition]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const bump = Math.random() < 0.2;
      if (bump) {
        setVipNotice(true);
        gateUpdate(() => setPosition(position + 5));
        window.setTimeout(() => setVipNotice(false), 2000);
      }
    }, 9000);

    return () => window.clearInterval(interval);
  }, [gateUpdate, position, setPosition]);

  const startHoldMusic = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;
    if (audioContext.state !== "running") {
      await audioContext.resume();
    }

    const playLoop = () => {
      if (!audioContextRef.current) return;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const now = audioContext.currentTime;
      const beepDuration = 0.12;
      const beepGap = 0.08;
      const tail = 0.2;
      const totalDuration = beepDuration * 2 + beepGap + tail;

      osc.type = "square";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + beepDuration);

      const secondBeepStart = now + beepDuration + beepGap;
      gain.gain.exponentialRampToValueAtTime(0.04, secondBeepStart + 0.01);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        secondBeepStart + beepDuration
      );

      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + totalDuration);
      osc.onended = () => {
        if (audioContextRef.current?.state === "running") {
          playLoop();
        }
      };
    };

    playLoop();
    setAudioReady(true);
    setAudioRunning(true);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      const running = audioContextRef.current?.state === "running";
      setAudioRunning(Boolean(running));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="panel">
      <h2>Active Waiting Room</h2>
      <div className="queue-status">Position in Queue: {position}</div>
      {!audioReady && (
        <button onClick={startHoldMusic}>Begin Hold Music</button>
      )}
      {audioReady && !audioRunning && (
        <div className="warning">Queue paused. The operator cannot hear you.</div>
      )}
      {vipNotice && <div className="notice">A VIP user has been prioritized.</div>}
      <div className="queue-hint">
        Stay focused and keep moving the mouse to advance.
      </div>
    </section>
  );
};
