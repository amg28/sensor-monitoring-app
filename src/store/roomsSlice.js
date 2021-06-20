import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

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

export const addRoom = createAsyncThunk('rooms/addRoom', async (newRoomObject, thunkAPI) => {
    console.log(newRoomObject,'newRoomObject');
    const response = await axios.put('/sensors',newRoomObject)
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (roomId, thunkAPI) => {
    await axios.delete('/sensors', {data:{roomId: roomId}})
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


// {
// 	"roomId": "60cbd0f5018865001d62390f",
// 	"roomName": "POIC_7",
//   "sensors": [
//     {
//       "sensorType": "temperatureSensor",
//       "sensorId": "1234"
//     },
// 		    {
//       "sensorType": "temperatureSensor",
//       "sensorId": "1234"
//     },
// 		    {
//       "sensorType": "temperatureSensor",
//       "sensorId": "1234"
//     }
//   ]
// }

export const addSensor = createAsyncThunk('sensors/addSensor', async (newSensorObject, { getState }) => {
    const {roomName, sensor} = newSensorObject;
    const store = getState();
    const room = store.rooms.roomsData.filter((room) => room.roomName === roomName)[0];
    const object = {roomId: room._id, roomName: roomName, sensors: [...room.sensors, sensor]};
    await axios.put('/sensors', object)
})

export const deleteSensor = createAsyncThunk('sensors/addSensor', async (sensor, { getState }) => {
    const {_id, roomName, sensors} = getState().rooms.roomsData.filter((room) => room.roomName === sensor.room)[0];
    const sensorList = sensors.filter((s) => s._id !== sensor.id)
    await axios.put('/sensors', {roomId: _id, roomName: roomName, sensors: sensorList})
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
        },
        [fetchSensor.rejected]: (state, action) => {
            return { ...state, roomsData: action.payload }
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