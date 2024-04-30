import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ContextoPesquisa } from "../../Contexts/ContextoPesquisa/ContextoPesquisa";

type Props = {
    item: string,
    setStateAtual: Dispatch<SetStateAction<string[]>>,
    stateAtual: string[]
    arrayIterar: string[],
    index: number,
    tipoSelect: string,
    todosMarcado: boolean,
    setTodosMarcado: Dispatch<SetStateAction<boolean>>

}

export default function ElemCheck({item, arrayIterar, index, stateAtual, tipoSelect, setTodosMarcado, todosMarcado}: Props){
    const {setBairrosPesquisa, bairrosPesquisa, setTiposPesquisa, tiposPesquisa} = useContext(ContextoPesquisa)

    const [isChecked, setIsChecked] = useState<boolean>(false)

    const [bairrosDesab, setBairrosDesab] = useState<boolean>(false)

    useEffect(() => {
        if(item !== "Todos" && !todosMarcado){
            if(isChecked){
                switch(tipoSelect){
                    case "bairro":
                        if(bairrosPesquisa.length == arrayIterar.slice(1).length){
                            setBairrosPesquisa([item])
                        }else{
                            setBairrosPesquisa([...bairrosPesquisa, item])            
                        }
                        break
    
                    case "tipoImovel":
                        if(tiposPesquisa.length == arrayIterar.slice(1).length){
                            setTiposPesquisa([item])
                        }else{
                            setTiposPesquisa([...tiposPesquisa, item])
                        }
                        break
                }
    
    
    
            }else{
    
                let idxRemove
    

                switch(tipoSelect){
                    case "bairro":
                        if(bairrosPesquisa.length > 1){
                            let newBairrosPesquisa = [...bairrosPesquisa]
                            idxRemove = newBairrosPesquisa.findIndex(elem => elem == item)
                            newBairrosPesquisa.splice(idxRemove, 1)
                            setBairrosPesquisa(newBairrosPesquisa)
                        }else{
                            setBairrosPesquisa(arrayIterar.slice(1))
                        }
                        break
    
                    case "tipoImovel":
                        if(tiposPesquisa.length > 1){
                            let newTiposPesquisa = [...tiposPesquisa]
                            idxRemove = newTiposPesquisa.findIndex(elem => elem == item)
                            newTiposPesquisa.splice(idxRemove, 1)
                            setTiposPesquisa(newTiposPesquisa)
                        }else{
                            setTiposPesquisa(arrayIterar.slice(1))
                        }
                        break
                }
    
            }
        }
    }, [isChecked])

    useEffect(() => {
        console.log(bairrosPesquisa)
    }, [bairrosPesquisa])

    useEffect(() => {
        console.log(tiposPesquisa)
    }, [tiposPesquisa])

    useEffect(() => {
        console.log(stateAtual)
    }, [stateAtual])



    useEffect(() => {
        if(todosMarcado){
            setIsChecked(false)
            setBairrosDesab(true)
            switch(tipoSelect){
                case "bairro":
                    setBairrosPesquisa(arrayIterar.slice(1))
                    break

                case "tipoImovel":
                    setTiposPesquisa(arrayIterar.slice(1))
                    break
            }

        }else{
            setBairrosDesab(false)
            switch(tipoSelect){
                case "bairro":
                    setBairrosPesquisa([])
                    break

                case "tipoImovel":
                    setTiposPesquisa([])
                    break
            }
        }
    }, [todosMarcado])

    return (
        <div className={`flex items-center justify-between p-2 cursor-pointer rounded-md border-t-[0.1px] border-t-white hover:bg-verdePrincipal ${index == 0 ? "mt-2" : ""} ${index == (arrayIterar.length - 1) ? "mb-2" : ""}`}>
            <label htmlFor={item + tipoSelect} className="cursor-pointer flex-1 h-full">{item}</label>
            <input onChange={() => {item == "Todos" ? setTodosMarcado(!todosMarcado) : setIsChecked(!isChecked)}} type="checkbox" name="" id={item + tipoSelect} checked={item == "Todos" ? todosMarcado : isChecked} disabled={item == "Todos" ? false : bairrosDesab}/>
        </div>
    )
}