import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    sensorType: '',
    dateTimeFrom: '',
    dateTimeTo: '',
    roomId: []
}

export const fetchRooms = createAsyncThunk('rooms/fetch', async () => {
    const response = await axios.get('/sensors')
    return response.data;
})

export const fetchSensor = createAsyncThunk('sensors/fetch', async () => {
    const {sensorType, dateTimeFrom, dateTimeTo, roomId} = {};
    const response = await axios.get(`/sensorValues?sensorType=${sensorType}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}&roomId=${roomId}`)
    return response.data;
})

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        updateSensorType(state, action) {
            return { ...state, sensorType: action.payload}
        },

        updateFromDateTime(state, action) {
            return { ...state, dateTimeFrom: action.payload}
        },

        updateToDateTime(state, action) {
            return { ...state, dateTimeTo: action.payload}
        },

        updateRoomId(state, action) {
            return { ...state, roomId: action.payload}
        },
    },
    extraReducers: {
        [fetchRooms.fulfilled]: (state, action) => {
          return {...state, roomsData: action.payload}
        }
    }
})

export const {updateSensorType, updateFromDateTime, updateToDateTime, updateRoomId} = roomsSlice.actions
export const roomsSelector = (state) => state.rooms.roomsData;
export default roomsSlice.reducer