import { Button, makeStyles, Typography, Tooltip, Dialog, DialogTitle, DialogContent, Chip, DialogContentText, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSensorWarning, addWarning, deleteSensorWarning, deleteWarning, fetchRooms, roomsSelector } from '../../../store/roomsSlice';
import { v4 as uuid_v4 } from "uuid";
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { colorPick } from '../../pages/RoomList';

const useStyles = makeStyles((theme) => ({
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

function WarningSensorConfigurationTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [addDialog, setAddDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState();
    const newWarningTextRef = useRef(null)
    const newWarningThresholdRef = useRef(null)
    const newSensorRef = useRef(null)

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    const sensorData = useSelector(roomsSelector);
    let availableRooms = [];
    let availableRoomSensors = [];

    let rows = sensorData.map((room) => 
        {
        const roomName = room.roomName;
        availableRooms.push(roomName);
            return room.sensors ? room.sensors.map((sensor) => {
                    availableRoomSensors.push(`[${roomName}] - ${sensor.sensorId}`);
                return sensor.warnings ? sensor.warnings.map((warning) => {
                    return  {id: warning._id, warningText: warning.warningText, threshold: warning.threshold, sensor: sensor, roomName: roomName};
                }) : '';
            }).flat().filter(v => v!=='') : '';
        }).flat().filter(v => v!=='');

    function renderSensor(sensor) {
        return (
            <div className={classes.chips}>
                <Tooltip title={sensor.row.sensor.sensorType} aria-label="sensor-type-description">
                    <Chip key={uuid_v4()} label={sensor.row.sensor.sensorId} avatar={<SurroundSoundIcon style={{ color: colorPick(sensor.row.sensor.sensorType) }} />} variant="outlined"></Chip>
                </Tooltip>
            </div>);
    }

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1.5 },
        { field: 'warningText', headerName: 'Text', flex: 1.5 },
        { field: 'threshold', headerName: 'Threshold', flex: 1 },
        { field: 'sensor', headerName: 'Sensor id', flex: 1 , renderCell: renderSensor},
        { field: 'roomName', headerName: 'Room name', flex: 1 }
    ];


    const handleRoomDelete = () => {
        dispatch(deleteSensorWarning({roomName: selectedRow.roomName, sensorId: selectedRow.sensor._id, warningId: selectedRow.id}));
        setDeleteDialog(false);
        dispatch(fetchRooms());
    }

    const handleDialogSubmit = () => {
        const warningText = newWarningTextRef.current.value;
        const warningThreshold = newWarningThresholdRef.current.value;
        const sensor = newSensorRef.current.value;
        const roomName = sensor.slice(1,sensor.indexOf(']'));
        const sensorId = sensor.slice(sensor.indexOf('-')+2);
        const resultObject = { roomName: roomName, sensorId:sensorId, warning: {warningText: warningText, warningThreshold: warningThreshold} };
        dispatch(addSensorWarning(resultObject));
        setAddDialog(false);
        dispatch(fetchRooms());
    }

    return (
        <div>
            <Typography variant="h6" strong>Sensors</Typography>
            <DataGrid onRowSelected={(selectedRow) => setSelectedRow(selectedRow.data)} rows={rows} columns={columns} autoHeight />
            <div className={classes.buttonWrapper}>
                    <Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setAddDialog(true)}>Add Sensor warning</Button>
                    <Tooltip title="Please select row from the table to delete warning" aria-label="delete-button-description">
                        <Button className={classes.addRoom} variant="contained" color="secondary" 
                        onClick={() => { selectedRow ? setDeleteDialog(true) : console.warn('warning is not selected') }}>Delete Room warning
                        </Button>
                    </Tooltip>
            </div>

            <Dialog open={addDialog} onClose={() => setAddDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="add-new-room-title">Add Sensor warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new Sensor warning please fill following fields:
                    </DialogContentText>
                    <div className={classes.dialogWrapper}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="warningText"
                            label="Warning text"
                            type="text"
                            fullWidth
                            inputRef={newWarningTextRef}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="threshold"
                            label="Threshold"
                            type="text"
                            fullWidth
                            className={classes.dialogField}
                            inputRef={newWarningThresholdRef}
                        />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="room-select">Assign to Sensor</InputLabel>
                            <Select
                                labelId="room-select"
                                id="room-select-demo"
                                options={availableRoomSensors}
                                label="Select room"
                                fullWidth
                                inputRef={newSensorRef}
                                className={classes.dialogField}
                            >
                            {availableRoomSensors.map((roomName) => { return (<MenuItem value={roomName}>{roomName}</MenuItem>)})}
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

export default WarningSensorConfigurationTable
