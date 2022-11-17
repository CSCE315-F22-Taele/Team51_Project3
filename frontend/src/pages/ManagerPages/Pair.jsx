import React from 'react'
import { useNavigate } from "react-router-dom";
import backbutton from "../../images/backbutton.png";

const Pair = () => {
  const navigate = useNavigate();
  return (

    <div className='App'>
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
      Pair
    </div>
  )
}

export default Pair;
