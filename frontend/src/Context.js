import React, { useState } from "react";

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
    const [cartItemTemp, setCartItemTemp] = useState()
    return (
        <Context.Provider value={{ cartItemTemp, setCartItemTemp }}>
            {children}
        </Context.Provider>
    )
}