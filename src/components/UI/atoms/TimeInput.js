import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 265,
    },
}));

function TimeInput({label}) {

    const classes = useStyles();

    return (
        <div>
            <TextField
                id="datetime-local"
                label={label}
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}

export default TimeInput
