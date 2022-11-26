import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { onLogout } from "../auth/auth";

const Navbar = () => {
    const { isAuth, type } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /**
     * [Logout] Request a log out from the user, unauthenticating them from the system
     * @author  Johnny
     */
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
        <nav className="navbar">
            <NavLink to="/" className="nav--logo">
                <img src={require("../../images/logo.png")} alt="logo of revpos"></img>
            </NavLink>
            {isAuth ? (
                <ul>
                    <li>
                        <NavLink to="/POSPage" className="nav--links">
                            <span>POS</span>
                        </NavLink>
                    </li>
                    <li className={type["type"] === "manager" ? "" : "hidden"}>
                        <NavLink to="/ManagerMenu" className="nav--links">
                            <span>Manager</span>
                        </NavLink>
                    </li>
                    <li>
                        <button className="nav--links" onClick={() => logout()}>
                            Logout
                        </button>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <NavLink to="/" className="nav--links">
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className="nav--links">
                            <span>Login</span>
                        </NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
