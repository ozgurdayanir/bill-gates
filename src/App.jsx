import { useState } from 'react'
import './App.css'
import Card from './components/card/Card'
import Bill from './components/bill-gates-info'
import Amount from './components/amount';


function App() {
  const [money, setMoney] = useState(100000000000);
  return (
    <>
      <Bill />
      <div className='container amount-container'>
        <Amount money={money} />
      </div>
      <div className='container card-container'>
        <Card money={money} setMoney={setMoney} />
      </div>
    </>
  )
}

export default App
