import './style.css';
import BillGatesImg from '/img/billgates.jpg';
const Bill = () => {
    return (
        <>
            <div className="container">
                <div className="bill-container">
                    <img src={BillGatesImg} alt="" />
                    <h1>Spend Bill Gates' Money</h1>
                </div>
            </div>
        </>
    )
}

export default Bill;