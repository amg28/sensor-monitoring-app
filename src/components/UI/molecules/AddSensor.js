import { Button, Divider, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import MeasurementSelect from '../atoms/MeasurementSelect'
import RoomSelect from '../atoms/RoomSelect'
import { useDispatch, useSelector } from 'react-redux';
import { addNewSensor, fetchSensor, roomsSelector, updateFromDateTime, updateToDateTime } from '../../../store/roomsSlice';

const useStyles = makeStyles((theme) => ({
    timeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%'
    }
}));

function AddSensor(props) {

    const [state, setState] = useState();
    const classes = useStyles();
    const roomsData = useSelector(roomsSelector);
    const dispatch = useDispatch();

    const roomsList = roomsData.map((room) => room.roomName).sort();

    // const handleClick = () => dispatch(addNewSensor());
    const handleClick = () => alert("Data sent " + state?.roomName);


    return (
        <div className={classes.timeContainer}>
            <MeasurementSelect />
            <Divider />
            <RoomSelect roomsData={roomsData} rooms={roomsList} />
            <Divider />
            <Button onClick={handleClick}>Add sensor</Button>
        </div>
    )
}

export default AddSensor
