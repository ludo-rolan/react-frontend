import React, { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext(null);

const useContextHook = () => {
    const [currentUser, setCurrentUser] = useState(null);
    
    return <>
        <CurrentUserContext.Provider 
            value={null}
        >

        </CurrentUserContext.Provider>
    </>;
}

export default useContextHook;
