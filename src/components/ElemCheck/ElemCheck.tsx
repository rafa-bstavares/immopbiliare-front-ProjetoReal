import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
    item: string,
    setStateAtual: Dispatch<SetStateAction<string[]>>,
    stateAtual: string[]
    arrayIterar: string[],
    index: number,

}

export default function ElemCheck({item, setStateAtual, arrayIterar, index, stateAtual}: Props){
    const [isChecked, setIsChecked] = useState<boolean>(false)


    useEffect(() => {
        if(isChecked){
            setStateAtual([...stateAtual, item])
        }else{
            let newArr = [...stateAtual]
            const idxRemove = newArr.findIndex(elem => elem == item)
            newArr.splice(idxRemove, 1)
            setStateAtual(newArr)
        }
    }, [isChecked])

    return (
        <div onClick={() => {setIsChecked(!isChecked)}} className={`flex items-center justify-between p-2 cursor-pointer rounded-md border-t-[0.1px] border-t-white hover:bg-verdePrincipal ${index == 0 ? "mt-2" : ""} ${index == (arrayIterar.length - 1) ? "mb-2" : ""}`}>
            <label htmlFor={item} className="cursor-pointer">{item}</label>
            <input type="checkbox" name="" id={item} checked={isChecked}/>
        </div>
    )
}