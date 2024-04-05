import React, { useCallback } from "react";


interface Props {
    productId: number,
    referrer: string,
    theme: string
}


// useCallback is a React Hook that lets 
// you cache a function definition between re-renders.
const useCallbackHook = ({ productId, referrer, theme }: Props) => { 
    const handleSubmit = useCallback((orderDetails: any) => {
     post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
     });   
    }, [productId, referrer]);
    return <>
        <h1>useCallbackHook</h1>
    </>;
}

export default useCallbackHook;

function post(arg0: string, arg1: { referrer: string; orderDetails: any; }) {
    throw new Error("Function not implemented.");
}
