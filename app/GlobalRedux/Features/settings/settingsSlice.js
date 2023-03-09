'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleSettingsOpen(state) {
            state.open = !state.open
        }
    },
})

export const { toggleSettingsOpen  } = settingsSlice.actions
export default settingsSlice.reducer
