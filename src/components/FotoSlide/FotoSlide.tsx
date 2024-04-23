import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EstruturaInfos from "../EstruturaInfos/EstruturaInfos"

type Props = {
    img: string
}

export default function FotoSlide({img}: Props){

    const [showOverlay, setShowOverlay] = useState<boolean>(false)

    return (
        <motion.div onHoverStart={() => setShowOverlay(true)} onHoverEnd={() => setShowOverlay(false)} className={`h-full w-[22vw] relative cursor-pointer`}>
            <img className="h-full w-full object-cover" src={img} alt="foto slide" />
            <AnimatePresence>
                {showOverlay && 
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute inset-0 flex justify-center items-center">
                    <div className="absolute bg-black opacity-60 h-full w-full"></div>
                    <motion.div initial={{y: 10}} animate={{y: 0}} exit={{y: 10}} className="text-white relative z-10">
                        <EstruturaInfos numeroArea={223} numeroCodigo={1234} numeroPreco={779000} numeroQuartos={3} numeroSuites={2} numeroVagas={1} alturaFoto={true} temBotao={false}/>
                    </motion.div>    
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}