'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import scoreReducer from './Features/score/scoreSlice';
import playerReducer from './Features/player/playerSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        score: scoreReducer,
        player: playerReducer,
    }
})

// DON'T UNCOMMENT: TYPESCRIPT CODE
//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;