import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: 'flex',
    },
}));

function TimeInput({label, dispatchAction}) {

    const classes = useStyles();
    const dispatch = useDispatch()

    return (
        <div>
            <TextField
                id="datetime-local"
                label={label}
                type="datetime-local"
                defaultValue="2021-05-01T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => dispatch(dispatchAction(e.target.value))}
            />
        </div>
    )
}

export default TimeInput
