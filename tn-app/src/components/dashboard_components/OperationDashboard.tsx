import { useState } from "react";
import { SelectOperation } from "./SelectedOperation";
import { OPERATIONS } from "../operations/operationRegistries";
import { BDiv, Button } from "bootstrap-4-react";
import "./operationDashboard.css";
import { operationApi } from "../../services";

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

        operationApi(arrayValues, selectedOperation).then((response: any) => {
            if (response.data) {
                setResult(response.data.result);
                props.onOperateResult();
                setArrayValues([])
            }
        }).catch((e: any) => {
            alert("ERROR: " + e.response.data.error);
            console.error(e.response.data.error);
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