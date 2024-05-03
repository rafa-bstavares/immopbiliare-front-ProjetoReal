import logo from "../../assets/logoimmobiliare.png"
import IconeInstagram from "../IconeInstagram/IconeInstagram"
import IconeWpp from "../IconeWpp/IconeWpp"
import { useState, useEffect, useRef, useContext } from "react"
import Botao from "../Botao/Botao"
import Seta from "../../assets/seta.svg"
import SetaSeletor from "../../assets/setaSeletor.svg"
import SlideFinal from "../SlideFinal/SlideFinal"
import ImovelPesquisa from "../ImovelPesquisa/ImovelPesquisa"
import { PegarBairros, pegarTiposImoveis, pegarInfosImoveis, pesquisarImoveis } from "../../Contexts/Functions/gettersFunctions"
import { GeralContext } from "../../Contexts/ContextGeral/ContextGeral"
import { ContextoInfoImoveis } from "../../Contexts/ContextoInfoImoveis/ContextoInfoImoveis"
import ModalSlide from "../ModalSlide/ModalSlide"
import ElemCheck from "../ElemCheck/ElemCheck"
import { ContextoPesquisa } from "../../Contexts/ContextoPesquisa/ContextoPesquisa"
import { ContextoElemCheck } from "../../Contexts/ContextoElemCheck/ContextoElemCheck"
import { ContextoModalSlide } from "../../Contexts/ContextoModalSlide/ContextoModalSlide"


export type imoveisPesquisaType = {
    id: string,
    imagens: string[]
}

