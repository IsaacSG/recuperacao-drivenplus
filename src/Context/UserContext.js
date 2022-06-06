import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProv ({children}) {
    const [user, setUser] = useState({});
    const [plan, setPlan] = useState({});
    const [myperks, setMyperks] = useState([]);

    return (

        <UserContext.Provider value ={{user, setUser, plan, setPlan, myperks, setMyperks}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext