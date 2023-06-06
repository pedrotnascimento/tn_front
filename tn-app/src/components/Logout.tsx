import { useCallback, useState } from "react"

export function Logout(props: { onLogout: () => void }) {
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