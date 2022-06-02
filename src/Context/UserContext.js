import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProv ({children}) {
    const [user, setUser] = useState({});

    return (

        <UserContext.Provider value ={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext