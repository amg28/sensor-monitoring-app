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

export const addRoom = createAsyncThunk('rooms/addRoom', async (newRoomObject, thunkAPI) => {
    console.log(newRoomObject,'newRoomObject');
    const response = await axios.put('/sensors',newRoomObject)
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (roomId, thunkAPI) => {
    await axios.delete('/sensors', {data:{roomId: roomId}})
})

export const fetchRooms = createAsyncThunk('rooms/fetch', async () => {
    const response = await axios.get('/sensors')
    return response.data;
})

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

    return resultData;
})

export const addWarning = createAsyncThunk('warnings/addWarnings', async (newWarningObject, { getState }) => {
    const {roomName, warning} = newWarningObject;
    const store = getState();
    const room = store.rooms.roomsData.filter((room) => room.roomName === roomName)[0];
    const roomId = room._id;
    const workingObject = {roomId: roomId, warnings: [...room.warnings, {warningText: warning.warningText, threshold: warning.warningThreshold}]};
    const response = await axios.put('/sensors/warnings', workingObject);
})

export const deleteWarning = createAsyncThunk('warnings/deleteWarnings', async (deletedWarningObject, { getState }) => {
    const {roomName, warningId} = deletedWarningObject;
    const store = getState();
    const room = store.rooms.roomsData.filter((room) => room.roomName === roomName)[0];
    const updatedWarningsList = room.warnings.filter((warning) => warning._id !== warningId);
    const workingObject = {roomId: room._id, warnings: [...updatedWarningsList]};
    const response = await axios.put('/sensors/warnings', workingObject);
})

export const addSensorWarning = createAsyncThunk('warnings/addSensorWarnings', async (newWarningObject, { getState }) => {
    const {roomName, sensorId, warning} = newWarningObject;
    const store = getState();
    const room = store.rooms.roomsData.filter((room) => room.roomName === roomName)[0];
    const roomId = room._id;
    const sensor = room.sensors.filter((si) => si.sensorId === sensorId)[0];
    const response = await axios.put('/sensors/warnings', {roomId: roomId, sensorId: sensor._id, warnings: [...sensor.warnings, {warningText: warning.warningText, threshold: warning.warningThreshold}]});
})

export const deleteSensorWarning = createAsyncThunk('warnings/deleteSensorWarnings', async (deletedWarningObject, { getState }) => {
    const {roomName, sensorId, warningId} = deletedWarningObject;
    const store = getState();
    const room = store.rooms.roomsData.filter((room) => room.roomName === roomName)[0];
    const sensor = room.sensors.filter((si) => si._id === sensorId)[0];
    const updatedWarningsList = sensor.warnings.filter((warning) => warning._id !== warningId);
    const response = await axios.put('/sensors/warnings', {roomId: room._id, sensorId: sensorId, warnings: [...updatedWarningsList]});
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