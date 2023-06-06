import { useState } from "react";
import { AdditionOperation } from "../operations/AdditionOperation";
import { SelectOperation } from "./SelectedOperation";
import axios from "axios";

export const OperationDashboard = (props: {
    onOperateResult: () => void;
}) => {
    const operations = new Map<string, any>();
    const [arrayValues, setArrayValues] = useState<object[] | undefined>([]);
    const [result, setResult] = useState<object | undefined>(undefined);
    const [selectedOperation, setSelectedOperation] = useState("");

    const handleOperationChange = (val: string) => {
        setSelectedOperation(val);
        setResult(undefined);
    };
    const registerValues = (o: object[] | undefined): void => {
        setArrayValues(o);
    };

    const operate = () => {
        const url = "http://127.0.0.1:5000/v1/operations";
        const data = {
            arguments: arrayValues,
            operationType: selectedOperation
        };
        const token = localStorage.getItem("token");
        const headers = {
            headers: {
                'Authorization': token
            }
        };
        axios.post(url, data, headers).then((response: any) => {
            if (response.data) {
                setResult(response.data.result);
                props.onOperateResult();

            }
        });
    };

    operations.set("addition", <AdditionOperation
        registerValues={registerValues}
        result={result} />);

    return <>
        <SelectOperation
            onSelectOperation={handleOperationChange}
            operations={operations}
        />
        {operations.get(selectedOperation)}
        <div>
            <button onClick={operate}>Operate</button>
        </div>
    </>;
};