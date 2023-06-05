import { useCallback, useState } from "react"

export function Logout(props: any) {
    const logout = () => {
        localStorage.removeItem("token");
        props.onLogout();
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}