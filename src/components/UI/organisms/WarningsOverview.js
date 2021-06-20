import { Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, roomsSelector } from '../../../store/roomsSlice';
import { fetchWarnings } from '../../../store/warningsSlice';

function WarningsOverview() {

    const dispatch = useDispatch();
    const sensorData = useSelector(roomsSelector);

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

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
            Test
            <Typography variant="h4" strong>Configuration</Typography>
            <DataGrid rows={rows} columns={columns} autoHeight />
        </div>
    )
}

export default WarningsOverview
