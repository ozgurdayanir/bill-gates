import './style.css';
import BillGatesImg from '../../assets/images/billgates.jpg';
import Amount from '../amount/index.js';
const Bill = () => {
    return (
        <>
            <div className="container">
                <div className="bill-container">
                    <img src={BillGatesImg} alt="" />
                    <h1>Spend Bill Gates' Money</h1>
                </div>
            </div>
            <Amount />
        </>
    )
}

export default Bill;