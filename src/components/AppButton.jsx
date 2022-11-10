import React from "react";

const AppButton = ({type, handle}) => {

    const classArr = ['btn'];

    if (type === 'start') {
        classArr.push('start-btn');
    } else if (type === 'pause') {
        classArr.push('pause-btn');
    } else if (type === 'stop') {
        classArr.push('stop-btn');
    }

    return (
        <button onClick={handle} className={classArr.join(' ')}></button>
    )
};

export default AppButton;