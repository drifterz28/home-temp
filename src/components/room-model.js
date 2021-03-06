import React, { useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Lock from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

import { get, post, fetchDelete, put } from '../fetch';

import EditRoom from './edit-room';
import AddRoom from './add-room';

const initForm = {room: '', ip: '', id: false}

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
  button: {
    position: 'absolute',
    bottom: 10,
    left: 10
  }
});

const RoomModel = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState({});
  const [form, setForm] = useState(initForm);
  const [rooms, setRooms] = useState([]);
  const [showRooms, setShowRooms] = useState(false);

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
      ip: selectedRoom[0].ip,
      id: selectedRoom[0].id
    });
  };

  const deleteRoom = () => {
    fetchDelete('/api/rooms', form).then(() => {
      setForm(initForm);
      getRooms();
    });
  }

  const saveRoom = e => {
    const theFetch = form.id ? put : post;
    theFetch('/api/rooms', form).then(() => {
      toggleModel();
      getRooms();
    });
  }

  const updateRoom = e => {
    console.log(form)
  }

  const getRooms = () => {
    get('/api/rooms').then(data => {
      setRooms(data);
    });
  }

  useEffect(() => {
    const P_KEY_CODE = 80;
    const handleKeyPress = e => {
      if (e.shiftKey && e.keyCode === P_KEY_CODE) {
        setShowRooms(!showRooms);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    if(open && rooms.length === 0) {
      getRooms();
    }
  }, [open]);

  return (
    <>
    {showRooms && <>
      <Fab color="secondary" aria-label="edit" className={styles.button} onClick={toggleModel}>
        <EditIcon />
      </Fab>
      <Modal
        open={open}
        disableBackdropClick
        onClose={toggleModel}
      >
        <Paper className={styles.paper}>
          <form>
            {rooms.length > 0 && <EditRoom {...{rooms, deleteRoom, selectRoom}} />}
            <AddRoom {...{handleChange, toggleModel, saveRoom, form}}/>
          </form>
        </Paper>
      </Modal>
    </>
    }
    </>
  )
}

export default RoomModel;
