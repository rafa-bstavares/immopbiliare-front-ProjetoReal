import { useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EstruturaInfos from "../EstruturaInfos/EstruturaInfos"
import { ContextoInfoImoveis } from "../../Contexts/ContextoInfoImoveis/ContextoInfoImoveis"
import { objImovel } from "../../Contexts/ContextoInfoImoveis/ContextoInfoImoveis"
import { ContextoModalSlide } from "../../Contexts/ContextoModalSlide/ContextoModalSlide"
import { pesquisarImoveisId } from "../../Contexts/Functions/gettersFunctions"
import { GeralContext } from "../../Contexts/ContextGeral/ContextGeral"

type Props = {
    img: string,
    id: string
}

export default function FotoSlide({img, id}: Props){

    const [showOverlay, setShowOverlay] = useState<boolean>(false)
    const [infoAtual, setInfoAtual] = useState<objImovel[]>([{bairro: "", codigo: "", id: "", metragem: "", numquartos: "", numquartosfinal: "", numsuites: "", numsuitesfinal: "", numvagas: "", preco: "", tipoimovel: "", metragemfinal: "", descricao: ""}])
    
    const {setTemAviso, setTextoAviso} = useContext(GeralContext)
    const {imoveisInfo} = useContext(ContextoInfoImoveis)
    const {setTemModalSlide, setIdAtualModal, setImovelModal} = useContext(ContextoModalSlide)

    useEffect(() => {
        setInfoAtual(imoveisInfo.filter(item => item.id == id))
    }, [imoveisInfo])

    useEffect(() => {
        console.log(infoAtual)
    }, [infoAtual])


    function abrirModalImovel(){
        setIdAtualModal(infoAtual[0].id)
        pesquisarImoveisId(setImovelModal, id, setTemAviso, setTextoAviso)
        setTemModalSlide(true)
    }


    return (
        <motion.div onClick={() => {abrirModalImovel()}} onHoverStart={() => setShowOverlay(true)} onHoverEnd={() => setShowOverlay(false)} className={`aspect-video relative cursor-pointer`}>
            <img className="h-full w-full object-cover" src={img} alt="foto slide" />
            <AnimatePresence>
                {showOverlay && 
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute inset-0 flex justify-center items-center">
                    <div className="absolute bg-black opacity-60 h-full w-full"></div>
                    <motion.div initial={{y: 10}} animate={{y: 0}} exit={{y: 10}} className="text-white relative z-10">
                        <EstruturaInfos lerMais={true} modal={false} descricao={infoAtual[0].descricao} numeroAreaFinal={Number(infoAtual[0].metragemfinal ? infoAtual[0].metragemfinal : Number(""))} numeroArea={Number(infoAtual[0].metragem)} numeroCodigo={infoAtual[0].codigo ? infoAtual[0].codigo : ""} numeroPreco={Number(infoAtual[0].preco) ? Number(infoAtual[0].preco) : Number("")} numeroQuartos={Number(infoAtual[0].numquartos)} numQuartosFinal={Number(infoAtual[0].numquartosfinal)} numeroSuites={Number(infoAtual[0].numsuites)} numSuitesFinal={Number(infoAtual[0].numsuitesfinal)} numeroVagas={Number(infoAtual[0].numvagas)} alturaFoto={true} temBotao={false}/>
                    </motion.div>    
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}