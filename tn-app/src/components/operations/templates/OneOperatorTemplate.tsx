import { useState } from "react";
import { Form } from "bootstrap-4-react";

export const OneOperatorTemplate = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined,
        symbol: string;
    }) => {
    const [value1, setValue1] = useState(0);

    const handleChangeValue1 = (e: any) => {
        setValue1(e.target.value);
        props.registerValues([e.target.value]);
    };


    return <>
        <div>
            {props.symbol}
            <Form.Input value={value1}
                onChange={handleChangeValue1}
                placeholder="Value 1" />🟰
            <>{props.result ? props.result : "?"}</>
        </div>
    </>;
};