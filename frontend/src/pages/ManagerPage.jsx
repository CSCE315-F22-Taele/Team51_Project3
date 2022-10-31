import React from 'react';
import inventoryImg from './images/inventory.png';
import boxImg from './images/orderHistory.png';
import excessReportImg from './images/excess.png';
import statButton from './images/statsbutton.png';
import restockButton from './images/restock.png';
import './managerStyle.css';


const ManagerPage = () => {

    return (
        <div>
            <a href="Inventory"><button><img className='statButton' src={inventoryImg} alt='Manage Inventory'></img>Manage Inventory</button></a>
            <a href="OrderHistory"><button><img className='statButton' src={boxImg} alt='Order History'></img>Order History</button></a>
            <a href="Excess"><button><img className='statButton' src={excessReportImg} alt='Excess Report'></img>Excess Report</button></a>
            <a href="Pair"><button><img className='statButton' src={statButton} alt='Pair Report'></img>Pair Report</button></a>
            <a href="Restock"><button><img className='statButton' src={restockButton} alt='Restock Report'></img>Restock Report</button></a>
        </div>
    )
}

export default ManagerPage;