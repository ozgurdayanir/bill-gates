import { useState } from 'react'
import './App.css'
import Card from './components/card/Card'
import Bill from './components/bill-gates-info'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Bill />
    <div className='container card-container'>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    </>
  )
}

export default App
