import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { updatePrecision } from '../../../store/roomsSlice'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '20px'
    },

    formGroup: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },

    controlLabel: {

    },

    checkbox: {
        margin: '10px'
    }
}));

function PrecisionSelect() {

    const [precision, setPrecision] = React.useState(true);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setPrecision(!precision);
    };

    useEffect(() => {
        dispatch(updatePrecision(precision ? 'days' : 'hours'));
    }, [dispatch, precision])

    return (
        <div>
            <FormLabel component="legend" className={classes.title}>Precision:</FormLabel>
            <FormGroup row className={classes.formGroup}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={precision}
                            onChange={handleChange}
                            name="days"
                            color="primary"
                            className={classes.checkbox}
                        />
                    }
                    label="Days"
                    className={classes.controlLabel}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!precision}
                            onChange={handleChange}
                            name="hours"
                            color="secondary"
                            className={classes.checkbox}
                        />
                    }
                    label="Hours"
                    className={classes.controlLabel}
                />
            </FormGroup>
        </div>
    )
}

export default PrecisionSelect
