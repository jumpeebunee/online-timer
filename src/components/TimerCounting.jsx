import React from "react"

const TimerCounting = ({hours, minutes, seconds}) => {
    return (
        <div className="timer-active">
            <span>{hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </div>
    );
};

export default TimerCounting;