import { useEffect, useState } from "react";
import { OperationDashboard } from "./OperationDashboard";
import { OperationRecords } from "./OperationRecords";
import axios from "axios";
import './dashboard.css';

export function Dashboard() {

    const [activeTab, setActiveTab] = useState("operation");
    const [userBalance, setUserBalance] = useState(0);
    const getUserBalance = ()=>{
        const token = localStorage.getItem("token");
        const header = { headers: { Authorization: token } };
        const url = "http://127.0.0.1:5000/v1/users/balance";
        axios.get(url, header)
            .then((response) => {
                if (response.data && response.data.userBalance) {
                    setUserBalance(response.data.userBalance);
                }

            });
    }

    useEffect(getUserBalance, []);

    const updateUserBalance = ()=>{
        getUserBalance();
    }

    return (<>
        <div>
            <div>
                USER BALANCE = {userBalance}
            </div>
            <div className="dashboard">
                <div>
                    <button onClick={() => setActiveTab("operation")}>OPERATION</button>
                </div>
                <div>
                    <button onClick={() => setActiveTab("records")}>RECORDS</button>

                </div>
            </div>
        </div>

        {activeTab == "operation" ?
            <div>
                <OperationDashboard onOperateResult={updateUserBalance}/>
            </div > : <OperationRecords />
        }
    </>);
}