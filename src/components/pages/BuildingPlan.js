import React, { useEffect, useState, useRef } from "react";
import OneRowLayout from "../UI/templates/OneRowLayout";
import Navigation from "../UI/organisms/Navigation";
import FloorNav from "../UI/organisms/FloorNav";
import Floor1 from "../UI/atoms/Floor1";
import Floor2 from "../UI/atoms/Floor2";
import { addSensor, deleteSensor, addRoom, fetchRooms, roomsSelector, actualFloorSelector } from "../../store/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { green, orange, pink, blue } from "@material-ui/core/colors";
import { FormatColorReset } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { Chip, DialogContent, DialogContentText, makeStyles, TextField, Tooltip, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core'
import SurroundSoundIcon from "@material-ui/icons/SurroundSound";
import { DialogTitle, DialogActions, Dialog, Button } from '@material-ui/core'
import { v4 as uuid_v4 } from "uuid";
import FullPageLayoutNoMargin from "../UI/templates/FullPageLayoutNoMargin";


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
  sebsorList: {
    margin: '0px'
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

function BuildingPlan() {
  const [state, setState] = useState();
  const floor1 = [<Floor1 onRoomSelect={(room) => setState({ room })} />];
  const floor2 = [<Floor2 onRoomSelect={(room) => setState({ room })} />];

  const classes = useStyles();
  const dispatch = useDispatch();
  const sensorData = useSelector(roomsSelector);
  const roomsData = useSelector(roomsSelector);
  const actualFloor = useSelector(actualFloorSelector);
  const [open, setOpen] = React.useState(false);
  const newRoomNameRef = useRef(null)

  // const sensorData = useSelector(roomsSelector);
  const [addDialog, setAddDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [selectedSensor, setSelectedSensor] = React.useState();
  const newSensorIdRef = useRef(null)
  const newSensorTypeRef = useRef(null)
  const newSensorRoomRef = useRef(null)
  let availableRooms = [];


  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  const colorPick = (sensorType) => {
    switch (sensorType) {
      case "temperatureSensor":
        return orange[500];
      case "carbonDioxideSensor":
        return green[500];
      case "humiditySensor":
        return pink[500];
      default:
        return blue[500];
    }
  };

  function renderSensor(sensorData) {
    return sensorData.value.map((sensor) => (
      <div className={classes.chips}>
        <Tooltip title={sensor.sensorType} aria-label="sensor-type-description">
          <Chip
            label={sensor.sensorId}
            avatar={
              <SurroundSoundIcon
                style={{ color: colorPick(sensor.sensorType) }}
              />
            }
            variant="outlined"
          ></Chip>
        </Tooltip>
      </div>
    ));
  }

  let sensors = sensorData.map(({ sensors, roomName }) => {

    availableRooms.push(roomName);

    return sensors.map(
        ({ _id, ...sensorParams }) => {
            return { ...sensorParams, id: _id, room: roomName }
        })
}).flat();

  const rows = roomsData
    .map((room) => {
      const { _id, ...otherRoomProps } = room;
      return { id: _id, ...otherRoomProps };
    })
    .filter((room) => room.roomName === state?.room);

  const columns = [
    // { field: "id", headerName: "Id", flex: 1 },
    { field: "roomName", headerName: "Room name", flex: 1 },
    {
      field: "sensors",
      headerName: "Sensors",
      flex: 1,
      sortable: FormatColorReset,
      renderCell: renderSensor,
    },
  ];

  const handleDialogSubmit = () => {
    dispatch(addRoom({ roomName: newRoomNameRef.current.value, sensors: [] }));
    setOpen(false);
    dispatch(fetchRooms());
  }

  const handleRoomDelete = () => {
    dispatch(deleteSensor(selectedSensor));
    setDeleteDialog(false);
    dispatch(fetchRooms());
  }

  const handleDialogSubmitSensor = () => {
    const sensorId = newSensorIdRef.current.value;
    const sensorType = newSensorTypeRef.current.value;
    const roomName = newSensorRoomRef.current.value;
    dispatch(addSensor({ roomName: roomName, sensor: { sensorId: sensorId, sensorType: sensorType } }));
    setAddDialog(false);
    dispatch(fetchRooms());
  }

  const sensorListTable = () => {
    return (
      <>
        <DataGrid onRowSelected={(selectedRow) => setSelectedSensor(selectedRow.data)} rows={rows} columns={columns} autoHeight />
        <div className={classes.buttonWrapper}>
          <Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setAddDialog(true)}>Add Sensor</Button>
        </div>
      </>
    );
  }

  return (
    <div style={{margin: 0}}>
      <Navigation pageTitle="Building Plan" />
      <FloorNav onFloorSelect={(floor) => setState({ floor })} />
      <OneRowLayout
        floorPlan={actualFloor ? floor2 : floor1}
        info={(<>Room name: {state?.room}
        <div className={classes.sebsorList}>
        <FullPageLayoutNoMargin component={sensorListTable()} />
        </div>
        <Button className={classes.addRoom} variant="contained" color="primary" onClick={() => setOpen(true)}>Add new Room</Button></>)} />
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
                {availableRooms.map((roomName) => { return (<MenuItem value={roomName}>{roomName}</MenuItem>) })}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)} color="primary">
            Cancel
                    </Button>
          <Button onClick={() => handleDialogSubmitSensor()} color="primary">
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
  );
}

export default BuildingPlan;
