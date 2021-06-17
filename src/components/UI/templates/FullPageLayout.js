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

export default function FullPageLayout({ component }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid key="full-page-layout" item xs={12}>
                    <Paper className={classes.paper}>{component}</Paper>
                </Grid>
            </Grid>
        </div>
    );
}