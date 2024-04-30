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
    const [infoAtual, setInfoAtual] = useState<objImovel[]>([{bairro: "", codigo: "", id: "", metragem: "", numquartos: "", numsuites: "", numvagas: "", preco: "", tipoimovel: ""}])
    
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
        <motion.div onClick={() => {abrirModalImovel()}} onHoverStart={() => setShowOverlay(true)} onHoverEnd={() => setShowOverlay(false)} className={`h-full md:w-[22vw] w-[60vw] relative cursor-pointer`}>
            <img className="h-full w-full object-cover" src={img} alt="foto slide" />
            <AnimatePresence>
                {showOverlay && 
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute inset-0 flex justify-center items-center">
                    <div className="absolute bg-black opacity-60 h-full w-full"></div>
                    <motion.div initial={{y: 10}} animate={{y: 0}} exit={{y: 10}} className="text-white relative z-10">
                        <EstruturaInfos numeroArea={Number(infoAtual[0].metragem ? infoAtual[0].metragem : Number(""))} numeroCodigo={Number(infoAtual[0].codigo) ? Number(infoAtual[0].codigo) : Number("")} numeroPreco={Number(infoAtual[0].preco) ? Number(infoAtual[0].preco) : Number("")} numeroQuartos={Number(infoAtual[0].numquartos) ? Number(infoAtual[0].numquartos) : Number("")} numeroSuites={Number(infoAtual[0].numsuites) ? Number(infoAtual[0].numsuites) : Number("")} numeroVagas={Number(infoAtual[0].numvagas) ? Number(infoAtual[0].numvagas) : Number("")} alturaFoto={true} temBotao={false}/>
                    </motion.div>    
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}