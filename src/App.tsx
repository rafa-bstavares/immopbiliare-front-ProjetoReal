import { useState } from 'react'
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal'
import PrimeiroCTA from './components/PrimeiroCTA/PrimeiroCTA'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col'>
      <PaginaPrincipal/>
      <PrimeiroCTA/>
    </div>
  )
}

export default App
