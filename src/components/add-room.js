import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const AddRoom = ({handleChange, toggleModel, saveRoom, form}) => {
  return (
    <>
      <Typography variant="h6">
        Add room
      </Typography>
      <TextField
        id="room-name"
        label="Room Name"
        value={form.room}
        onChange={handleChange('room')}
        margin="normal"
        variant="outlined"
      />
      <br/>
      <TextField
        id="ip-name"
        label="Ip address"
        onChange={handleChange('ip')}
        value={form.ip}
        margin="normal"
        variant="outlined"
      />
      <br/>
      <ButtonGroup fullWidth>
        <Button variant="contained" color="secondary" onClick={toggleModel}>
          Cancel
        </Button>
        <Button variant="contained" color='primary' onClick={saveRoom}>
          Save
        </Button>
      </ButtonGroup>
    </>
  )
}

export default AddRoom;
