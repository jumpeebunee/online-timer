import React from "react"
import TimerDots from "./UI/TimerDots/TimerDots";
import CountingNumber from "./CountingNumber";

const TimerCounting = ({hours, minutes, seconds}) => {
    return (
        <div className="timer-active">
            <CountingNumber num={hours}/>
            <TimerDots/>
            <CountingNumber num={minutes}/>
            <TimerDots/>
            <CountingNumber num={seconds}/>
        </div>
    );
};

export default TimerCounting;