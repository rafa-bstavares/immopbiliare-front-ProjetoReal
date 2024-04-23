import useMeasure from "react-use-measure"
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"
import img4 from "../../assets/img4.jpg"
import img5 from "../../assets/img5.jpg"
import img6 from "../../assets/img6.jpg"
import { useMotionValue, animate, motion, AnimatePresence} from "framer-motion"
import { useEffect, useState } from "react"
import FotoSlide from "../FotoSlide/FotoSlide"

export default function SlideFinal(){


    const slideRapido = 30
    const slideDevagar = 85
    const [duration, setDuration] = useState<number>(slideRapido)

    let larguraFotoSlide = "22"

    let arrayFotos = [img1, img2, img3, img4, img5, img6] //Esse vai ser o array de fotos q vai vir da API
    const arrayFotosTela = [...arrayFotos, ...arrayFotos]
    const gapSlider: number = 10

    let [ref, {width}] = useMeasure()

    const xTranslation = useMotionValue(0)

    const [temQueTerminar, setTemQueTerminar] = useState<boolean>(false)
    const [rerenderizar, setRerenderizar] = useState<boolean>(false)

    useEffect(() => {
        let controls
        let posicaoFinal = -((width / 2))

        if(temQueTerminar){
            controls = animate(xTranslation, [xTranslation.get(), posicaoFinal], {
                ease: "linear",
                duration: duration * (1 - (xTranslation.get()/posicaoFinal)),
                onComplete: () => {
                    setTemQueTerminar(false)
                    setRerenderizar(!rerenderizar)
                }
            })
        }else{
            controls = animate(xTranslation, [0, posicaoFinal], {
                ease: "linear",
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0
            })
        }



    }, [xTranslation, width, duration, rerenderizar])

    return (
        <div className={`h-[300px] flex overflow-hidden relative `}>
            <AnimatePresence>
                <motion.div ref={ref} onHoverStart={() => {setDuration(slideDevagar); setTemQueTerminar(true)}} onHoverEnd={() => {setDuration(slideRapido); setTemQueTerminar(true)}} style={{x: xTranslation}} className={`h-full flex gap-[10px]`}>
                    {arrayFotosTela.map(item => <FotoSlide img={item} />)}
                </motion.div>
                <div className="absolute w-[5vw] h-full left-0 bg-gradient-to-r from-verdePrincipal to-transparent"></div>
                <div className="absolute w-[5vw] h-full right-0 bg-gradient-to-l from-verdePrincipal to-transparent"></div>
            </AnimatePresence>
        </div>
    )
}


//ELE CRIOU UM COMPONENTE PRA CADA CARD NO VIDEO JUSTAMNETE PARA QUANDO FIZER O HOVER MUDAR SÓ O STATE DAQUELE ELEMENTO E SÓ ATIVAR O OHVER DELE, AQUI NO MEU TA ATIVANDO DE TODO MUNDO