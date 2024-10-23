
import './style.css';

const Receipt = ({receipt, setMoney, setReceipt, ownedQuantities, setOwnedQuantities, setQuantities}) => {
  const total = receipt.reduce((acc, item) => acc + item.total * item.quantity, 0);
  const handleSellAll = () => {
    let totalRefund = 0;
    
    // total refund calculation
    receipt.forEach(item => {
        totalRefund += item.price * item.quantity;
    });

    // Add total refund to user's money
    setMoney(prevMoney => prevMoney + totalRefund);

    // Sahip olunan miktarları sıfırla
    const newOwnedQuantities = [...ownedQuantities];
    const newQuantities = [...Array(ownedQuantities.length).fill(0)];
    receipt.forEach(item => {
        const index = ownedQuantities.findIndex((_, i) => i === item.id - 1);
        if (index !== -1) {
            newOwnedQuantities[index] = 0; // Miktarları sıfırla
            newQuantities[index] = 0; // Miktarları sıfırla
        }
    });
    setOwnedQuantities(newOwnedQuantities);
    setQuantities(newQuantities);

    // Receipt'i temizle
    setReceipt([]);
};

  return (
    <div className='receipt-container'>
      <h3>RECEIPT</h3>
      <ul>
        {receipt.map((item, index) => (
          <li key={index}>
            {item.name} (x{item.quantity}) - ${ (item.total * item.quantity).toLocaleString() }
          </li>
        ))}
      </ul>
      <hr />
      <p>Total: ${total.toLocaleString()}</p>
      <button className='btn btn-sell-all' onClick={handleSellAll}>Sell All</button>
    </div>
  )
}

export default Receipt;