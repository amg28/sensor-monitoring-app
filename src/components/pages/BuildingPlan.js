import React, { useEffect, useState } from "react";
import OneRowLayout from "../UI/templates/OneRowLayout";
import Navigation from "../UI/organisms/Navigation";
import FloorNav from "../UI/organisms/FloorNav";
import Floor1 from "../UI/atoms/Floor1";
import Floor2 from "../UI/atoms/Floor2";
import { fetchRooms, roomsSelector, updateActualFloor, actualFloorSelector } from "../../store/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { green, orange, pink, blue } from "@material-ui/core/colors";
import { FormatColorReset } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { Chip, makeStyles, Tooltip } from "@material-ui/core";
import SurroundSoundIcon from "@material-ui/icons/SurroundSound";
import AddSensor from "../UI/molecules/AddSensor";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function BuildingPlan() {
  const [state, setState] = useState();
  const floor1 = [<Floor1 onRoomSelect={(room) => setState({ room })} />];
  const floor2 = [<Floor2 onRoomSelect={(room) => setState({ room })} />];
  const component3 = [
    <AddSensor onRoomSelect={(room) => setState({ room })} />,
  ];

  const classes = useStyles();
  const dispatch = useDispatch();
  const roomsData = useSelector(roomsSelector);
  const actualFloor = useSelector(actualFloorSelector);


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

  switch (actualFloor) {
    case "floor1":
      dispatch(updateActualFloor(floor1));
      break;
    case "floor2":
      dispatch(updateActualFloor(floor2));
      break;
    default:
      dispatch(updateActualFloor(floor1));
  }

  console.log("Actual floor: " + state?.floor);
  console.log("Actual room: " + state?.room);

  return (
    <div>
      <Navigation pageTitle="Building Plan" />
      <FloorNav onFloorSelect={(floor) => setState({ floor })} />
      <OneRowLayout
        floorPlan={actualFloor}
        info={
          <>
            Room name: {state?.room}
            <DataGrid rows={rows} columns={columns} autoHeight />
          </>
        }
        component3={
          <>
            Room name: {state?.room}
            <Paper className={classes.paper}>{component3}</Paper>
          </>
        }
      />
    </div>
  );
}

export default BuildingPlan;
