import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CountdownHeader.css";

const CountdownHeader = ({ onStart }) => {
  const [duration, setDuration] = useState("");

  const handleInputChange = (ev) => {
    setDuration(ev.target.value);
  };

  const handleStart = () => {
    const d = parseInt(duration);
    if (Number.isNaN(d)) {
      alert("Please input correct duration");
      return;
    }

    onStart(d);
  };

  return (
    <div className="countdown-header">
      <span>Countdown:</span>
      <input
        value={duration}
        onChange={handleInputChange}
        placeholder="(MIN)"
      />
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

CountdownHeader.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default CountdownHeader;
