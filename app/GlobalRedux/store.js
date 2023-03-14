'use client';

import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './Features/score/scoreSlice';
import playerReducer from './Features/player/playerSlice';
import settingsReducer from './Features/settings/settingsSlice';
import networkReducer from './Features/network/networkSlice';

export const store = configureStore({
    reducer: {
        score: scoreReducer,
        player: playerReducer,
        settings: settingsReducer,
        network: networkReducer,
    }
})

// DON'T UNCOMMENT: TYPESCRIPT CODE
//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
