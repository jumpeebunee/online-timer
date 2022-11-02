import React from "react";
import cl from "./AppInput.module.css";

const AppInput = (props) => {
    return(
        <input {...props} type="number" className={cl.input}/>
    );
};

export default AppInput;