import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#91A6FF',
        color: '#ffffff',
        display: 'flex',
        width: '100%',
        margin: '5px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: '28px'
    }
  
}));

function TimePeriodDifference() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.text}>Previous period difference</div>
        </div>
    )
}

export default TimePeriodDifference
