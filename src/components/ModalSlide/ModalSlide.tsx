import { useContext, useEffect } from "react"
import { ContextoModalSlide } from "../../Contexts/ContextoModalSlide/ContextoModalSlide"
import ImovelPesquisa from "../ImovelPesquisa/ImovelPesquisa"

type Props = {
    id: string,
    imgs: string[]
}

export default function ModalSlide({id, imgs}: Props){

    useEffect(() => {
        console.log(id)
        console.log(imgs)
    }, [])

    const {setTemModalSlide} = useContext(ContextoModalSlide)

    return (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-white">
            <div className="flex flex-col items-center justify-center border-solid border-white border-2 rounded-lg p-20">
                <div>
                    <ImovelPesquisa imgs={imgs} id={id} modal={true}/>
                </div>
                <div onClick={() => setTemModalSlide(false)} className="text-white text-lg py-2 px-4 rounded-sm bg-laranjaPrincipal cursor-pointer">
                    Voltar
                </div>
            </div>
        </div>
    )
}