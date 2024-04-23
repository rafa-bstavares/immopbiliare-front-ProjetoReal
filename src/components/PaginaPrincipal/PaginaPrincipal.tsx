import logo from "../../assets/logoimmobiliare.png"
import IconeInstagram from "../IconeInstagram/IconeInstagram"
import IconeWpp from "../IconeWpp/IconeWpp"
import { useState, useEffect, useRef, useContext } from "react"
import Botao from "../Botao/Botao"
import Seta from "../../assets/seta.svg"
import SetaSeletor from "../../assets/setaSeletor.svg"
import SlideFinal from "../SlideFinal/SlideFinal"
import ImovelPesquisa from "../ImovelPesquisa/ImovelPesquisa"
import { PegarBairros, pegarTiposImoveis } from "../../Contexts/Functions/gettersFunctions"
import { GeralContext } from "../../Contexts/ContextGeral/ContextGeral"
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"
import ElemCheck from "../ElemCheck/ElemCheck"


export default function PaginaPrincipal(){
    const [bairrosAtuais, setBairrosAtuais] = useState<string[]>(["Escolha um bairro..."])
    const [tiposImoveisAtuais, setTiposImoveisAtuais] = useState<string[]>(["Escolha um tipo de imóvel..."])
    const divBairros = useRef<HTMLDivElement>(null)
    const divTipos = useRef<HTMLDivElement>(null)   
    const [alturaDivBairros, setAlturaDivBairros] = useState<string>("") 
    const [alturaDivTipos, setAlturaDivTipos] = useState<string>("") 
    const [mostrarBairros, setMostrarBairros] = useState<boolean>(false)
    const [mostrarTipos, setMostrarTipos] = useState<boolean>(false)
    const [rodaSeta1, setRodaSeta1] = useState<boolean>(false)
    const [rodaSeta2, setRodaSeta2] = useState<boolean>(false)
    const [arrayFotosFinal, setArrayFotosFinal] = useState<string[]>([img1, img2, img3])
    const [pesquisa, setPesquisa] = useState<boolean>(true)
    const [bairros, setBairros] = useState<string[]>([])
    const [tiposImoveis, setTiposImoveis] = useState<string[]>([])

    const {setTemAviso, setTextoAviso} = useContext(GeralContext)

    useEffect(() => {
        console.log(bairrosAtuais)
        console.log(tiposImoveisAtuais)
    }, [bairrosAtuais, tiposImoveisAtuais])

    function trocarMostrarBairros(){
        setMostrarBairros(!mostrarBairros)
    }

    function trocarMostrarTipos(){
        setMostrarTipos(!mostrarTipos)
    }

    useEffect(() => {
        PegarBairros(setBairros, setTemAviso, setTextoAviso)
        pegarTiposImoveis(setTiposImoveis, setTemAviso, setTextoAviso)
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
            <div className="px-xGeralPc h-[80px] flex justify-between">
                <div className="flex items-center h-full gap-4">
                    <div className="text-lg text-laranjaPrincipal font-[Montserrat]">immobiliare</div>
                    <img src={logo} alt="logotipo-immobiliare" className="w-16 h-16"/>
                </div>
                <div className="flex items-center text-white font-[Forum] gap-20 text-xl">
                    <a className="h-full flex items-center" href="">Página Principal</a>
                    <a className="h-full flex items-center" href="">Bairros Favoritos</a>
                    <a className="h-full flex items-center" href="">Quem Somos</a>
                </div>
                <div className="flex gap-8 items-center font-[Montserrat] h-full text-white">
                    <div className="flex items-center h-full gap-2">
                        <IconeInstagram color="#fff" heightIcon="25px" widthIcon="25px" />
                        @immobiliare.sp
                    </div>
                    <div className="flex items-center h-full gap-2">
                        <IconeWpp color="#fff" heightIcon="25px" widthIcon="25px" />
                        11 99679-4402
                    </div>
                </div>  
            </div>
            {/* FINAL MENU */}
            {/* PESQUISA E BOTOES */}
            <div className="px-xGeralPc flex flex-1 flex-col justify-between text-white font-[Antonio]">
                <div className="flex flex-col flex-1 justify-center items-center gap-8">
                    <div className="text-3xl">
                        Descubra nossos imóveis através dos filtros abaixo
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between bg-verdeMaisEscuro px-4 py-2 cursor-pointer min-w-[15vw] rounded-xl border-white border-solid border-spacing-6" onClick={() => {trocarMostrarBairros(); setRodaSeta1(!rodaSeta1)}}>
                                Selecione os bairros...
                                <img src={SetaSeletor} alt="seta seletor" className={`h-3 w-3 ${rodaSeta1 ? "rotate-180": "rotate-0"} transition-all ease-linear duration-500`}/>
                            </div>
                            <div className={`grid ${mostrarBairros ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} bg-verdeMaisEscuro px-2 rounded-xl transition-all duration-500 ease-linear `} ref={divBairros}>
                                <div className="grid overflow-hidden">
                                    {bairros.map((item, index) => <ElemCheck stateAtual={bairrosAtuais} item={item} arrayIterar={bairros} index={index} setStateAtual={setBairrosAtuais}/>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between bg-verdeMaisEscuro px-4 py-2 cursor-pointer min-w-[15vw] rounded-xl border-white border-solid border-spacing-6" onClick={() => {trocarMostrarTipos(); setRodaSeta2(!rodaSeta2)}}>
                                Selecione os tipos de imóveis...
                                <img src={SetaSeletor} alt="seta seletor" className={`h-3 w-3 ${rodaSeta2 ? "rotate-180": "rotate-0"} transition-all ease-linear duration-500`}/>
                            </div> 
                            <div className={`grid ${mostrarTipos ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} bg-verdeMaisEscuro px-2 overflow-hidden rounded-xl transition-all duration-500 ease-linear`} ref={divTipos}>
                                <div className="grid overflow-hidden">
                                    {tiposImoveis.map((item, index) => <ElemCheck stateAtual={tiposImoveisAtuais} item={item} arrayIterar={tiposImoveis} index={index} setStateAtual={setTiposImoveisAtuais}/>)}
                                </div>
                            </div>
                        </div>
                        <button className="bg-verdeMaisEscuro px-4 py-2 rounded-xl flex justify-center items-center">
                            Pesquisar
                        </button>
                    </div>
                    {
                        pesquisa &&
                        <div className="grid grid-cols-3 gap-16 py-8">
                            {arrayFotosFinal.map(item => <ImovelPesquisa img={item}/>)}
                        </div>
                    }
                    <div className="flex gap-4 mt-4">
                        <Botao btTexto="entre em contato" temImg={true} imgWpp={true} temaClaro={true}/>
                        <Botao btTexto="nosso instagram" temImg={true} imgWpp={false} temaClaro={false}/>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 pb-10">
                    <div className="text-2xl text-center">
                        passe o mouse nos imóveis abaixo e veja mais detalhes
                    </div>  
                    <img src={Seta} alt="seta para baixo" className="w-8 h-8"/>
                </div>
            </div>
            {/* FINAL PESQUISA E BOTOES */}
            {/* SLIDE */}
                <SlideFinal/>
            {/* FINAL SLIDE */}
        </div>
    )
}