import { configureStore } from '@reduxjs/toolkit'

import roomReducer from './roomsSlice'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    rooms: roomReducer,
  }
})

export default store