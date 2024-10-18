import './style.css';

const Amount = ({ money }) => {
  return (
    <div className='amount'>
      <h2>${money.toLocaleString()}</h2>
    </div>
  )
}

export default Amount;