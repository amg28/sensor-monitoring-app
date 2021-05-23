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
                defaultValue="2020-01-01T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => {
                    const formatedDate = encodeURIComponent(new Date(e.target.value).toISOString());
                    console.log(formatedDate, 'formatedDate');
                    dispatch(dispatchAction(formatedDate))
                }}
            />
        </div>
    )
}

export default TimeInput
