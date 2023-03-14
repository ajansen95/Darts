'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import {useState, createContext} from "react";


export const SocketContext = createContext(undefined)

export function Providers({ children }) {
    const [socketConn, setSocketConn] = useState(null)

    return (
        <>
            <SocketContext.Provider value={[socketConn, setSocketConn]}>
                <Provider store={store}>
                    {children}
                </Provider>
            </SocketContext.Provider>
        </>
    )
}