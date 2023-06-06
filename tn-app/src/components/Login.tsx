import { useState } from "react";
import axios from 'axios';


export const Login = (props: { onLogged: () => void; }) => {
    const [user, setUser] = useState({ username: "", password: "" });

    const handleUsernameChange = (e: any) => {
        setUser({ ...user, username: e.target.value });
    };

    const handlePasswordChange = (e: any) => {
        setUser({ ...user, password: e.target.value });
    };

    const login = (e: any) => {
        e.preventDefault();
        const url = "http://127.0.0.1:5000/v1/authenticate";

        axios.post(url, user)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    props.onLogged();
                }
            })
            .catch((error) => {
                console.error('Ocorreu um erro:', error);
            });
    };

    return (
        <>
            <form onSubmit={login} >
                <div>
                    <label >Username</label>
                    <input value={user.username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label >Password</label>
                    <input value={user.password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </>
    );
};