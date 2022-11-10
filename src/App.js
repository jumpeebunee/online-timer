import { useEffect, useState } from "react";
import AppButton from "./components/AppButton";
import TimerCounting from "./components/TimerCounting";
import TimerInputsChange from "./components/TimerInputsChange";
import getPadTime from "./helpers/getPadTime";

function App() {

  const [timeLeft, setTimeLeft] = useState(3200);
  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newTime, setNewTime] = useState({hours: '', minutes: '05', seconds: ''})

  let minutes = getPadTime(Math.floor(timeLeft / 60));
  let hours = getPadTime(Math.floor(minutes / 60));
  minutes = getPadTime(minutes - (hours * 60));
  let seconds = getPadTime(Math.floor(timeLeft - ((hours * 60) * 60) - (minutes * 60)));

  const handleStart = () => {
    if (+newTime.minutes > 59 || +newTime.seconds > 59) {
      setIsError(true);
      return;
    }
    let total = ((newTime.hours * 60) * 60) + (newTime.minutes * 60) + +newTime.seconds;
    setTimeLeft(total);
    setIsError(false);
    setIsCounting(true);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleClear = () => {
    setTimeLeft(0);
    setNewTime({hours: '', minutes: '05', seconds: ''});
    setIsPaused(false);
    setIsCounting(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && !isPaused &&
        setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0);
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  }, [isCounting, isPaused]);

  function changeTime(input) {
    const inputTaget = input.target;

    if (inputTaget.value.length === 3) return;
    if (inputTaget.id === 'minutes') {
      setNewTime({...newTime, minutes: inputTaget.value})
    } else if (inputTaget.id === 'seconds') {
      setNewTime({...newTime, seconds: inputTaget.value})
    } else {
      setNewTime({...newTime, hours: inputTaget.value})
    };
  };

  function validateInputs(e) {
    if (e.target.value === '0' || e.target.value === '00' || e.target.value === '')  {
      e.target.value = '';
    } else {
      e.target.value = String(e.target.value).padStart(2, '0');
    }
    changeTime(e);
  };

  return (
    <div className="App">
      <div className="timer">
        {isError 
          ?
            <div className="timer-error">The value must be less than or equal to 59 </div>
          :
            <div></div>
          }
          {isCounting || isPaused
          ?
            <TimerCounting
              minutes={minutes}
              seconds={seconds}
              hours={hours}
            />
          :
            <TimerInputsChange
              changeTime={changeTime}
              newTime={newTime}
              validateInputs={validateInputs}
            />
          }
          { 
            (isCounting && !isPaused)  ? <AppButton type="pause" handle={handlePause}></AppButton> :
            (isCounting && isPaused) ? <div className="controls"><AppButton type="stop" handle={handleClear}></AppButton><AppButton type="start" handle={handlePause}></AppButton></div> :
            <AppButton type="start" handle={handleStart}></AppButton>
          }
      </div>
    </div>
  );
}

export default App;
