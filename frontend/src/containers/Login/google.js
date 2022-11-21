import React, { useEffect } from "react";

export function LoginSuccess() {
    useEffect(() => {
        if (window.location.pathname === "/login/success") {
            window.close();
        }
    }, []);
}
