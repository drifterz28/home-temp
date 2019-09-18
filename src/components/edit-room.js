import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  formControl: {
    margin: 10,
    minWidth: 120,
  },
});

const EditRoom = ({rooms, deleteRoom, selectRoom}) => {
  const styles = useStyles();
  console.log('test')
  return (
    <>
      <Typography variant="h6">
        Edit room
      </Typography>
      <FormControl variant="outlined" className={styles.formControl}>
        <InputLabel htmlFor="outlined-room-native">
          Room
        </InputLabel>
        <Select
          native
          labelWidth={40}
          onChange={selectRoom}
          inputProps={{
            name: 'room',
            id: 'outlined-room-native',
          }}
        >
          <option value="" />
          {rooms.map((room, i) => {
            return (<option key={i} value={room.id}>{room.name}</option>)
          })}
        </Select>
      </FormControl>
      <Fab aria-label="delete" onClick={deleteRoom}>
        <DeleteIcon />
      </Fab>
      <Divider />
    </>
  )
}

export default EditRoom;
