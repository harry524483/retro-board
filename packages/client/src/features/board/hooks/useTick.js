import { useEffect, useState } from 'react';

const useTick = ({ minutes, seconds, onReset }) => {
  const [[min, sec], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (min === 0 && sec === 0) {
      onReset();
    } else if (sec === 0) {
      setTime([min - 1, 59]);
    } else {
      setTime([min, sec - 1]);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return { min, sec };
};

export default useTick;
