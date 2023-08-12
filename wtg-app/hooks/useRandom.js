import { useState } from "react";

export default (min, max, round=false) => {
    const initVal = round ? Math.round(Math.random() * (max-min) + min) : Math.random() * (max-min) + min;
    const [ value, setValue ] = useState(initVal);

    const nextValue = () => {
        const nxtVal = round ? Math.round(Math.random() * (max-min) + min) : Math.random() * (max-min) + min;
        setValue(nxtVal);
    }
    return [ value, nextValue ];
}