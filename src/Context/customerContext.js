import { createContext, useEffect, useReducer,useState } from "react";


export const customerContext = createContext()

const intialValue = []

const reducer = (state,action) =>{
     console.log(action.type)
    switch(action.type){
            case "ADD_COSTUMER":
                return [...state,action.payload]
            case "DELETE_CUSTOMER" :
                return state.filter((customer)=> customer.customer_id !== action.payload)
            case "UPDATE_CUSTOMER" :
                return [...state,action.payload]
            
           default : return state
    }
}

export const CostomerContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, intialValue);
    
    useEffect(() => {
        console.log("user context", state);
      }, [state]);
    return (
        <customerContext.Provider value={[state, dispatch]}>
          {children}
        </customerContext.Provider>
      );
}

