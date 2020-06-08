import React, { useState, useCallback } from "react";
import cls from "classnames";

import "./Countdown.scss";

const Countdown = () => {
  const [duration, setDuration] = useState("");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleInputChange = (ev) => {
    setDuration(ev.target.value);
  };

  const handleStart = () => {
    const d = parseInt(duration);
    if (Number.isNaN(d)) {
      alert("Please input correct duration");
      return;
    }

    setDuration(d);
    setPlaying(true);
  };

  const togglePlaying = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const selectSpeed = (speed) => () => {
    setSpeed(speed);
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
        <div className="status-text">More than halfway there!</div>
        <div className="timer">
          <span>15:31</span>
          <button onClick={togglePlaying}>
            {playing ? (
              <i className="material-icons">pause</i>
            ) : (
              <i className="material-icons">play_arrow</i>
            )}
          </button>
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
