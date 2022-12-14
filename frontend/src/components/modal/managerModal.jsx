import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyPermission } from "../../redux/slices/authSlice";

const ManagerModal = ({ verifyManager }) => {
    const [values, setValues] = useState({
        userid: "",
    });
    const [message, setMessage] = useState(false);
    const { type, permission } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (type["type"] === "manager") {
            dispatch(verifyPermission());
        }
        if (permission) {
            verifyManager(true);
        }
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        fetch("api/get-managers").then((response) => {
            response.json().then((data) => {
                data["managers"].map((id) => {
                    if (JSON.stringify(id) === JSON.stringify(values)) {
                        dispatch(verifyPermission());
                        verifyManager(true);
                        return;
                    }
                });
            });
        });
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}
            className="form__container">
            <h1 className="form__header">MANAGER LOGIN</h1>
            <input
                className="form--input"
                type="password"
                autoComplete="off"
                onChange={(e) => onChange(e)}
                value={values.password}
                name="userid"
                required
            />
            <button type="submit" className="button submit">
                LOGIN
            </button>
            <div className="description status-message">{message}</div>
        </form>
    );
};

export default ManagerModal;
