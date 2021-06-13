import { Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { WarningSharp } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, roomsSelector } from '../../../store/roomsSlice';
import { fetchWarnings } from '../../../store/warningsSlice';

function WarningsConfiguration() {

    const dispatch = useDispatch();
    const sensorData = useSelector(roomsSelector);

    useEffect(() => {
        dispatch(fetchWarnings())
    }, [dispatch])

    const rows = [];

const columns = [
    { field: 'id', headerName: 'Database id', flex: 1 },
    { field: 'sensorId', headerName: 'Sensor id', flex: 1 },
    { field: 'sensorType', headerName: 'Sensor type', flex: 1 },
    { field: 'room', headerName: 'Assigned to room', flex: 1 }
];

return (
    <div>
        <Typography variant="h4" strong>Configuration</Typography>
        <DataGrid rows={rows} columns={columns} autoHeight />
    </div>
)
}

export default WarningsConfiguration
