import { useState } from 'react';
import './selectedOperation.css';
import { Form } from "bootstrap-4-react";

export const SelectOperation = (props: {
    onSelectOperation: (val: string) => void,
    operations: Map<string, { type: string, name: string, getWidget: any; }>;
}) => {
    const [selected, setSelected] = useState("");

    const handleSelectChange = (e: any) => {
        const selected = e.target.value;
        props.onSelectOperation(selected);
        setSelected(selected);
    };
    return (
        <Form.Select value={selected} className="selected-operation" onChange={handleSelectChange}>
            <option value={""}>Select</option>
            {
                Array.from(props.operations).map(op => {
                    return <option key={op[0]} value={op[0]}>{op[1].name}</option>;
                })
            }
        </Form.Select>
    );
};