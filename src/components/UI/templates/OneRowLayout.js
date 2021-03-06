import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
        minHeight: '300px'
    }
}));

export default function OneRowLayout({floorPlan, info, component3}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              {floorPlan.map((component) => <Paper className={classes.paper}>{component}</Paper>)}
            </Grid>
            <Grid item xs={5}>
            <Paper className={classes.paper}><h1>Info</h1>{info}</Paper>
            </Grid>
          </Grid>
        </div>
    );
}
