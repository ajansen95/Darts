'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activePlayer: 1,
    scores: {
        player1: 301,
        player2: 301,
        player3: 301,
        player4: 301
    }
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        nextPlayer(state, action) {
            if (state.activePlayer === 4)
                state.activePlayer = 1;
            else
                state.activePlayer += 1;
        },
    },
})

export const { nextPlayer } = playerSlice.actions
export default playerSlice.reducer