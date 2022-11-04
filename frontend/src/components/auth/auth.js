export async function onLogin(loginData) {
    return await fetch("/api/login", {
        method: "POST",
        credentials: 'include'
    });
}
