import { createContext, useState, Dispatch, SetStateAction } from "react";

export type imovelModalType = {
    id: string,
    imagens: string[]
}

type ContextoModalSlideTypes = {   
    temModalSlide: boolean,
    setTemModalSlide: Dispatch<SetStateAction<boolean>>,
    imovelModal: imovelModalType[],
    setImovelModal: Dispatch<SetStateAction<imovelModalType[]>>,
    idAtualModal: string,
    setIdAtualModal: Dispatch<SetStateAction<string>>
}

export const ContextoModalSlide = createContext<ContextoModalSlideTypes>({
    temModalSlide: false,
    setTemModalSlide: () => {},
    imovelModal: [{id: "", imagens: [""]}],
    setImovelModal: () => {},
    idAtualModal: "",
    setIdAtualModal: () => {}
} as ContextoModalSlideTypes)


export const ModalSlideProvider = ({children}: {children: React.ReactNode}) => {

    const [temModalSlide, setTemModalSlide] = useState<boolean>(false)
    const [idAtualModal, setIdAtualModal] = useState<string>("")
    const [imovelModal, setImovelModal] = useState<imovelModalType[]>([{id: "", imagens: []}])



    return (
        <ContextoModalSlide.Provider value={{
            temModalSlide,
            setTemModalSlide,
            imovelModal,
            setImovelModal,
            idAtualModal,
            setIdAtualModal
        }}>
            {children}
        </ContextoModalSlide.Provider>
    )
}