import React, { useEffect, useRef } from 'react'
import Navigation from '../UI/organisms/Navigation'
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addSensor, deleteSensor, fetchRooms, roomsSelector, sensorDataSelector } from '../../store/roomsSlice';
import FullPageLayout from '../UI/templates/FullPageLayout';
import { Checkbox, DialogContent, DialogContentText, FormControl, ListItemText, makeStyles, MenuItem, Select, TextField, Tooltip, Chip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { colorPick } from './RoomList';
import { v4 as uuid_v4 } from "uuid";
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
    dialogWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    dialogField: {
        marginBottom: '20px'
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

function SensorList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sensorData = useSelector(roomsSelector);
    const [addDialog, setAddDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [selectedSensor, setSelectedSensor] = React.useState();
    const newSensorIdRef = useRef(null)
    const newSensorTypeRef = useRef(null)
    const newSensorRoomRef = useRef(null)
    let availableRooms = [];

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    let rows = sensorData.map(({ sensors, roomName }) => {

        availableRooms.push(roomName);

        return sensors.map(
            ({ _id, ...sensorParams }) => {
                return { ...sensorParams, id: _id, room: roomName }
            })
    }).flat();

    function renderSensor(sensor) {
        return (
            <div className={classes.chips}>
                <Tooltip title={sensor.row.sensorType} aria-label="sensor-type-description">
                    <Chip key={uuid_v4()} label={sensor.row.sensorId} avatar={<SurroundSoundIcon style={{ color: colorPick(sensor.row.sensorType) }} />} variant="outlined"></Chip>
                </Tooltip>
            </div>);
    }

    const columns = [
        { field: 'id', headerName: 'Database id', flex: 1 },
        { field: 'sensorId', headerName: 'Sensor id', flex: 1, renderCell: renderSensor },
        { field: 'sensorType', headerName: 'Sensor type', flex: 1 },
        { field: 'room', headerName: 'Assigned to room', flex: 1 }
    ];

    const handleRoomDelete = () => {
        dispatch(deleteSensor(selectedSensor));
        setDeleteDialog(false);
        dispatch(fetchRooms());
    }

    const handleDialogSubmit = () => {
        const sensorId = newSensorIdRef.current.value;
        const sensorType = newSensorTypeRef.current.value;
        const roomName = newSensorRoomRef.current.value;
        dispatch(addSensor({ roomName: roomName, sensor: {sensorId: sensorId, sensorType: sensorType} }));
        setAddDialog(false);
        dispatch(fetchRooms());
    }

    const sensorListTable = () => {
        return (
        <>
            <DataGrid onRowSelected={(selectedRow) => setSelectedSensor(selectedRow.data)} rows={rows} columns={columns} autoHeight />
            <div className={classes.buttonWrapper}>
                <Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setAddDialog(true)}>Add Sensor</Button>
                <Tooltip title="Please select row from the table to delete sensor" aria-label="delete-button-description">
                    <Button className={classes.addRoom} variant="contained" color="secondary" onClick={() => { selectedSensor ? setDeleteDialog(true) : console.log('sensor is not selected') }}>Delete sensor</Button>
                </Tooltip>
            </div>
        </>
        );
    }


        return (
        <div>
            <Navigation pageTitle="Sensors" />
            <div style={{ height: 300, width: '100%' }}>
                <FullPageLayout component={sensorListTable()} />
            </div>
            <Dialog open={addDialog} onClose={() => setAddDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="add-new-sensor-title">Add Sensor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new Sensor please fill following fields:
                    </DialogContentText>
                    <div className={classes.dialogWrapper}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Sensor id"
                            type="text"
                            fullWidth
                            inputRef={newSensorIdRef}
                            className={classes.dialogField}
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Select Measurement type</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                options={['carbonDioxideSensor', 'temperatureSensor', 'humiditySensor']}
                                label="Select Sensor"
                                fullWidth
                                inputRef={newSensorTypeRef}
                                className={classes.dialogField}
                            >
                                <MenuItem value={'carbonDioxideSensor'}>Carbon Dioxide</MenuItem>
                                <MenuItem value={'temperatureSensor'}>Temperature</MenuItem>
                                <MenuItem value={'humiditySensor'}>Humidity</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="room-select">Assign to Room</InputLabel>
                            <Select
                                labelId="room-select"
                                id="room-select-demo"
                                options={availableRooms}
                                label="Select room"
                                fullWidth
                                inputRef={newSensorRoomRef}
                                className={classes.dialogField}
                            >
                                {availableRooms.map((roomName) => { return (<MenuItem value={roomName}>{roomName}</MenuItem>)})}
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialog(false)} color="primary">
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
                <DialogTitle id="alert-dialog-title">{"Delete sensor?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is permament. Please confirm that you want to delete this sensor.
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

    export default SensorList
