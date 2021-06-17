import React, { useEffect, useRef } from 'react'
import Navigation from '../UI/organisms/Navigation'
import { DataGrid } from '@material-ui/data-grid'
import FullPageLayout from '../UI/templates/FullPageLayout'
import { useDispatch, useSelector } from 'react-redux'
import { addRoom, fetchRooms, roomsSelector } from '../../store/roomsSlice'
import { Chip, DialogContent, DialogContentText, makeStyles, TextField, Tooltip } from '@material-ui/core'
import { green, orange, pink, blue } from '@material-ui/core/colors';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { Button } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    addRoom: {
        display: 'flex',
        marginTop: '10px'
    }
}));

function RoomList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const roomsData = useSelector(roomsSelector);
    const [open, setOpen] = React.useState(false);
    const newRoomNameRef = useRef(null)

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

    const handleDialogSubmit = () => {
        dispatch(addRoom({roomName: newRoomNameRef.current.value, sensors: []}));
        setOpen(false);
        dispatch(fetchRooms());
    }

    return (
        <div>
            <Navigation pageTitle="Rooms" />
            <FullPageLayout component={(<><DataGrid rows={rows} columns={columns} autoHeight /><Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setOpen(true)}>Add new Room</Button></>)} />
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
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
                <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleDialogSubmit()} color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RoomList
