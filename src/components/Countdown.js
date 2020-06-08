import React, { useState, useCallback, useRef } from "react";
import cls from "classnames";

import "./Countdown.scss";

const addPadding0 = (n) => (n < 10 ? `0${n}` : n);

const formatTime = (seconds) => {
  if (seconds < 0) {
    seconds = 0;
  }

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${addPadding0(s)}`;
};

const Countdown = () => {
  const [duration, setDuration] = useState("");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [status, setStatus] = useState(0);
  const timerRef = useRef(0);

  const handleInputChange = (ev) => {
    setDuration(ev.target.value);
  };

  const startTimer = useCallback(
    (d, halfPoint, speed) => {
      if (d <= 0) {
        return;
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      console.log("starting timer", d, speed, timerRef.current);

      let halfPast = d < halfPoint;

      timerRef.current = setInterval(() => {
        d -= 1;
        setRemaining(d);
        console.log(d);
        if (d <= 0) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setStatus(2);
          setPlaying(false);
        } else if (d < halfPoint && !halfPast) {
          setStatus(1);
          halfPast = true;
        }
      }, 1000 / speed);
    },
    [setStatus, setPlaying]
  );

  const handleStart = useCallback(() => {
    const d = parseInt(duration);
    if (Number.isNaN(d)) {
      alert("Please input correct duration");
      return;
    }

    setDuration(d);
    setRemaining(d * 60);
    setPlaying(true);
    startTimer(d * 60, d * 30, speed);
  }, [duration, speed, startTimer]);

  const togglePlaying = useCallback(() => {
    if (playing) {
      setPlaying(false);
      clearInterval(timerRef.current);
    } else if (remaining > 0) {
      setPlaying(true);
      startTimer(remaining, duration * 30, speed);
    }
  }, [playing, remaining, duration, speed, startTimer]);

  const selectSpeed = (speed) => () => {
    setSpeed(speed);
    if (playing) {
      startTimer(remaining, duration * 30, speed);
    }
  };

  return (
    <div className="countdown">
      <div className="countdown-header">
        <span>Countdown:</span>
        <input
          value={duration}
          onChange={handleInputChange}
          placeholder="(MIN)"
        />
        <button onClick={handleStart}>Start</button>
      </div>
      <div className="countdown-body">
        <div className="status-text">
          {status === 1 && <span>More than halfway there!</span>}
          {status === 2 && <span>Times up!</span>}
        </div>
        <div className="timer">
          <span>{formatTime(remaining)}</span>
          {remaining > 0 && (
            <button onClick={togglePlaying}>
              {playing ? (
                <i className="material-icons">pause</i>
              ) : (
                <i className="material-icons">play_arrow</i>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="speed-controls">
        <span
          className={cls({ selected: speed === 1 })}
          onClick={selectSpeed(1)}
        >
          1X
        </span>
        <span
          className={cls({ selected: speed === 1.5 })}
          onClick={selectSpeed(1.5)}
        >
          1.5X
        </span>
        <span
          className={cls({ selected: speed === 2 })}
          onClick={selectSpeed(2)}
        >
          2X
        </span>
      </div>
    </div>
  );
};

export default Countdown;
