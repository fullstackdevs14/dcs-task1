import React from "react";
import CountdownHeader from "./CountdownHeader";

const Countdown = () => {
  const handleStart = (d) => {
    console.log(d);
  };

  return (
    <div>
      <CountdownHeader onStart={handleStart} />
      <div>Countdown</div>
    </div>
  );
};

export default Countdown;
