import { useState, createContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {

    const [loadingCont, setLoadingCont] = useState(null)

    return(
        <LoadingContext.Provider value={[loadingCont, setLoadingCont]}>
            {children}
        </LoadingContext.Provider>
    )
}