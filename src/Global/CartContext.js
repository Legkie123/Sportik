import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'

export const CartContext = createContext();

export const CartContextProvider = (props) => {

    const [cart, dispatch] = useReducer(CartReducer, { basket: [], fullPriceTag: 0, fullAmount: 0 })

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}