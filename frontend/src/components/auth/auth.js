export async function onLogin(loginData) {
    return await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify({
            username: loginData.username,
            password: loginData.password,
        }),
    });
}

export async function onLogout() {
    return await fetch("/api/logout");
}
