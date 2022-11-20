import React from "react";
import { useNavigate } from "react-router-dom";
import inventoryImg from "../../images/inventory.png";
import boxImg from "../../images/orderHistory.png";
import excessReportImg from "../../images/excess.png";
import statButton from "../../images/statsbutton.png";
import restockButton from "../../images/restock.png";
import revenueButton from "../../images/revenue.jpg";
import menuButton from "../../images/editMenu.png";
import backbutton from "../../images/backbutton.png"
import "./managerStyle.css";

export default function ManagerPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button>
          <img
            onClick={() => {
              navigate("/")
            }}
              className="backbutton"
              src={backbutton}
              alt="back">
          </img>
        </button>
      </div>
      <button>
        <img
          onClick={() => {
            navigate("/Inventory");
          }}
          className="statButton"
          src={inventoryImg}
          alt="Manage Inventory"
        ></img>
        Manage Inventory
      </button>
      <button
        onClick={() => {
          navigate("/OrderHistory");
        }}
      >
        <img className="statButton" src={boxImg} alt="Order History"></img>Order
        History
      </button>
      <button onClick={() => navigate("/Excess")}>
        <img
          className="statButton"
          src={excessReportImg}
          alt="Excess Report"
        ></img>
        Excess Report
      </button>
      <button
        onClick={() => {
          navigate("/Pair");
        }}
      >
        <img className="statButton" src={statButton} alt="Pair Report"></img>
        Pair Report
      </button>
      <button
        onClick={() => {
          navigate("/Restock");
        }}
      >
        <img
          className="statButton"
          src={restockButton}
          alt="Restock Report"
        ></img>
        Restock Report
      </button>
      <button
        onClick={() => {
          navigate("/Revenue");
        }}
      >
        <img
          className="statButton"
          src={revenueButton}
          alt="Sales Report"
        ></img>
        Sales Report
      </button>
      <button
        onClick={() => {
          navigate("/EditMenu");
        }}
      >
        <img
          className="statButton"
          src={menuButton}
          alt="Menu Functions"
        ></img>
        Menu Functions
      </button>
    </div>
  );
}
