'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    backendIp: null,
    socketConnection: null
}

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setBackendIp(state, action) {
            state.backendIp = action.payload
        },
        setSocketConnection(state, action) {
            state.socketConnection = action.payload
        }
    },
})


export const { setBackendIp, setSocketConnection } = networkSlice.actions
export default networkSlice.reducer