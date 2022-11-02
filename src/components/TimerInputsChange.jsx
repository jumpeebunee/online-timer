import React from "react";
import AppInput from "./UI/AppInput/AppInput";
import TimerDots from "./UI/TimerDots/TimerDots";

const TimerInputsChange = ({changeTime, newTime, validateInputs}) => {
    return (
        <div className="timer__change">
            <AppInput id="hours" onChange={(e) => changeTime(e)} value={newTime.hours} onBlur={(e) => validateInputs(e)} type="number" min="0" max="99" placeholder="00"/>
            <TimerDots />
            <AppInput id="minutes" onChange={(e) => changeTime(e)} value={newTime.minutes} onBlur={(e) => validateInputs(e)} type="number" min="0" max="59" placeholder="00"/>
            <TimerDots/>
            <AppInput id="seconds" onChange={(e) => changeTime(e)} value={newTime.seconds} onBlur={(e) => validateInputs(e)} type="number" min="0" max="59" placeholder="00"/>
        </div>
    );
};

export default TimerInputsChange;