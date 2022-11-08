/**
 * Sends a HTTP POST request with the login data to be validated in the server.
 * @author  Johnny
 * @param   {object} loginData contains strings (username, password) holding the login information
 * @return  {Promise} response from the HTTP request indicating status of login attempt
 */
export async function onLogin(loginData) {
    try {
        let res = await fetch("/api/login", {
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
        return res;
    } catch (err) {
        console.log(err.message);
    }
}

/**
 * Sends a HTTP GET request to logout of the system
 * @author  Johnny
 * @return  {Promise} response from the HTTP request indicating status of the logout attempt
 */
export async function onLogout() {
    return await fetch("/api/logout");
}
