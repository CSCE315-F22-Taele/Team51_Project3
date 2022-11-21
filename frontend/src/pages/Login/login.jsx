import React from "react";
import { useState } from "react";
import { onLogin, onRegister } from "../../components/auth/auth";
import { authenticateUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./login.css";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState(false);
    const [callSwitch, setCallSwitch] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();
    const onLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await onLogin(values);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            dispatch(authenticateUser());
            localStorage.setItem("isAuth", "true");
        } catch (err) {
            setMessage("Invalid credentials, try again!");
        }
    };

    const onRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await onRegister(values);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            setMessage(res.message);
            setValues({ username: "", password: "" });
        } catch (err) {
            setMessage("Sign up was unsuccessful.");
        }
    };

    const switchButton = () => {
        if (callSwitch) {
            setCallSwitch(false);
        } else {
            setCallSwitch(true);
        }
        setTimeout(function () {
            setValues({
                username: "",
                password: "",
            });
            setMessage(false);
        }, 250)
    };

    return (
        <div className="home__body">
            <div className="home__main">
                <div
                    className={`box__container box__container--a ${
                        callSwitch ? "left--active" : ""
                    }`}>
                    <form onSubmit={(e) => onLoginSubmit(e)} className="form__container">
                        <h1 className="form__header">Login</h1>
                        <input
                            className="form--input"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            name="username"
                            value={values.username}
                            placeholder="Username"
                            required
                        />
                        <input
                            className="form--input"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            value={values.password}
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="button submit">
                            LOGIN
                        </button>
                        <div className="description status-message">{message}</div>
                    </form>
                </div>
                <div
                    className={`box__container box__container--b ${
                        callSwitch ? "left--active overlap--active" : ""
                    }`}>
                    <form
                        onSubmit={(e) => onRegisterSubmit(e)}
                        className="form__container">
                        <h1 className="form__header">Register</h1>
                        <input
                            className="form--input"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            name="username"
                            value={values.username}
                            placeholder="Username"
                            required
                        />
                        <input
                            className="form--input"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            value={values.password}
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="button submit">
                            SIGN UP
                        </button>
                        <div className="description status-message">{message}</div>
                    </form>
                </div>
                <div
                    className={`switch ${callSwitch ? "right--active" : ""}`}
                    id="switch-cnt">
                    <div
                        className={`neumo-circle" ${
                            callSwitch ? "right--active" : ""
                        }`}></div>
                    <div
                        className={`neumo-circle neumo-circle--active ${
                            callSwitch ? "right--active" : ""
                        }`}></div>
                    <div
                        className={`switch__container ${callSwitch ? "hidden" : ""}`}
                        id="switch-c1">
                        <h2 className="switch__title title">NOT A USER ?</h2>
                        <p className="switch__description description">
                            Create an account and start a journey with us, the future to
                            dining!
                        </p>
                        <button className="switch__button button" onClick={switchButton}>
                            JOIN NOW
                        </button>
                    </div>
                    <div
                        className={`switch__container ${callSwitch ? "" : "hidden"}`}
                        id="switch-c2">
                        <h2 className="switch__title title">WELCOME BACK</h2>
                        <p className="switch__description description">
                            Already have an account? Login now to continue where you left
                            off.
                        </p>
                        <button className="switch__button button" onClick={switchButton}>
                            LOGIN NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
=======
/* eslint-disable no-restricted-globals */
import React from "react";
import { useState } from "react";
import { onLogin, onRegister } from "../../components/auth/auth";
import { authenticateUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./login.css";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState(false);
    const [callSwitch, setCallSwitch] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await fetch("api/auth/user", {
                credentials: "include",
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    dispatch(authenticateUser());
                    localStorage.setItem("isAuth", "true");
                });
        } catch (err) {
            console.log("[ERROR] User is not Authenticated");
        }
    };

    const openGoogle = () => {
        const googleAuthURL = "http://localhost:3001/api/login/google";

        // Process for Determining Window Center Placement
        // Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
        const dScreenLeft =
            window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dScreenTop =
            window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
        const height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - 500) / 2 / systemZoom + dScreenLeft;
        const top = (height - 600) / 2 / systemZoom + dScreenTop;

        const authWindow = window.open(
            googleAuthURL,
            "_blank",
            `scrollbars=yes, 
            width=${500 / systemZoom}, 
            height=${600 / systemZoom}, 
            top=${top}, left=${left}`
        );
        if (window.focus) {
            authWindow.focus();
        }

        // If there's a Google SSO Window, check when it's closed.
        if (authWindow) {
            let timer = setInterval(() => {
                if (authWindow.closed) {
                    fetchUser();
                    if (timer) {
                        clearInterval(timer);
                    }
                }
            }, 500);
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    // Local Login Submit
    const onLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await onLogin(values);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            dispatch(authenticateUser());
            localStorage.setItem("isAuth", "true");
        } catch (err) {
            setMessage("Invalid credentials, try again!");
        }
    };

    // Local Register Submit
    const onRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await onRegister(values);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            setMessage(res.message);
            setValues({ username: "", password: "" });
            switchButton();
        } catch (err) {
            setMessage("Sign up was unsuccessful.");
        }
    };

    const switchButton = () => {
        if (callSwitch) {
            setCallSwitch(false);
        } else {
            setCallSwitch(true);
        }
        setTimeout(function () {
            setValues({
                username: "",
                password: "",
            });
            setMessage(false);
        }, 250);
    };

    return (
        <div className="home__body">
            <div className="home__main">
                <div
                    className={`box__container box__container--a ${
                        callSwitch ? "left--active" : ""
                    }`}
                >
                    <form onSubmit={(e) => onLoginSubmit(e)} className="form__container">
                        <h1 className="form__header">Login</h1>
                        <input
                            className="form--input"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            name="username"
                            value={values.username}
                            placeholder="Username"
                            required
                        />
                        <input
                            className="form--input"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            value={values.password}
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="button submit">
                            LOGIN
                        </button>
                        <div className="description status-message">{message}</div>
                    </form>
                    <div onClick={openGoogle}>
                        <button>Google</button>
                    </div>
                </div>
                <div
                    className={`box__container box__container--b ${
                        callSwitch ? "left--active overlap--active" : ""
                    }`}
                >
                    <form
                        onSubmit={(e) => onRegisterSubmit(e)}
                        className="form__container"
                    >
                        <h1 className="form__header">Register</h1>
                        <input
                            className="form--input"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            name="username"
                            value={values.username}
                            placeholder="Username"
                            required
                        />
                        <input
                            className="form--input"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => onChange(e)}
                            value={values.password}
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="button submit">
                            SIGN UP
                        </button>
                        <div className="description status-message">{message}</div>
                    </form>
                </div>
                <div
                    className={`switch ${callSwitch ? "right--active" : ""}`}
                    id="switch-cnt"
                >
                    <div
                        className={`neumo-circle" ${callSwitch ? "right--active" : ""}`}
                    ></div>
                    <div
                        className={`neumo-circle neumo-circle--active ${
                            callSwitch ? "right--active" : ""
                        }`}
                    ></div>
                    <div
                        className={`switch__container ${callSwitch ? "hidden" : ""}`}
                        id="switch-c1"
                    >
                        <h2 className="switch__title title">NOT A USER ?</h2>
                        <p className="switch__description description">
                            Create an account and start a journey with us, the future to
                            dining!
                        </p>
                        <button className="switch__button button" onClick={switchButton}>
                            JOIN NOW
                        </button>
                    </div>
                    <div
                        className={`switch__container ${callSwitch ? "" : "hidden"}`}
                        id="switch-c2"
                    >
                        <h2 className="switch__title title">WELCOME BACK</h2>
                        <p className="switch__description description">
                            Already have an account? Login now to continue where you left
                            off.
                        </p>
                        <button className="switch__button button" onClick={switchButton}>
                            LOGIN NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
