'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activePlayer: 1,
    scores: {
        player1: 301,
        player2: 301,
        player3: 301,
        player4: 301
    },
    throwsCurrentPlayer: 0
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        nextPlayer(state) {
            if (state.activePlayer === 4)
                state.activePlayer = 1;
            else
                state.activePlayer += 1;
            state.throwsCurrentPlayer = 0;
        },
        increaseThrows(state) {
            state.throwsCurrentPlayer +=1;
        },
        decreasePlayerPoints(state, action) {
            switch(state.activePlayer) {
                case 1:
                    state.scores.player1 -= action.payload
                    break;
                case 2:
                    state.scores.player2 -= action.payload
                    break;
                case 3:
                    state.scores.player3 -= action.payload
                    break;
                case 4:
                    state.scores.player4 -= action.payload
                    break;
                default:
                    console.log("player index does not exist")
            }
        }
    },
})

export const { nextPlayer, increaseThrows, decreasePlayerPoints } = playerSlice.actions
export default playerSlice.reducer