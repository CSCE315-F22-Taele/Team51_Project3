import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import GoogleMaps from "../../components/googleMaps/GoogleMap";
import "./modal.css";

function CheckoutModal({ closeModal }) {
    const [delivery, setDelivery] = useState(false);
    const { type } = useSelector((state) => state.auth);

    return type["type"] !== "user" ? (
        <div className="checkout-modal">
            <div className="checkout-modal__container">
                <button
                    className="exit"
                    onClick={() => {
                        closeModal(false);
                        setDelivery(false);
                    }}>
                    X
                </button>
                {delivery ? (
                    <div className="options-maps">
                        <GoogleMaps />
                    </div>
                ) : (
                    <div className="checkout-modal-options">
                        <div
                            className="options-here modal-options"
                            onClick={() => {
                                closeModal(false);
                                setDelivery(false);
                                alert("Order Successful");
                            }}>
                            Dine In
                        </div>
                        <div
                            className="options-togo modal-options"
                            onClick={() => setDelivery(true)}>
                            Delivery
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="checkout-modal">
            <div className="checkout-modal__container">
                <button
                    className="exit"
                    onClick={() => {
                        closeModal(false);
                        setDelivery(false);
                    }}>
                    X
                </button>
                <div className="checkout-modal-options">
                    <div
                        className="options-confirm modal-options"
                        onClick={() => {
                            closeModal(false);
                            setDelivery(false);
                            alert("Order Successful");
                        }}>
                        Confirm Order
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutModal;
