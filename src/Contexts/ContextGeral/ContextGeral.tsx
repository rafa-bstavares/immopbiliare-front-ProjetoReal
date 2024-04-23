import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type GeralContextTypes = {   
    setTemAviso: Dispatch<SetStateAction<boolean>>,
    temAviso: boolean,
    textoAviso: string,
    setTextoAviso: Dispatch<SetStateAction<string>>
}

export const GeralContext = createContext<GeralContextTypes>({
    setTemAviso: () => {},
    temAviso: false,
    textoAviso: "",
    setTextoAviso: () => {}
} as GeralContextTypes)


export const GeralProvider = ({children}: {children: React.ReactNode}) => {

    const [temAviso, setTemAviso] = useState<boolean>(false)
    const [textoAviso, setTextoAviso] = useState<string>("")



    return (
        <GeralContext.Provider value={{
            temAviso,
            setTemAviso,
            textoAviso,
            setTextoAviso
        }}>
            {children}
        </GeralContext.Provider>
    )
}