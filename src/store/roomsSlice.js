import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import Floor1 from "../components/UI/atoms/Floor1"

const initialState = {
    sensorType: '',
    dateTimeFrom: '',
    dateTimeTo: '',
    selectedRooms: [],
    roomsData: [],
    sensorsData: [],
    precision: 'days',
    actualFloor: 0
}

export const fetchRooms = createAsyncThunk('rooms/fetch', async () => {
    const response = await axios.get('/sensors')
    return response.data;
})

export const addNewSensor = createAsyncThunk('sensors', async (dispatch, { getState }) => {
    const store = getState();
    const { sensorType, selectedRooms } = store.rooms;
 
    const resultData = [];
    for(let room of selectedRooms){
        const request = axios.post(`/sensorValues?sensorType=${sensorType}&roomId=${room._id}`);
        const {data: requestData} = await request;
    }
})

export const fetchSensor = createAsyncThunk('sensors/fetch', async (dispatch, { getState }) => {
    const store = getState();
    const { sensorType, dateTimeFrom, dateTimeTo, selectedRooms } = store.rooms;
 
    const resultData = [];
    for(let room of selectedRooms){
        const request = axios.get(`/sensorValues?sensorType=${sensorType}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}&roomId=${room._id}`);
        const {data: requestData} = await request;
        resultData.push({[room.roomName] : [requestData]});
    }
    // const roomOne = axios.get(`/sensorValues?sensorType=${sensorType}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}&roomId=${selectedRooms[0]._id}`);
    // const roomTwo = axios.get(`/sensorValues?sensorType=${sensorType}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}&roomId=${selectedRooms[1]._id}`);

    // const {data: roomOneData} = await roomOne;
    // const {data: roomTwoData} = await roomTwo;

    return resultData;
})

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        updateSensorType(state, action) {
            return { ...state, sensorType: action.payload }
        },

        updateFromDateTime(state, action) {
            return { ...state, dateTimeFrom: action.payload }
        },

        updateToDateTime(state, action) {
            return { ...state, dateTimeTo: action.payload }
        },

        updateSelectedRooms(state, action) {
            return { ...state, selectedRooms: action.payload }
        },

        updatePrecision(state, action) {
            return { ...state, precision: action.payload }
        },

        updateActualFloor(state, action) {
            return { ...state, actualFloor: action.payload }
        }
    },
    extraReducers: {
        [fetchRooms.fulfilled]: (state, action) => {
            return { ...state, roomsData: action.payload }
        },
        [fetchSensor.fulfilled]: (state, action) => {
            return { ...state, sensorsData: action.payload }
        }
    }
})

export const { updateSensorType, updateFromDateTime, updateToDateTime, updateSelectedRooms, updatePrecision, updateActualFloor } = roomsSlice.actions
export const roomsSelector = (state) => state.rooms.roomsData;
export const selectedRoomsSelector = (state) => state.rooms.selectedRooms;
export const sensorDataSelector = (state) => state.rooms.sensorsData;
export const precisionSelector = (state) => state.rooms.precision;
export const actualFloorSelector = (state) => state.rooms.actualFloor;
export default roomsSlice.reducer