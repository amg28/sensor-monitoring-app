import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateSensorType } from '../../../store/roomsSlice';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        display: 'flex'
    }
}));

function MeasurementSelect() {

    const classes = useStyles();
    const [measurement, setMeasurement] = React.useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setMeasurement(event.target.value);
    };

    React.useEffect(() => {
        dispatch(updateSensorType(measurement))
    }, [dispatch, measurement])

    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Select Measurement</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={measurement}
                    onChange={handleChange}
                    options={['carbonDioxideSensor', 'temperatureSensor', 'humiditySensor']}
                    label="Select Measurement"
                >
                    <MenuItem value={'carbonDioxideSensor'}>Carbon Dioxide</MenuItem>
                    <MenuItem value={'temperatureSensor'}>Temperature</MenuItem>
                    <MenuItem value={'humiditySensor'}>Humidity</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default MeasurementSelect
