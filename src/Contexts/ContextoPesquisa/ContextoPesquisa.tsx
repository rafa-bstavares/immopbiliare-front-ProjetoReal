import { createContext, useState, Dispatch, SetStateAction } from "react";



type ContextoPesquisaTypes = {   
    bairrosPesquisa: string[],
    setBairrosPesquisa: Dispatch<SetStateAction<string[]>>,
    tiposPesquisa: string[],
    setTiposPesquisa: Dispatch<SetStateAction<string[]>>
}

export const ContextoPesquisa = createContext<ContextoPesquisaTypes>({
    bairrosPesquisa: [],
    setBairrosPesquisa: () => {},
    tiposPesquisa: [],
    setTiposPesquisa: () => {}
} as ContextoPesquisaTypes)


export const PesquisaProvider = ({children}: {children: React.ReactNode}) => {

    const [bairrosPesquisa, setBairrosPesquisa] = useState<string[]>([])
    const [tiposPesquisa, setTiposPesquisa] = useState<string[]>([])



    return (
        <ContextoPesquisa.Provider value={{
            bairrosPesquisa,
            setBairrosPesquisa,
            tiposPesquisa,
            setTiposPesquisa
        }}>
            {children}
        </ContextoPesquisa.Provider>
    )
}