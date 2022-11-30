import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { onLogout } from "../auth/auth";
import React from "react";

const Navbar = () => {
    const { isAuth, type } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [prevScroll, setPrevScroll] = useState(0);
    const [visible, setVisisble] = useState(true);



    const handleScroll = () => {
        const currentScroll = window.scrollY;
        setVisisble(currentScroll < prevScroll);
        setPrevScroll(currentScroll);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScroll, visible, handleScroll]);
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


    // # # # # # # # # # # # # # # # # # # # # #
    // CONTROLS CSS SETTINGS FOR ACCESSIBILITY
    // # # # # # # # # # # # # # # # # # # # # #

    /**
     * @author Will
     * [setColorBlindMode]
     * Changes stylesheet to colorblind friendly palette
     */
    const setColorBlindMode = () => {
        console.log('clicked colorblind');
        var sheet = document.getElementsByTagName('link')[0];

        if (sheet.getAttribute('href') !== 'colorblind.css') 
        {
            sheet.setAttribute('href', 'colorblind.css');
        } 
        else 
        {
            sheet.setAttribute('href', 'index.css');
        }
    };


    /**
     * @author Margaret
     * [setFontZoom]
     * edit this as you need
     */

    const setFontZoom = () => {
        console.log('clicked zoom');

        var sheet = document.getElementsByTagName('link')[0];

        if (sheet.getAttribute('href') !== 'fontZoom.css') 
        {
            sheet.setAttribute('href', 'fontZoom.css');
        } 
        else 
        {
            sheet.setAttribute('href', 'index.css');
        }
    };

    return (
        <nav className="navbar" style={{ top: visible ? "0" : "-60px" }}>
            <NavLink to={isAuth ? "/pospage" : "/"} className="nav--logo">
                <img src={require("../../images/logo.png")} alt="logo of revpos"></img>
            </NavLink>
            {isAuth ? (
                <ul>
                    <li>
                        <NavLink to="/pospage" className="nav--links">
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


            <Dropdown
                trigger={<button className="nav--links">Settings</button>}
                menu={[
                    <button onClick={setColorBlindMode}>Colorblind Mode</button>,
                    <button onClick={setFontZoom}>Font Zoom</button>,
                ]}
            />
        </nav>
    );
};

// # # # # # # # # # # # # # # # # # # # # #
// CONTROLLER FOR THE SETTINGS DROPDOWN MENU
// Shouldn't need to modify this
// # # # # # # # # # # # # # # # # # # # # #
const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            {React.cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {open ? (
                <ul className="drop">
                    {menu.map((menuOption, index) => (
                        <li key={index}>
                            {React.cloneElement(menuOption, {
                                onClick: () => {
                                    menuOption.props.onClick();
                                    setOpen(false);
                                },
                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Navbar;
