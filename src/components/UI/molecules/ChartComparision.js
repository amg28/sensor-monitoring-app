// import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { roomsSelector, selectedRoomsSelector } from '../../../store/roomsSlice';
// import RoomOverviewChart from '../atoms/RoomOverviewChart'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         marginTop: '80px',
//         marginLeft: '90px',
//         marginRight: '20px'
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//         height: '100%'
//     },
//     title: {
//         display: 'flex',
//         justifyContent: 'center'
//     }
// }));

// function ChartComparision() {

//     const classes = useStyles();
//     const selectedRoomsData = useSelector(selectedRoomsSelector);

//     return (
//         <div className={classes.root}>
//             <Typography variant="h4" gutterBottom className={classes.title}>
//                 Rooms overview
//             </Typography>
//             <Grid container spacing={5}>
//                 {selectedRoomsData.slice().reverse().map((room) => (<Grid item xs={6}><Paper><RoomOverviewChart label={room.roomName}></RoomOverviewChart></Paper></ Grid>))}
//             </Grid>
//         </div>
//     )
// }
function ChartComparision() {
    return (<div></div>
    )
    }
export default ChartComparision
