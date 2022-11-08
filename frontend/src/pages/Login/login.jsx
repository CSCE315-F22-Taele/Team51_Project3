import React from "react";
import { useState } from "react";
import { onLogin } from "../../components/auth/auth";
import { authenticateUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./login.css";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const [callSwitch, setCallSwitch] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await onLogin(values);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            dispatch(authenticateUser());
            localStorage.setItem("isAuth", "true");
        } catch (err) {
            setError("Invalid credentials, try again!");
        }
    };

    const switchButton = () => {
        if (callSwitch) {
            setCallSwitch(false);
        } else {
            setCallSwitch(true);
        }
    };

    return (
        <div className="home__body">
            <div className="home__main">
                <div
                    className={`box__container box__container--a ${
                        callSwitch ? "left--active" : ""
                    }`}>
                    <form onSubmit={(e) => onSubmit(e)} className="form__container">
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

                        {/* <div style={{ color: "red", margin: "10px 0" }}>{error}</div> */}
                    </form>
                </div>
                <div
                    className={`box__container box__container--b ${
                        callSwitch ? "left--active overlap--active" : ""
                    }`}>
                    <form onSubmit={(e) => onSubmit(e)} className="form__container">
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

                        {/* <div style={{ color: "red", margin: "10px 0" }}>{error}</div> */}
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
