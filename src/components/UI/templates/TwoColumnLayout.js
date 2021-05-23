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
        height: '100%'
    }
}));

export default function TwoColumnLayout({ contentLeft, contentRight }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid key="left-column" item xs={4}>
                {contentLeft.map((component) => <Paper className={classes.paper}>{component}</Paper>)}
                </Grid>
                <Grid key="right-column" item xs={8}>
                    <Paper className={classes.paper}>{contentRight}</Paper>
                </Grid>
            </Grid>
        </div>
    );
}