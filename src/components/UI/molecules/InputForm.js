import { Divider, makeStyles } from '@material-ui/core';
import { findByLabelText } from '@testing-library/dom';
import React from 'react'
import MeasurementSelect from '../atoms/MeasurementSelect'
import TimeInput from '../atoms/TimeInput'
import RoomSelect from '../atoms/RoomSelect'
import { useSelector } from 'react-redux';
import { roomsSelector, updateFromDateTime, updateToDateTime } from '../../../store/roomsSlice';

const useStyles = makeStyles((theme) => ({
    timeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%'
    }
}));

function InputForm({rooms}) {

    const classes = useStyles();
    const roomsData = useSelector(roomsSelector);
    const roomsList = roomsData ? roomsData.map((room) => room.roomName).sort() : [];

    return (
        <div className={classes.timeContainer}>
            <TimeInput label="From" dispatchAction={updateFromDateTime} />
            <Divider />
            <TimeInput label="To" dispatchAction={updateToDateTime} />
            <Divider />
            <MeasurementSelect />
            <Divider />
            <RoomSelect rooms={roomsList} />
        </div>
    )
}

export default InputForm
