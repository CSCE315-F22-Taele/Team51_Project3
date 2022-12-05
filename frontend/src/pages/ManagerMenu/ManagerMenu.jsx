import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ManagerModal from "../../components/modal/managerModal";
import "./managerMenu.css";

export default function ManagerMenu() {
    const { type } = useSelector((state) => state.auth);
    const userType = type["type"];
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    //
    const verifyManager = (status) => {
        if (userType === "manager" || status) {
            setVerified(true);
        }
    };

    useEffect(() => {
        verifyManager(false);
    }, [])

    return (
        <div id="manager-menu">
            <div className="back__container">
                <button
                    onClick={() => {
                        navigate("/pospage");
                    }}>
                    <img
                        className="backbutton"
                        src={require("../../images/backbutton.png")}
                        alt="back"></img>
                </button>
            </div>
            {verified ? (
                <div className="manager-menu-buttons">
                    <button>
                        <img
                            onClick={() => {
                                navigate("/Inventory");
                            }}
                            src={require("../../images/inventory.png")}
                            alt="Manage Inventory"></img>
                        <p>Manage Inventory</p>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/OrderHistory");
                        }}>
                        <img
                            className="statButton"
                            src={require("../../images/orderhistory.png")}
                            alt="Order History"></img>
                        <p>Order History</p>
                    </button>
                    <button onClick={() => navigate("/Excess")}>
                        <img
                            src={require("../../images/excess.png")}
                            alt="Excess Report"></img>
                        <p>Excess Report</p>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/Pair");
                        }}>
                        <img
                            src={require("../../images/pair.png")}
                            alt="Pair Report"></img>
                        <p>Pair Report</p>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/Revenue");
                        }}>
                        <img
                            src={require("../../images/revenue.png")}
                            alt="Revenue Report"></img>
                        <p>Revenue</p>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/EditMenu");
                        }}>
                        <img
                            src={require("../../images/menufunctions.png")}
                            alt="Menu Functions"></img>
                        <p>Menu Functions</p>
                    </button>
                </div>
            ) : (
                <ManagerModal verifyManager={verifyManager}></ManagerModal>
            )}
        </div>
    );
}
