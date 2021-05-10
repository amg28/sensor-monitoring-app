import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minHeight: '300px'
    },
    leftOffset: {
        paddingLeft: "70px"
    }
}));

export default function TwoColumnLayout({ contentLeft, contentRight }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.leftOffset}>
                <Grid item md={6} xs={12}>
                {contentLeft.map((component) => <Paper className={classes.paper}>{component}</Paper>)}
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>{contentRight}</Paper>
                </Grid>
            </Grid>
        </div>
    );
}