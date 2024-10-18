import { useState } from 'react'
import './App.css'
import Cards from './components/card/Card'
import Bill from './components/bill-gates-info'
import Amount from './components/amount';


function App() {
  const [money, setMoney] = useState(100000000000);
  return (
    <>
    <Bill />
    <div className='container amount-container'>
      <Amount money={money.toLocaleString()} />
    </div>
    <div className='container card-container'>
      <Cards money={money} setMoney={setMoney}/>
    </div>
    </>
  )
}

export default App
