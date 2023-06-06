import { useEffect, useState } from "react";
import { OperationDashboard } from "./OperationDashboard";
import { OperationRecords } from "./OperationRecords";
import axios from "axios";
import { Button, BDiv } from "bootstrap-4-react";
import './dashboard.css';

export function Dashboard() {

    const [activeTab, setActiveTab] = useState("operation");
    const [userBalance, setUserBalance] = useState(0);
    const getUserBalance = () => {
        const token = localStorage.getItem("token");
        const header = { headers: { Authorization: token } };
        const url = "http://127.0.0.1:5000/v1/users/balance";
        axios.get(url, header)
            .then((response) => {
                if (response.data && response.data.userBalance) {
                    setUserBalance(response.data.userBalance);
                }

            });
    };

    useEffect(getUserBalance, []);

    const updateUserBalance = () => {
        getUserBalance();
    };

    return (<>
        <div>
            <div>
                USER BALANCE = {userBalance}
            </div>
            <BDiv p={2} display="flex" justifyContent="start">
                <div className="button-tab">
                    <Button primary onClick={() => setActiveTab("operation")}>OPERATION</Button>
                </div>
                <div className="button-tab">
                    <Button primary onClick={() => setActiveTab("records")}>RECORDS</Button>
                </div>
            </BDiv>
        </div>

        {activeTab === "operation" ?
            <div>
                <OperationDashboard onOperateResult={updateUserBalance} />
            </div > : <OperationRecords />
        }
    </>);
}