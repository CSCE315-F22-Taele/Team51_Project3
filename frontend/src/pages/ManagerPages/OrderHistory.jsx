import React from 'react'
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

const OrderHistory = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div>
        <button>
          <img
            onClick={() => {
             navigate("/ManagerMenu")
            }}
            className="backbutton"
            src={backbutton}
            alt="back">
          </img>
        </button>
      </div>
      OrderHistory
    </div>
  )
}

export default OrderHistory;