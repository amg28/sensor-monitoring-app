import React, { useEffect } from 'react'
import Navigation from '../UI/organisms/Navigation'
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, roomsSelector } from '../../store/roomsSlice';
import FullPageLayout from '../UI/templates/FullPageLayout';

function SensorList() {

    const dispatch = useDispatch();
    const sensorData = useSelector(roomsSelector);

    useEffect(() => {
        dispatch(fetchRooms())
    }, [])

    const rows = sensorData.map(({ sensors, roomName }) => {
        return sensors.map(
            ({ _id, ...sensorParams }) => {
                 return { ...sensorParams, id: _id, room: roomName } })
    }).flat();

    const columns = [
        { field: 'id', headerName: 'Database id', flex: 1 },
        { field: 'sensorId', headerName: 'Sensor id', flex: 1 },
        { field: 'sensorType', headerName: 'Sensor type', flex: 1 },
        { field: 'room', headerName: 'Assigned to room', flex: 1 }
    ];

    return (
        <div>
            <Navigation pageTitle="Sensors" />
            <div style={{ height: 300, width: '100%' }}>
                <FullPageLayout component={<DataGrid rows={rows} columns={columns} autoHeight />} />
            </div>
        </div>
    )
}

export default SensorList
