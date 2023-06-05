import { useState } from "react"
import axios from 'axios';


export function Login(props: any) {
    const [user, setUser] = useState({ username: "", password: "" });
    
    const handleUsernameChange = (e: any) => {
        setUser({ ...user, username: e.target.value })
    }

    const handlePasswordChange = (e: any) => {
        setUser({ ...user, password: e.target.value })
    }

    const sendRequest = () => {
        const url = "http://127.0.0.1:5000/v1/authenticate";

        axios.post(url, user)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token)
                    props.onLogged();
                }
            })
            .catch((error) => {
                console.error('Ocorreu um erro:', error);
            });
    }

    return (
        <>
            <div>
                <label >Username</label>
                <input value={user.username} onChange={handleUsernameChange} />
            </div>
            <div>
                <label >Password</label>
                <input value={user.password} onChange={handlePasswordChange} />
            </div>
            <div>
                <button onClick={sendRequest}>Login</button>
            </div>
        </>
    );
}