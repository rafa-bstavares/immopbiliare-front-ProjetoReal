
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal'
import PrimeiroCTA from './components/PrimeiroCTA/PrimeiroCTA'
import { PesquisaProvider } from './Contexts/ContextoPesquisa/ContextoPesquisa'
import { ElemCheckProvider } from './Contexts/ContextoElemCheck/ContextoElemCheck'
import { ModalSlideProvider } from './Contexts/ContextoModalSlide/ContextoModalSlide'
import QuemSomos from './components/QuemSomos/QuemSomos'

function App() {


  return (
    <div className='flex flex-col'>
      <PesquisaProvider>
        <ElemCheckProvider>
          <ModalSlideProvider>
            <PaginaPrincipal/>
            <PrimeiroCTA/>
            {/*
            <QuemSomos/>
            */}
            <div className='bg-verdeMaisEscuro text-white md:px-xGeralPc px-xGeralMobile py-4 '>
              Copyright &copy;2024 Rafael Tavares
            </div>
          </ModalSlideProvider>
        </ElemCheckProvider>
      </PesquisaProvider>
    </div>
  )
}

export default App