export default function PaginaPrincipal(){


    const [bairrosAtuais, setBairrosAtuais] = useState<string[]>(["Escolha um bairro..."])
    const [tiposImoveisAtuais, setTiposImoveisAtuais] = useState<string[]>(["Escolha um tipo de imóvel..."])
    const divBairros = useRef<HTMLDivElement>(null)
    const divTipos = useRef<HTMLDivElement>(null)   
    const [mostrarBairros, setMostrarBairros] = useState<boolean>(false)
    const [mostrarTipos, setMostrarTipos] = useState<boolean>(false)
    const [rodaSeta1, setRodaSeta1] = useState<boolean>(false)
    const [rodaSeta2, setRodaSeta2] = useState<boolean>(false)
    const [arrayImoveisPesquisa, setArrayImoveisPesquisa] = useState<imoveisPesquisaType[]>([])
    const [pesquisa, setPesquisa] = useState<boolean>(false)
    const [bairros, setBairros] = useState<string[]>([])
    const [tiposImoveis, setTiposImoveis] = useState<string[]>([])
    const {setTemAviso, setTextoAviso} = useContext(GeralContext)
    const {setImoveisInfo} = useContext(ContextoInfoImoveis)
    const {bairrosPesquisa, tiposPesquisa} = useContext(ContextoPesquisa)
    const {temModalSlide, idAtualModal, imovelModal} = useContext(ContextoModalSlide)
    const {todosBairrosMarcado, setTodosBairrosMarcado, setTodosTiposMarcado, todosTiposMarcado} = useContext(ContextoElemCheck)

    useEffect(() => {
        console.log(temModalSlide)
    }, [temModalSlide])

    function trocarMostrarBairros(){
        setMostrarBairros(!mostrarBairros)
    }

    function trocarMostrarTipos(){
        setMostrarTipos(!mostrarTipos)
    }

    useEffect(() => {
        PegarBairros(setBairros, setTemAviso, setTextoAviso)
        pegarTiposImoveis(setTiposImoveis, setTemAviso, setTextoAviso)
        pegarInfosImoveis(setImoveisInfo, setTemAviso, setTextoAviso)
    }, [])

    useEffect(() => {
        if(bairros[0] == "selecione um bairro"){
            let newArr = [...bairros]
            newArr.shift()
            setBairros(newArr)
        }

        if(tiposImoveis[0] == "selecione um tipo de imóvel"){
            let newArr = [...tiposImoveis]
            newArr.shift()
            setTiposImoveis(newArr)
        }
    }, [tiposImoveis, bairros])



    return (
        <div className="min-h-[110vh] bg-verdePrincipal flex flex-col justify-between">
            {/* MENU */}
            <div className="md:px-xGeralPc px-xGeralMobile p-yGeralMobile md:py-0 h-[80px] flex justify-between items-center md:items-stretch">
                <div className="flex flex-col md:flex-row items-center h-full md:gap-4">
                    <div className="text-lg text-laranjaPrincipal font-[Montserrat]">immobiliare</div>
                    <img src={logo} alt="logotipo-immobiliare" className="md:w-16 md:h-16 w-10 h-10 -order-1 md:order-1"/>
                </div>
                {/*
                <div className="flex items-center text-white font-[Forum] gap-20 text-xl">
                    <a className="h-full flex items-center" href="">Página Principal</a>
                    <a className="h-full flex items-center" href="">Bairros Favoritos</a>
                    <a className="h-full flex items-center" href="">Quem Somos</a>
                </div>
                */}
                <div className="flex flex-col md:flex-row md:gap-8 items-center font-[Montserrat] h-full text-white text-sm md:text-lg">
                    <div className="flex items-center h-full gap-2">
                        <IconeInstagram color="#fff" heightIcon="15px" widthIcon="15px" />
                        @immobiliare.sp
                    </div>
                    <div className="flex items-center h-full gap-2">
                        <IconeWpp color="#fff" heightIcon="15px" widthIcon="15px" />
                        11 99679-4402
                    </div>
                </div>  
            </div>
            {/* FINAL MENU */}
            {/* PESQUISA E BOTOES */}
            <div className="md:px-xGeralPc p-xGeralMobile flex flex-1 flex-col justify-between text-white font-[Antonio]">
                <div className="flex flex-col flex-1 justify-center items-center gap-8">
                    <div className="md:text-3xl text-2xl">
                        Descubra nossos imóveis através dos filtros abaixo
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:items-start">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between bg-verdeMaisEscuro px-4 py-2 cursor-pointer min-w-[15vw] rounded-xl border-white border-solid border-spacing-6" onClick={() => {trocarMostrarBairros(); setRodaSeta1(!rodaSeta1)}}>
                                Selecione os bairros...
                                <img src={SetaSeletor} alt="seta seletor" className={`h-3 w-3 ${rodaSeta1 ? "rotate-180": "rotate-0"} transition-all ease-linear duration-500`}/>
                            </div>
                            <div className={`grid ${mostrarBairros ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} bg-verdeMaisEscuro px-2 rounded-xl transition-all duration-500 ease-linear `} ref={divBairros}>
                                <div className="grid overflow-hidden">
                                    {["Todos", ...bairros].map((item, index) => <ElemCheck setTodosMarcado={setTodosBairrosMarcado} todosMarcado={todosBairrosMarcado} tipoSelect="bairro" stateAtual={bairrosAtuais} item={item} arrayIterar={["Todos", ...bairros]} index={index} setStateAtual={setBairrosAtuais}/>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between bg-verdeMaisEscuro px-4 py-2 cursor-pointer min-w-[15vw] rounded-xl border-white border-solid border-spacing-6" onClick={() => {trocarMostrarTipos(); setRodaSeta2(!rodaSeta2)}}>
                                Selecione os tipos de imóveis...
                                <img src={SetaSeletor} alt="seta seletor" className={`h-3 w-3 ${rodaSeta2 ? "rotate-180": "rotate-0"} transition-all ease-linear duration-500`}/>
                            </div>
                            <div className={`grid ${mostrarTipos ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} bg-verdeMaisEscuro px-2 rounded-xl transition-all duration-500 ease-linear`} ref={divTipos}>
                                <div className="grid overflow-hidden">
                                    {["Todos", ...tiposImoveis].map((item, index) => <ElemCheck setTodosMarcado={setTodosTiposMarcado} todosMarcado={todosTiposMarcado} tipoSelect="tipoImovel" stateAtual={tiposImoveisAtuais} item={item} arrayIterar={["Todos", ...tiposImoveis]} index={index} setStateAtual={setTiposImoveisAtuais}/>)}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => pesquisarImoveis(setArrayImoveisPesquisa, bairrosPesquisa, tiposPesquisa, setPesquisa, setTemAviso, setTextoAviso)} className="bg-verdeMaisEscuro px-4 py-2 rounded-xl flex justify-center items-center">
                            Pesquisar
                        </button>
                    </div>
                    {
                        pesquisa &&
                        <div className="md:grid md:grid-cols-3 md:gap-16 py-8 flex flex-col gap-10">
                            {arrayImoveisPesquisa.map(item => <ImovelPesquisa imgs={item.imagens} id={item.id}/>)}
                        </div>
                    }
                    <div className="flex gap-4 mt-4 md:flex-row flex-col">
                        <Botao btTexto="entre em contato" temImg={true} imgWpp={true} temaClaro={true}/>
                        <Botao btTexto="nosso instagram" temImg={true} imgWpp={false} temaClaro={false}/>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 md:pb-10 pb-2">
                    <div className="md:text-2xl text-sm text-center">
                        passe o mouse nos imóveis abaixo e veja mais detalhes
                    </div>  
                    <img src={Seta} alt="seta para baixo" className="w-6 h-6"/>
                </div>
            </div>
            {/* FINAL PESQUISA E BOTOES */}
            {/* SLIDE */}
            <SlideFinal/>
            {/* FINAL SLIDE */}

            {
                temModalSlide && 
                <ModalSlide id={idAtualModal} imgs={imovelModal[0].imagens} />
            }
                
        </div>
    )
}