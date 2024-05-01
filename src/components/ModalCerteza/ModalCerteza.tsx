import { Dispatch, SetStateAction, useContext } from "react"
import { GeralContext } from "../../Contexts/ContextGeral/ContextGeral"
import { objImoveisType } from "../Cadastro.tsx/Cadastro"

type Props = {
    codigo: string,
    id: string,
    setTemModalCerteza: Dispatch<SetStateAction<boolean>>,
    setImoveisDeletar: Dispatch<SetStateAction<objImoveisType[]>>
}

export default function ModalCerteza({codigo, id, setTemModalCerteza, setImoveisDeletar}: Props){

    const {setTemAviso, setTextoAviso} = useContext(GeralContext)


    function deletarItem(){
        fetch(process.env.API_URL + "/deletarItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id
            })
        }).then(res => res.json()).then(data => {
            setTemModalCerteza(false)
            setTemAviso(true)
            if(data[1]){
                setTextoAviso(data[1])
            }
            fetch(process.env.API_URL + "/infoImoveis").then(res => res.json()).then(data => {setImoveisDeletar(data[1])}) 
        })
    }

    return (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 text-white gap-4">
            <div className="text-xl">Tem certeza que deseja apagar o imóvel de código: {codigo}</div>
            <div className="flex gap-4">
                <button onClick={() => deletarItem()} className="p-2 bg-laranjaPrincipal rounded-md">
                    Sim, deletar
                </button>
                <button onClick={() => setTemModalCerteza(false)} className="p-2 bg-laranjaPrincipal rounded-md">
                    Cancelar
                </button>
            </div>
        </div>
    )
}