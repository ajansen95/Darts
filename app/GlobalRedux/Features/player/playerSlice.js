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
    throwsCurrentPlayer: 0,
    gameModal: {
        open: false
    },
    playerWonModal:{
        open: false,
        player: null,
    },
    gameFinished: false
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        toggleGameModal(state) {
            state.gameModal.open = !state.gameModal.open
        },
        newGame(state) {
            Object.keys(state.scores).forEach(k => state.scores[k] = 301)
            state.throwsCurrentPlayer = 0
            state.activePlayer = 1
            state.gameFinished = false
        },
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
                    if ((state.scores.player1 - action.payload) <= 0) {
                        state.scores.player1 = 0
                        state.gameFinished = true
                    } else
                        state.scores.player1 -= action.payload
                    break;
                case 2:
                    if ((state.scores.player2 - action.payload) <= 0) {
                        state.scores.player2 = 0
                        state.gameFinished = true
                    } else
                        state.scores.player2 -= action.payload
                    break;
                case 3:
                    if ((state.scores.player3 - action.payload) <= 0) {
                        state.scores.player3 = 0
                        state.gameFinished = true
                    } else
                        state.scores.player3 -= action.payload
                    break;
                case 4:
                    if ((state.scores.player4 - action.payload) <= 0) {
                        state.scores.player4 = 0
                        state.gameFinished = true
                    } else
                        state.scores.player4 -= action.payload
                    break;
                default:
                    console.log("player index does not exist")
            }
        },
        setPlayerPointsToZero(state) {
            switch (state.activePlayer) {
                case 1:
                    state.scores.player1 = 0
                    break;
                case 2:
                    state.scores.player2 = 0
                    break;
                case 3:
                    state.scores.player3 = 0
                    break;
                case 4:
                    state.scores.player4 = 0
                    break;
                default:
                    console.log("player index does not exist")
            }
        },
        showPlayerWonModal(state) {
            state.playerWonModal.player = state.activePlayer
            state.playerWonModal.open = !state.playerWonModal.open
        },
        togglePlayerWonModal(state) {
            state.playerWonModal.open = !state.playerWonModal.open
        }
    },
})

export const { nextPlayer, increaseThrows, decreasePlayerPoints, newGame, toggleGameModal, showPlayerWonModal, togglePlayerWonModal } = playerSlice.actions
export default playerSlice.reducer
