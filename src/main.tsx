import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Cadastro from './components/Cadastro.tsx/Cadastro.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GeralProvider } from './Contexts/ContextGeral/ContextGeral.tsx'
import { InfoFotosProvider } from './Contexts/ContextoInfoImoveis/ContextoInfoImoveis.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GeralProvider>
        <InfoFotosProvider>
          <Routes>
            <Route path='/' element={<App/>}></Route>
            <Route path='/cadastro' element={<Cadastro/>}></Route>
          </Routes>
        </InfoFotosProvider>
      </GeralProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
