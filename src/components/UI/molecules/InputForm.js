import { Button, Divider, makeStyles } from '@material-ui/core';
import React from 'react'
import MeasurementSelect from '../atoms/MeasurementSelect'
import TimeInput from '../atoms/TimeInput'
import RoomSelect from '../atoms/RoomSelect'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSensor, roomsSelector, updateFromDateTime, updateToDateTime } from '../../../store/roomsSlice';
import PrecisionSelect from '../atoms/PrecisionSelect';

const useStyles = makeStyles((theme) => ({
    timeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%'
    }
}));

function InputForm() {

    const classes = useStyles();
    const roomsData = useSelector(roomsSelector);
    const dispatch = useDispatch();
    const roomsList = roomsData ? roomsData.map((room) => room.roomName).sort() : [];

    const handleClick = () => dispatch(fetchSensor());

    return (
        <div className={classes.timeContainer}>
            <TimeInput label="From" dispatchAction={updateFromDateTime} defaultDate={"2020-01-01T10:30"} />
            <Divider />
            <TimeInput label="To" dispatchAction={updateToDateTime} defaultDate={"2020-01-15T10:30"} />
            <Divider />
            <MeasurementSelect />
            <Divider />
            <RoomSelect roomsData={roomsData} rooms={roomsList} />
            <Divider />
            <PrecisionSelect />
            <Divider />
            <Button onClick={handleClick}>Update chart</Button>
        </div>
    )
}

export default InputForm
