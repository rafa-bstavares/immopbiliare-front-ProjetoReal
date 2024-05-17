import { Dispatch, SetStateAction } from "react"

type Props = {
    novaDescricao: string,
    setNovaDescricao: Dispatch<SetStateAction<string>>,
    setTemModalDesc: Dispatch<SetStateAction<boolean>>,
    mudarDescFn: () => void
}

export default function ModalDesc({novaDescricao, setNovaDescricao, setTemModalDesc, mudarDescFn}: Props){
    return(
        <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center z-100 text-white gap-4">
            <div className="p-10 rounded-md bg-verdePrincipal flex flex-col w-[90vw] gap-4">
                <div className="text-lg"> 
                    Nova descrição
                </div>  
                <textarea className="text-black h-32" onChange={(e) => {setNovaDescricao(e.target.value)}} value={novaDescricao} />
                <div className="flex self-stretch justify-center gap-8">
                    <button onClick={() => {setTemModalDesc(false)}} className="p-2 bg-red-600">
                        voltar
                    </button>
                    <button onClick={mudarDescFn} className="p-2 bg-verdeMaisEscuro">
                        alterar descrição
                    </button>
                </div>
            </div>
        </div>  
    )
}