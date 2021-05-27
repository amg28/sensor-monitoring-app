import { makeStyles, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: 'flex',
    },
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
        </div>
    )
}

export default TimeInput
