import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    sensorType: '',
    dateTimeFrom: '',
    dateTimeTo: '',
    selectedRooms: [],
    roomsData: [],
    sensorsData: [],
    precision: 'days'
}

export const fetchRooms = createAsyncThunk('rooms/fetch', async () => {
    const response = await axios.get('/sensors')
    return response.data;
})

export const fetchSensor = createAsyncThunk('sensors/fetch', async (dispatch, {getState}) => {
    const store = getState();
    const {sensorType, dateTimeFrom, dateTimeTo} = store.rooms;
    const response = await axios.get(`/sensorValues?sensorType=${sensorType}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}&roomId=60a2d9c145e9ba001d543749`)
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

        updateSelectedRooms(state, action) {
            return { ...state, selectedRooms: action.payload}
        },

        updatePrecision(state, action) {
            return {...state, precision: action.payload}
        }
    },
    extraReducers: {
        [fetchRooms.fulfilled]: (state, action) => {
          return {...state, roomsData: action.payload}
        },
        [fetchSensor.fulfilled]: (state, action) => {
            return {...state, sensorsData: action.payload}
          }
    }
})

export const {updateSensorType, updateFromDateTime, updateToDateTime, updateSelectedRooms, updatePrecision} = roomsSlice.actions
export const roomsSelector = (state) => state.rooms.roomsData;
export const selectedRoomsSelector = (state) => state.rooms.selectedRooms;
export const sensorDataSelector = (state) => state.rooms.sensorsData;
export const precisionSelector = (state) => state.rooms.precision;
export default roomsSlice.reducer