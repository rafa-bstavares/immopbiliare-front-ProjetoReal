import { Dispatch, SetStateAction } from "react"

type Props = {
    texto: string,
    temAvisoFn: Dispatch<SetStateAction<boolean>>
}

export default function TelaAviso({texto, temAvisoFn}: Props){
    return (
        <div className="fixed top-0 left-0 right-0 h-screen w-screen bg-white/80 flex justify-center items-center">
            <div className="text-center text-lg text-black flex flex-col items-center gap-4">
                <div className="text-center">{texto}</div>
                <div className="py-2 px-4 bg-verdePrincipal rounded-md text-white cursor-pointer" onClick={() => temAvisoFn(false)}>ok</div>
            </div>
        </div>
    )
}