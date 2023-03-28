import { createContext, useEffect, useReducer,useState } from "react";


export const BookingContext = createContext()

const intialValue = []

const reducer = (state,action) =>{
     console.log(action.type)
    switch(action.type){
            case "ADD_BOOKING":
                return [...state,action.payload]

            case "DELETE_BOOKING" :
                return state.filter((customer)=> customer.customer_id !== action.payload)
            case "UPDATE_BOOKING" :
              return [...state,action.payload]
            default : return state
    }
}

export const BookingContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, intialValue);
    
    useEffect(() => {
        console.log("Booking context", state);
      }, [state]);
    return (
        <BookingContext.Provider value={[state, dispatch]}>
          {children}
        </BookingContext.Provider>
      );
}

