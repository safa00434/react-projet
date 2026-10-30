import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Acceuil from './Acceuil.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Acceuil/>
    </>
  )
}

export default App
