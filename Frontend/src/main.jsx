import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Gamble from './components/Gamble/Gamble.jsx'
import Timer from './components/Timer/Timer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
      <Gamble/>
      
    
  </StrictMode>,
)
