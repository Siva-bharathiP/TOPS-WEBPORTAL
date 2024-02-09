import { useState } from "react";
import React from "react";

function Count(){
    const [count, setCount]= useState(0);

    const increase = () => {
        setCount(count+1);
    };
    return(
        <div>
            <h1>Count</h1>
            <p>Count: {count}</p>
            <button type="submit" onClick={increase}>Increase</button>
        </div>
    );
};
export default Count;