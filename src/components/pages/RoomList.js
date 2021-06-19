import React, { useEffect, useRef, useState } from 'react'
import Navigation from '../UI/organisms/Navigation'
import { DataGrid } from '@material-ui/data-grid'
import FullPageLayout from '../UI/templates/FullPageLayout'
import { useDispatch, useSelector } from 'react-redux'
import { addRoom, deleteRoom, fetchRooms, roomsSelector } from '../../store/roomsSlice'
import { Chip, DialogContent, DialogContentText, makeStyles, TextField, Tooltip } from '@material-ui/core'
import { green, orange, pink, blue } from '@material-ui/core/colors';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { Button } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import { v4 as uuid_v4 } from "uuid";

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    buttonWrapper: {
        display: 'flex'
    },
    addRoom: {
        display: 'flex',
        marginTop: '10px',
        marginRight: '10px',
    }
}));

export const colorPick = (sensorType) => {
    switch (sensorType) {
        case 'temperatureSensor': return orange[500];
        case 'carbonDioxideSensor': return green[500];
        case 'humiditySensor': return pink[500];
        default: return blue[500];
    }
}

function RoomList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const roomsData = useSelector(roomsSelector);
    const [addRoomDialog, setAddRoomDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [selectedRoom, setSelectedRoom] = React.useState();
    const newRoomNameRef = useRef(null)

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    useEffect(() => {
        if (roomsData) {
            dispatch(fetchRooms())
        }

    }, [dispatch])

    function renderSensor(sensorData) {
        return sensorData.value.map((sensor) => (
            <div className={classes.chips}>
                <Tooltip title={sensor.sensorType} aria-label="sensor-type-description">
                    <Chip key={uuid_v4()} label={sensor.sensorId} avatar={<SurroundSoundIcon style={{ color: colorPick(sensor.sensorType) }} />} variant="outlined"></Chip>
                </Tooltip>
            </div>));
    }

    let rows = roomsData.map(({ _id, ...otherRoomProps }) => {
        //Mapping issue fix: DataGrid requires 'id' paramter on each row, but API returns '_id'
        return { id: _id, ...otherRoomProps };
    });

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'roomName', headerName: 'Room name', flex: 1 },
        { field: 'sensors', headerName: 'Sensors', flex: 1, sortable: false, renderCell: renderSensor },
    ];

    const handleRoomDelete = () => {
        dispatch(deleteRoom(selectedRoom.id));
        setDeleteDialog(false);
        dispatch(fetchRooms());
    }

    const handleDialogSubmit = () => {
        dispatch(addRoom({ roomName: newRoomNameRef.current.value, sensors: [] }));
        setAddRoomDialog(false);
        dispatch(fetchRooms());
    }

    const roomListTable = () => {
        return (<>
            <DataGrid onRowSelected={(selectedRow) => setSelectedRoom(selectedRow.data)} rows={rows} columns={columns} autoHeight />
            <div className={classes.buttonWrapper}>
                <Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setAddRoomDialog(true)}>Add Room</Button>
                <Tooltip title="Please select row from the table to delete room" aria-label="delete-button-description">
                    <Button className={classes.addRoom} variant="contained" color="secondary" onClick={() => { selectedRoom ? setDeleteDialog(true) : console.log('room is not selected') }}>Delete Room</Button>
                </Tooltip>
            </div></>);
    }

    return (
        <div>
            <Navigation pageTitle="Rooms" />
            <FullPageLayout component={roomListTable()} />
            <Dialog open={addRoomDialog} onClose={() => setAddRoomDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="add-new-room-title">Add Room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new Room please fill following fields:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Room name"
                        type="text"
                        fullWidth
                        inputRef={newRoomNameRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddRoomDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDialogSubmit()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                aria-labelledby="alert-room-delete-dialog"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete room?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is permament. Please confirm that you want to delete this room.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleRoomDelete()} color="secondary" autoFocus>
                        Yes, delete
                    </Button>
                    <Button onClick={() => setDeleteDialog(false)} >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RoomList
