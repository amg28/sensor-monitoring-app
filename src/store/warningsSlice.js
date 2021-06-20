// import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
// import axios from 'axios'
// import { normalize, schema } from 'normalizr'

// const initialState = {
//     sensorType: '',
//     dateTimeFrom: '',
//     dateTimeTo: '',
//     warningsData: []
// }

// // export const fetchRooms = createAsyncThunk('rooms/fetch', async () => {
// //     const response = await axios.get('/sensors')
// //     return response.data;
// // })
// const warnings = new schema.Entity('warnings', {}, {idAttribute: '_id'});
// const sensors = new schema.Entity('sensors',{}, {idAttribute: '_id'});
// const warningsData = new schema.Entity('warningsData', {
//     sensorValue: sensors,
//     sensorWarning: warnings
// });

// const warningsAdapter = createEntityAdapter();

// export const fetchWarnings = createAsyncThunk('warnings/fetch', async () => {
//     const response = await axios.get('/sensors/warnings');

//     const normalized = normalize(response.data, [warningsData])
//     console.log(response.data, 'response')
//     console.log(normalized, 'normalized')
//     return normalized.entities;
// })

// export const fetchSensor = createAsyncThunk('sensors/fetch', async (dispatch, { getState }) => {
//     const store = getState();
//     const { sensorType, dateTimeFrom, dateTimeTo, selectedRooms } = store.rooms;
 
//     const resultData = [];
//     for(let room of selectedRooms){
//         const request = axios.get(`/sensorValues?sensorType=${sensorType}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}&roomId=${room._id}`);
//         const {data: requestData} = await request;
//         resultData.push({[room.roomName] : [requestData]});
//     }

//     return resultData;
// })

// const warningsSlice = createSlice({
//     name: 'warnings',
//     initialState,
//     reducers: {
//         // updateSensorType(state, action) {
//         //     return { ...state, sensorType: action.payload }
//         // },
//     },
//     extraReducers: {
//         [fetchWarnings.fulfilled]: (state, action) => {
//             // warningsAdapter.upsertMany(state, action.payload.warnings)
//                        return { ...state, warnings: action.payload }
//         }
//     }
// })

// // export const { updateSensorType, updateFromDateTime, updateToDateTime, updateSelectedRooms, updatePrecision } = roomsSlice.actions
// // export const roomsSelector = (state) => state.rooms.roomsData;
// export default warningsSlice.reducer