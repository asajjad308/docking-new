import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import getSession from '../../lib/session';
type context = {
    session: User;
    setSession: Dispatch<SetStateAction<string>>
}
const SessionContext = createContext<context | undefined>(undefined);

export default function SessionProvider ({children} :any) {
    const [session, setSession] = useState(getSession());
    const context = {session, setSession}
    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
} 

export const useSession = () => {
    const context = useContext(SessionContext)
    return context;
}