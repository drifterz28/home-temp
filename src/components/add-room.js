import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { get } from '../fetch';

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 20,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    '&:focus': {
      outline: 'none'
    }
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
});

const AddRoom = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState({});
  const [form, setForm] = useState({room: '', ip: ''});
  const [rooms, setRooms] = useState([]);
  const toggleModel = () => {
    setOpen(!open);
  };

  const handleChange = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };
  const selectRoom = event => {
    const id = +event.target.value
    const selectedRoom = rooms.filter(room => room.id === id);
    setForm({
      room: selectedRoom[0].name,
      ip: selectedRoom[0].ip
    });
  };
  useEffect(() => {
    if(open && rooms.length === 0) {
      get('/api/rooms').then(data => {
        setRooms(data);
      });
    }
  }, [open]);
  console.log(rooms)
  return (
    <div>
      <Fab color="secondary" aria-label="edit" onClick={toggleModel}>
        <EditIcon />
      </Fab>
      <Modal
        open={open}
        disableBackdropClick
        onClose={toggleModel}
      >
        <Paper className={styles.paper}>
          <form>
            {rooms.length > 0 &&
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
              <Fab aria-label="delete">
                <DeleteIcon />
              </Fab>
              <Divider />
            </>}
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
              <Button variant="contained" color='primary'>
                Save
              </Button>
            </ButtonGroup>
          </form>
        </Paper>
      </Modal>
    </div>
  )
}

export default AddRoom;
