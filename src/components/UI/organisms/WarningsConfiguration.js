
import { WarningSharp } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, roomsSelector } from '../../../store/roomsSlice';
import { fetchWarnings } from '../../../store/warningsSlice';
import { Chip, DialogContent, DialogContentText, makeStyles, TextField, Tooltip,Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import { v4 as uuid_v4 } from "uuid";
import WarningRoomConfigurationTable from '../molecules/WarningRoomConfigurationTable';
import WarningSensorConfigurationTable from '../molecules/WarningSensorConfigurationTable';

const useStyles = makeStyles((theme) => ({
    buttonWrapper: {
        display: 'flex'
    },
    addRoom: {
        display: 'flex',
        marginTop: '10px',
        marginRight: '10px',
    }
}));

function WarningsConfiguration() {
    const classes = useStyles();
    const dispatch = useDispatch();



return (
    <div>
        <Typography variant="h4" strong>Warnings Configuration</Typography>
        
        <Typography variant="h8" strong>In this section you can configure warnings for rooms and sensors</Typography>
            <WarningRoomConfigurationTable />
            <WarningSensorConfigurationTable />
    </div>
)
}

export default WarningsConfiguration
