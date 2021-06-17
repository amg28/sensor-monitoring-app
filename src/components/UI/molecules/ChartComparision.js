import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { roomsSelector, selectedRoomsSelector, sensorDataSelector } from '../../../store/roomsSlice';
import RoomOverviewChart from '../atoms/RoomOverviewChart'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '80px',
        marginLeft: '90px',
        marginRight: '20px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function ChartComparision() {

    const classes = useStyles();
    const sensorData = useSelector(sensorDataSelector);

    return (
        <div className={classes.root}>
            {sensorData != 0 ? (
                <>
                    <Typography variant="h4" gutterBottom className={classes.title}>
                        Rooms overview
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shows raw data for each room without grouping
                    </Typography>
                    <Grid container spacing={5}>
                        {sensorData.slice().reverse().map((room) => (<Grid item xs={6}><Paper><RoomOverviewChart label={Object.keys(room)[0]} sensorData={room[Object.keys(room)[0]]}></RoomOverviewChart></Paper></ Grid>))}
                    </Grid>
                </>) : <></>}

        </div>
    )
}

export default ChartComparision;
