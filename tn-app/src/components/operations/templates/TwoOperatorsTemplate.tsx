import { useState } from "react";
import { Form } from "bootstrap-4-react";

export const TwoOperatorsTemplate = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined,
        symbol: string;
    }) => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    const handleChangeValue1 = (e: any) => {
        setValue1(e.target.value);
        props.registerValues([e.target.value, value2]);
    };

    const handleChangeValue2 = (e: any) => {
        setValue2(e.target.value);
        props.registerValues([value1, e.target.value]);
    };

    return <>
        <div>
            <Form.Input value={value1}
                onChange={handleChangeValue1}
                placeholder="Value 1" />
            {props.symbol}
            <Form.Input value={value2}
                onChange={handleChangeValue2}
                placeholder="Value 2" />
            🟰
            <>{props.result ? props.result : "?"}</>
        </div>
    </>;
};