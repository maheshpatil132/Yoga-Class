import { createContext, useState } from "react";

const ModalContext = createContext()

export const ModelProvider = ({ children }) => {
    const [model, setModel] = useState(false)
    return (
        <ModalContext.Provider value={{model , setModel}}>
            {children}
        </ModalContext.Provider>
    )
}


export default ModalContext