import { useState } from "react";
import { DivisionOperation } from "../operations/DivisionOperation";
import { SelectOperation } from "./SelectedOperation";
import axios from "axios";
import { OPERATIONS } from "../operations/operationRegistries";

export const OperationDashboard = (props: {
    onOperateResult: () => void;
}) => {
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


    return <>
        <SelectOperation
            onSelectOperation={handleOperationChange}
            operations={OPERATIONS}
        />
        {OPERATIONS.get(selectedOperation) ?
            OPERATIONS.get(selectedOperation)(registerValues, result) :
            ""}
        <div>
            <button onClick={operate}>Operate</button>
        </div>
    </>;
};