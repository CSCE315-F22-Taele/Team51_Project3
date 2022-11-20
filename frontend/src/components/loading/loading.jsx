import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";

const Loading = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(function () {
            navigate("/POSPage");
        }, 750);
    });
    return (
        <div className="loading__container">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
