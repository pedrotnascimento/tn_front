import { Form, Button } from 'bootstrap-4-react';


export function Logout(props: { onLogout: () => void }) {
    const logout = () => {
        localStorage.removeItem("token");
        props.onLogout();
    }

    return (
        <div>
            <Button danger  onClick={logout}>Logout</Button>
        </div>
    );
}