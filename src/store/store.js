import { configureStore } from '@reduxjs/toolkit'

import roomReducer from './roomsSlice'
import warningsReducer from './warningsSlice'


const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    rooms: roomReducer,
    warnings: warningsReducer,
  }
})

export default store