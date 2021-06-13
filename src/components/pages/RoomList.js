import React, { useEffect } from 'react'
import Navigation from '../UI/organisms/Navigation'
import { DataGrid, useGridApiRef } from '@material-ui/data-grid'
import FullPageLayout from '../UI/templates/FullPageLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms, roomsSelector } from '../../store/roomsSlice'
import { Chip, makeStyles, Tooltip } from '@material-ui/core'
import { green, orange, pink, blue } from '@material-ui/core/colors';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

function RoomList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const roomsData = useSelector(roomsSelector);

    console.log(roomsData,'roomsData')

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    const colorPick = (sensorType) => {
        switch (sensorType) {
            case 'temperatureSensor': return orange[500];
            case 'carbonDioxideSensor': return green[500];
            case 'humiditySensor': return pink[500];
            default: return blue[500];
        }
    }

    function renderSensor(sensorData) {
        return sensorData.value.map((sensor) => (
            <div className={classes.chips}>
                <Tooltip title={sensor.sensorType} aria-label="sensor-type-description">
                    <Chip label={sensor.sensorId} avatar={<SurroundSoundIcon style={{ color: colorPick(sensor.sensorType) }} />} variant="outlined"></Chip>
                </Tooltip>
            </div>));
    }

    const rows = roomsData.map(({ _id, ...otherRoomProps }) => {
        //Mapping issue fix: DataGrid requires 'id' paramter on each row, but API returns '_id'
        return { id: _id, ...otherRoomProps };
    });

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'roomName', headerName: 'Room name', flex: 1 },
        { field: 'sensors', headerName: 'Sensors', flex: 1, sortable: false, renderCell: renderSensor },
    ];

    return (
        <div>
            <Navigation pageTitle="Rooms" />
            <FullPageLayout component={<DataGrid rows={rows} columns={columns} autoHeight />} />
        </div>
    )
}

export default RoomList
