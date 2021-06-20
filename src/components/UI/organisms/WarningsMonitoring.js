import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWarnings, warningsSelector } from '../../../store/roomsSlice';

function WarningsMonitoring() {

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWarnings())
    }, [dispatch])

    const warnings = useSelector(warningsSelector);
    console.log(warnings.length,'warnings')

    return (
        <div>
            <Typography variant="h4" strong>Monitoring</Typography>
            {warnings.length}
        </div>
    )
}

export default WarningsMonitoring
