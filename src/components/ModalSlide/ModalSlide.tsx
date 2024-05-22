import { useEffect } from "react"
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



    return (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-white">
            <div className="flex flex-col items-center  border-solid border-white border-2 rounded-lg h-[90vh] md:w-[50vw] w-[90vw]">
                <div>
                    <ImovelPesquisa imgs={imgs} id={id} modal={true}/>
                </div>
            </div>
        </div>
    )
}