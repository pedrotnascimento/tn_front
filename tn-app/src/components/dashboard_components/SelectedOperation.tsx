import { useState } from 'react';
import './selectedOperation.css';

export const SelectOperation = (props: {
    onSelectOperation: (val: string) => void,
    operations: Map<string, () => void>;
}) => {
    const [selected, setSelected] = useState("");
    const handleSelectChange = (e: any) => {
        const selected = e.target.value;
        props.onSelectOperation(selected);
        setSelected(selected);
    };
    return (
        <select value={selected} className="selected-operation" onChange={handleSelectChange}>
            <option value={""}>Select</option>
            {
                Array.from(props.operations).map(op => {
                    return <option key={op[0]} value={op[0]}>{op[0]}</option>;
                })
            }
        </select>
    );
};