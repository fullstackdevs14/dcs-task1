import React, { useState } from "react";
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

    console.log(d);
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
          {playing ? (
            <button>
              <i className="material-icons">pause</i>
            </button>
          ) : (
            <button>
              <i className="material-icons">play_arrow</i>
            </button>
          )}
        </div>
      </div>
      <div className="speed-controls">
        <span className={cls({ selected: speed === 1 })}>1X</span>
        <span className={cls({ selected: speed === 1.5 })}>1.5X</span>
        <span className={cls({ selected: speed === 2 })}>2X</span>
      </div>
    </div>
  );
};

export default Countdown;
