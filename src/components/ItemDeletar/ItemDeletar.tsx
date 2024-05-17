import { Dispatch, SetStateAction } from "react"
import { objImoveisType } from "../Cadastro.tsx/Cadastro"

type Props = {
    item: objImoveisType,
    setTemModalCerteza: Dispatch<SetStateAction<boolean>>,
    setTemModalDesc: Dispatch<SetStateAction<boolean>>,
    setCodigoItemDeletar: Dispatch<SetStateAction<string>>,
    setIdItemDeletar: Dispatch<SetStateAction<string>>,
    setIdAlterarDesc: Dispatch<SetStateAction<string>>,
}

export default function ItemDeletar({item, setTemModalCerteza, setCodigoItemDeletar, setIdItemDeletar, setIdAlterarDesc, setTemModalDesc}: Props){

    function mostrarModalCerteza(){
        setTemModalCerteza(true)
        setCodigoItemDeletar(item.codigo)
        setIdItemDeletar(item.id)
    }

    function mostrarModalDesc(){
        setTemModalDesc(true)
        setIdAlterarDesc(item.id)
    }

    return (
        <div className="flex gap-2 text-xl">
            <span>
                código: {item.codigo} bairro: {item.bairro} metragem: {item.metragem}m² tipo: {item.tipoimovel}
            </span>
            <button onClick={() => mostrarModalCerteza()} className="p-1 text-white bg-red-600">
                deletar
            </button>
            <button onClick={() => mostrarModalDesc()} className="p-1 text-white bg-verdeMaisEscuro">
                Adicionar/alterar descrição
            </button>
        </div>
    )
}