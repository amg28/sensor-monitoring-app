
import { ButtonBase, Fade, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#E26D5C',
        color: '#ffffff',
        display: 'flex',
        width: '100%',
        margin: '5px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: '28px',
        transitionDuration: '2s'
    }
  
}));

function AverageConsumption() {

    const classes = useStyles();
    const [check, setCheck] = useState(false)
    const handleClick = () => setCheck(!check);

    return (
        <div className={classes.root}>
            {check ? (            
            <Fade in={check}>
                <div className={classes.text} onClick={handleClick}>Average consumption</div>
            </Fade>
            ) : (            
            <Fade in={!check}>
                <div className={classes.text} onClick={handleClick}>123</div>
            </Fade>)}
        </div>
    )
}

export default AverageConsumption
