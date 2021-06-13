import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
import { actualFloorSelector, updateActualFloor } from "../../../store/roomsSlice";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "80px",
    marginLeft: "90px",
    marginRight: "20px",
  },
});

function FloorNav(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actualFloor = useSelector(actualFloorSelector);

  const handleChange = (event, newValue) => {
    dispatch(updateActualFloor(newValue));
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={actualFloor}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Floor 1" />
        <Tab label="Floor 2" />
      </Tabs>
    </Paper>
  );
}

export default FloorNav;
