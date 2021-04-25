import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        minWidth: 250,
    }
}));

function MeasurementSelect() {

    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Select Measurement</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                    options={['C02', 'Temperature', 'Moisture']}
                    label="Select Measurement"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'C02'}>C02</MenuItem>
                    <MenuItem value={'Temperature'}>Temperature</MenuItem>
                    <MenuItem value={'Moisture'}>Moisture</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default MeasurementSelect
