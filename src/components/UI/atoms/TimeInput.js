import { Tooltip } from '@material-ui/core';
import { makeStyles, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: 'flex',
    },
    customWidthTooltip:{
        maxWidth: 500,
        fontSize: '18px'
    }
}));

function TimeInput({ label, dispatchAction, defaultDate }) {

    const classes = useStyles();
    const dispatch = useDispatch()

    const formatDate = (date) => encodeURIComponent(new Date(date).toISOString());

    useEffect(() => {
        dispatch(dispatchAction(formatDate(defaultDate)))
    }, [dispatch, defaultDate, dispatchAction])

    return (
        <div>
            <Tooltip placement="right" classes={{ tooltip: classes.customWidthTooltip }} title='Note: Dates by default are defined in range from [01/01/2020] till [15/01/2020] for Demo purpose. In case you wish to use other date periods, please use an import script to add additional sensor data'>
                <TextField
                    id={`datetime-local-${label}`}
                    label={label}
                    type="datetime-local"
                    defaultValue={defaultDate}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => dispatch(dispatchAction(formatDate(e.target.value)))}
                />
            </Tooltip>
        </div>
    )
}

export default TimeInput
