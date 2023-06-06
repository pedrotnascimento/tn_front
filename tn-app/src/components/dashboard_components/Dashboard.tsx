import { OperationDashboard } from "./OperationDashboard";
import { OperationRecords } from "./OperationRecords";
import './dashboard.css';

export function Dashboard() {
    const userBalance = 10;
    const active = "operation";
    return (<>
        <div>
            <div>
                USER BALANCE = {userBalance}
            </div>
            <div className="dashboard">
                <div>
                    MAKE AN OPERATION NOW!
                </div>
                <div>
                    SEE YOUR RECORDS!
                </div>
            </div>
        </div>

        {active == "operation" ?
            <div>
                <OperationDashboard />
            </div> : <OperationRecords />
        }
    </>);
}