import { useEffect, useState } from "react";
import getPadTime from "./helpers/getPadTime";

function App() {

  const [timeLeft, setTimeLeft] = useState(3200);
  const [isCounting, setIsCounting] = useState(false);
  const [newTime, setNewTime] = useState({hours: '0', minutes: '59', seconds: '20'})

  let minutes = getPadTime(Math.floor(timeLeft / 60));
  const hours = getPadTime(Math.floor(minutes / 60));
  minutes = getPadTime(minutes - (hours * 60));
  const seconds = getPadTime(Math.floor(timeLeft - ((hours * 60) * 60) - (minutes * 60)));

  const handleStart = () => {
    let total = ((newTime.hours * 60) * 60) + (newTime.minutes * 60) + +newTime.seconds;
    setTimeLeft(total);
    setIsCounting(true);
  };

  const handleStop = () => {

  };

  const handleReset = () => {

  };

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
        setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0);
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  }, [isCounting]);

  function changeTime(input) {
    if (input.target.id === 'minutes') {
      setNewTime({...newTime, minutes: input.target.value})
    } else if (input.target.id === 'seconds') {
      setNewTime({...newTime, seconds: input.target.value})
    } else {
      setNewTime({...newTime, hours: input.target.value})
    }
  };

  return (
    <div className="App">
        {isCounting 
        ?
        <div className="timer-active">
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
        :
        <div className="timer">
          <input id="hours" onChange={(e) => changeTime(e)} value={newTime.hours} type="number" min="0" max="99" placeholder="00"/>
          <span>:</span>
          <input id="minutes" onChange={(e) => changeTime(e)} value={newTime.minutes} type="number" min="0" max="59" placeholder="00"/>
          <span>:</span>
          <input id="seconds" onChange={(e) => changeTime(e)} value={newTime.seconds} type="number" min="0" max="59" placeholder="00"/>
        </div>
        }
        <button onClick={handleStart}>Start</button>
        <button>Pause</button>
        <button>End</button>
    </div>
  );
}

export default App;
