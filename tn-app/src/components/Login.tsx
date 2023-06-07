import { useState } from "react";
import { Form, Alert } from "bootstrap-4-react";
import "./login.css";
import { loginApi } from "../services";

export const Login = (props: { onLogged: () => void; }) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [errorOnLogin, setErrorOnLogin] = useState(false);

    const handleUsernameChange = (e: any) => {
        setUser({ ...user, username: e.target.value });
    };

    const handlePasswordChange = (e: any) => {
        setUser({ ...user, password: e.target.value });
    };

    const login = (e: any) => {
        e.preventDefault();
        setErrorOnLogin(false);
        loginApi(user).then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                props.onLogged();
            }
        }).catch((error) => {
            console.error('Ocorreu um erro:', error);
            setErrorOnLogin(true);
        });
    };

    return (

        <div className="login-container">
            <p>Loggin below</p>
            <Form onSubmit={login} >
                <div>
                    <label >Username</label>
                    <Form.Input value={user.username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label >Password</label>
                    <Form.Input value={user.password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <Form.Input primary type="submit" value="Login" />
                </div>
            </Form>
            {errorOnLogin && <Alert danger>Wrong password or username</Alert>}
        </div>

    );
};