import useMeasure from "react-use-measure"
import { useMotionValue, animate, motion, AnimatePresence} from "framer-motion"
import { useContext, useEffect, useState } from "react"
import FotoSlide from "../FotoSlide/FotoSlide"
import { ContextoInfoImoveis } from "../../Contexts/ContextoInfoImoveis/ContextoInfoImoveis"

export default function SlideFinal(){


    const slideRapido = 30
    const slideDevagar = 85
    const [duration, setDuration] = useState<number>(slideRapido)
    const [arrayFotosTela, setArrayFotosTela] = useState<string[][]>([])

    const {imoveisInfo} = useContext(ContextoInfoImoveis)


    useEffect(() => {
        fetch("http://localhost:3000/pegarFotosSlide").then(res => res.json()).then(data => {setArrayFotosTela([...data, ...data]); console.log(data)})
    }, [imoveisInfo])


    let [ref, {width}] = useMeasure()

    const xTranslation = useMotionValue(0)

    const [temQueTerminar, setTemQueTerminar] = useState<boolean>(false)
    const [rerenderizar, setRerenderizar] = useState<boolean>(false)

    useEffect(() => {
        let posicaoFinal = -((width / 2))

        if(temQueTerminar){
            animate(xTranslation, [xTranslation.get(), posicaoFinal], {
                ease: "linear",
                duration: duration * (1 - (xTranslation.get()/posicaoFinal)),
                onComplete: () => {
                    setTemQueTerminar(false)
                    setRerenderizar(!rerenderizar)
                }
            })
        }else{
            animate(xTranslation, [0, posicaoFinal], {
                ease: "linear",
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0
            })
        }



    }, [xTranslation, width, duration, rerenderizar])

    return (
        <div className={`md:h-[300px] h-[200px] flex overflow-hidden relative `}>
            <AnimatePresence>
                <motion.div ref={ref} onHoverStart={() => {setDuration(slideDevagar); setTemQueTerminar(true)}} onHoverEnd={() => {setDuration(slideRapido); setTemQueTerminar(true)}} style={{x: xTranslation}} className={`h-full flex gap-[10px]`}>
                    {arrayFotosTela.map(item => <FotoSlide img={item[0]} id={item[1]} />)}
                </motion.div>
                <div className="absolute w-[5vw] h-full left-0 bg-gradient-to-r from-verdePrincipal to-transparent"></div>
                <div className="absolute w-[5vw] h-full right-0 bg-gradient-to-l from-verdePrincipal to-transparent"></div>
            </AnimatePresence>
        </div>
    )
}


//ELE CRIOU UM COMPONENTE PRA CADA CARD NO VIDEO JUSTAMNETE PARA QUANDO FIZER O HOVER MUDAR SÓ O STATE DAQUELE ELEMENTO E SÓ ATIVAR O OHVER DELE, AQUI NO MEU TA ATIVANDO DE TODO MUNDO