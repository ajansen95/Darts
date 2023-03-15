'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lastThrow: {
        number: 0,
        multiplier: 0,
    }
}

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setLastThrow(state, action) {
            state.lastThrow.number = action.payload.number
            state.lastThrow.multiplier = action.payload.multiplier
        },
        resetLastThrow(state) {
            state.lastThrow.number = 0
            state.lastThrow.multiplier = 0
        }
    },
})

export const { setLastThrow, resetLastThrow } = scoreSlice.actions
export default scoreSlice.reducer