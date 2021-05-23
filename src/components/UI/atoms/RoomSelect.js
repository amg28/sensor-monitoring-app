import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { useDispatch } from 'react-redux';
import { updateRoomId, updateSelectedRooms } from '../../../store/roomsSlice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  checkbox: {
    marginRight: '10px'
  }
}));

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function RoomSelect({rooms, roomsData}) {
  const classes = useStyles();
  const [selectedRooms, setSelectedRooms] = React.useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedRooms(event.target.value);
  };

  React.useEffect(() => {
    const selectedRoomsData = roomsData.filter((room) => selectedRooms.includes(room.roomName));
    dispatch(updateSelectedRooms(selectedRoomsData))
  }, [dispatch, selectedRooms])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Select Rooms</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectedRooms}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {rooms.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox className={classes.checkbox} checked={selectedRooms.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}