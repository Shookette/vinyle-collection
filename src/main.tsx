import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WithFirestore from './components/WithFirestore'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WithFirestore>
      <App />
    </WithFirestore>
  </StrictMode>,
)
