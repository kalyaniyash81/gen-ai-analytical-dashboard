import { configureStore } from '@reduxjs/toolkit'
import queriesReducer from './features/queries/queriesSlice.js'

export const store = configureStore({
  reducer: {
    queries: queriesReducer
  }
})