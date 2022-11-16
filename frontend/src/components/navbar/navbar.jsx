import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { onLogout } from "../auth/auth";

const Navbar = () => {
    const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await onLogout();
            dispatch(unauthenticateUser());
            localStorage.removeItem("isAuth");
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <div>
                    <NavLink to="/">
                        <span className="navbar-brand mb-0 h1">Home</span>
                    </NavLink>
                </div>

                {isAuth ? (
                    <div>
                        <NavLink to="/POSPage" className="mx-3">
                            <span>POS</span>
                        </NavLink>
                        <NavLink to="/ManagerMenu" className="mx-3">
                            <span>Manager</span>
                        </NavLink>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <NavLink to="/login">
                            <span>Login</span>
                        </NavLink>

                        <NavLink to="/register" className="mx-3">
                            <span>Register</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
