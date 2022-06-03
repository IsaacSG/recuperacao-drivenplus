import { createContext, useState } from "react";

const PlanContext = createContext();

export function PlanProv ({children}) {
    const [plan, setPlan] = useState({});

    return (

        <PlanContext.Provider value ={{plan, setPlan}}>
            {children}
        </PlanContext.Provider>
    );
}

export default PlanContext