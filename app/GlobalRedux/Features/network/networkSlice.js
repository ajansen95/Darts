'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    backendIp: null,
}

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setBackendIp(state, action) {
            state.backendIp = action.payload
        }
    },
})


export const { setBackendIp, setSocketConnection } = networkSlice.actions
export default networkSlice.reducer