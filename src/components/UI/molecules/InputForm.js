import { Divider, makeStyles } from '@material-ui/core';
import { findByLabelText } from '@testing-library/dom';
import React from 'react'
import MeasurementSelect from '../atoms/MeasurementSelect'
import TimeInput from '../atoms/TimeInput'
import RoomSelect from '../atoms/RoomSelect'

const useStyles = makeStyles((theme) => ({
    timeContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
    }
}));

function InputForm() {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.timeContainer}>
            <TimeInput label="From" />
            <TimeInput label="To" />
            </div>
            <Divider></Divider>
            <MeasurementSelect />
            <RoomSelect />
        </div>
    )
}

export default InputForm
