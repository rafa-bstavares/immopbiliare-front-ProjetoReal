import { createContext, useState, Dispatch, SetStateAction } from "react";


type ContextoElemCheckTypes = {   
    todosBairrosMarcado: boolean,
    setTodosBairrosMarcado: Dispatch<SetStateAction<boolean>>,
    todosTiposMarcado: boolean,
    setTodosTiposMarcado: Dispatch<SetStateAction<boolean>>
}

export const ContextoElemCheck = createContext<ContextoElemCheckTypes>({
    todosBairrosMarcado: false,
    setTodosBairrosMarcado: () => {},
    todosTiposMarcado: false,
    setTodosTiposMarcado: () => {}
} as ContextoElemCheckTypes)


export const ElemCheckProvider = ({children}: {children: React.ReactNode}) => {

    const [todosBairrosMarcado, setTodosBairrosMarcado] = useState<boolean>(false)
    const [todosTiposMarcado, setTodosTiposMarcado] = useState<boolean>(false)



    return (
        <ContextoElemCheck.Provider value={{
            todosBairrosMarcado,
            setTodosBairrosMarcado,
            todosTiposMarcado,
            setTodosTiposMarcado
        }}>
            {children}
        </ContextoElemCheck.Provider>
    )
}