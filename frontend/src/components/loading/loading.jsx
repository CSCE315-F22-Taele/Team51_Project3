import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";

const Loading = () => {
    const navigate = useNavigate();
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
