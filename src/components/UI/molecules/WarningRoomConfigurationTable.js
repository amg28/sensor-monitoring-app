import { Button, makeStyles, Typography, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addWarning, deleteWarning, fetchRooms, roomsSelector } from '../../../store/roomsSlice';

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

function WarningRoomConfigurationTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [addDialog, setAddDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState();
    const newWarningTextRef = useRef(null)
    const newWarningThresholdRef = useRef(null)
    const newSensorRoomRef = useRef(null)

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    const sensorData = useSelector(roomsSelector);
    let availableRooms = [];

    let rows = sensorData.map((room) => {
        const roomId = room._id;
        const roomName = room.roomName;
        availableRooms.push(roomName);
        return room.warnings ? room.warnings.map((warning) => {
            return  {id: warning._id, warningText: warning.warningText, threshold: warning.threshold, roomName: roomName, roomId: roomId};
        }) : '';
    }).flat().filter(v => v!=='');

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1.5 },
        { field: 'warningText', headerName: 'Text', flex: 1.5 },
        { field: 'threshold', headerName: 'Threshold', flex: 1 },
        { field: 'roomName', headerName: 'Room name', flex: 1 }
    ];


    const handleRoomDelete = () => {
        dispatch(deleteWarning({roomName: selectedRow.roomName, warningId: selectedRow.id}));
        setDeleteDialog(false);
        dispatch(fetchRooms());
    }

    const handleDialogSubmit = () => {
        const warningText = newWarningTextRef.current.value;
        const warningThreshold = newWarningThresholdRef.current.value;
        const roomName = newSensorRoomRef.current.value;
        dispatch(addWarning({ roomName: roomName, warning: {warningText: warningText, warningThreshold: warningThreshold} }));
        setAddDialog(false);
        dispatch(fetchRooms());
    }

    return (
        <div>
            <Typography variant="h6" strong>Rooms</Typography>
            <DataGrid onRowSelected={(selectedRow) => setSelectedRow(selectedRow.data)} rows={rows} columns={columns} autoHeight />
            <div className={classes.buttonWrapper}>
                    <Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setAddDialog(true)}>Add Room warning</Button>
                    <Tooltip title="Please select row from the table to delete warning" aria-label="delete-button-description">
                        <Button className={classes.addRoom} variant="contained" color="secondary" 
                        onClick={() => { selectedRow ? setDeleteDialog(true) : console.warn('warning is not selected') }}>Delete Room warning
                        </Button>
                    </Tooltip>
            </div>

            <Dialog open={addDialog} onClose={() => setAddDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="add-new-room-title">Add Room warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new Room warning please fill following fields:
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

export default WarningRoomConfigurationTable
