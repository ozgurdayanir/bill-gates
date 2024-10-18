
import './style.css';

const Receipt = ({ receipt }) => {
  const total = receipt.reduce((acc, item) => acc + item.total * item.quantity, 0);

  return (
    <div className='receipt-container'>
      <h3>RECEIPT</h3>
      <ul>
        {receipt.map((item, index) => (
          <li key={index}>
            {item.title} (x{item.quantity}) - ${ (item.total * item.quantity).toLocaleString() }
          </li>
        ))}
      </ul>
      <hr />
      <p>Total: ${total.toLocaleString()}</p>
    </div>
  )
}

export default Receipt;