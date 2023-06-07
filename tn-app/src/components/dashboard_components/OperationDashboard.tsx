import { useState } from "react";
import { SelectOperation } from "./SelectedOperation";
import axios from "axios";
import { OPERATIONS } from "../operations/operationRegistries";
import { BDiv, Button } from "bootstrap-4-react";
import "./operationDashboard.css";

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


    return <div className="operation-widgets">
        <BDiv display="flex" justifyContent="center">
            <SelectOperation
                onSelectOperation={handleOperationChange}
                operations={OPERATIONS}
            />
        </BDiv>

        <BDiv p={2} display="flex" flex="column" >
            {OPERATIONS.get(selectedOperation) ?
                OPERATIONS.get(selectedOperation)?.getWidget(registerValues, result) :
                ""}
        </BDiv>
        <div className="operate-button">
            <Button primary onClick={operate}>Operate</Button>
        </div>
    </div>;
};