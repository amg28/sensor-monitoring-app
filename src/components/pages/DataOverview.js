import {  makeStyles, useTheme } from '@material-ui/core'
import React from 'react'
import MyChart from '../UI/atoms/MyChart';
import InputForm from '../UI/molecules/InputForm';
import Navigation from '../UI/organisms/Navigation'
import TwoColumnLayout from "../UI/templates/TwoColumnLayout";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -240,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
}));

function DataOverview() {


    const classes = useStyles();
    const theme = useTheme();
    const component1 = [(<InputForm />)];
    const component2 = [(<MyChart />)];

    return (
        <div>
            <Navigation pageTitle="Data Overview" />
            <main className={clsx(classes.content, {
          [classes.contentShift]: true,
        })}>
            <div className={classes.drawerHeader} />
                <TwoColumnLayout contentLeft={component1} contentRight={component2}  />
            </main>
        </div>
    )
}

export default DataOverview
