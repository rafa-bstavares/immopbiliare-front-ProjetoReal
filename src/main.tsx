import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Cadastro from './components/Cadastro.tsx/Cadastro.tsx'
import './index.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { GeralProvider } from './Contexts/ContextGeral/ContextGeral.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GeralProvider>
        <Routes>
          <Route path='/' element={<App/>}></Route>
          <Route path='/cadastro' element={<Cadastro/>}></Route>
        </Routes>
      </GeralProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
