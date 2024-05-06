import { createContext, useState, Dispatch, SetStateAction } from "react";

export type objImovel = {
    id: string,
    bairro: string,
    tipoimovel: string,
    metragem: string,
    metragemfinal: string,
    numquartos: string,
    numsuites: string,
    numvagas: string,
    preco: string,
    codigo: string
}

type ContextoInfoImoveisTypes = {   
    imoveisInfo: objImovel[],
    setImoveisInfo: Dispatch<SetStateAction<objImovel[]>>
}

export const ContextoInfoImoveis = createContext<ContextoInfoImoveisTypes>({
    imoveisInfo: [],
    setImoveisInfo: () => {}
} as ContextoInfoImoveisTypes)


export const InfoFotosProvider = ({children}: {children: React.ReactNode}) => {

    const [imoveisInfo, setImoveisInfo] = useState<objImovel[]>([])



    return (
        <ContextoInfoImoveis.Provider value={{
            imoveisInfo,
            setImoveisInfo
        }}>
            {children}
        </ContextoInfoImoveis.Provider>
    )
}