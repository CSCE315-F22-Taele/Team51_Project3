import { useState } from "react";
import { onLogin } from "../../components/auth/auth";
import { authenticateUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Login() {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await onLogin(values);
            dispatch(authenticateUser());
        } catch (err) {
            console.log("ERROR");
            setError(err);
        }
    };

    return (
        <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
            <h1>Login</h1>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Username
                </label>
                <input
                    onChange={(e) => onChange(e)}
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={values.username}
                    placeholder=""
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    onChange={(e) => onChange(e)}
                    type="password"
                    value={values.password}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="passwod"
                    required
                />
            </div>

            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default Login;
