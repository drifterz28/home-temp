import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import format from 'date-fns/format';

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';

import RoomModel from './room-model';
import GraphModal from './graph-modal';
import useFetch from './hook-fetch';

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    background: '#fff',
    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    padding: '0 30px',
    position: 'relative'
  },
  image: {
    maxWidth: '100%'
  },
  landscape: {
    '& .apartment': {
      transform: 'rotate(-90deg)'
    }
  },
  rooms: {
    position: 'absolute',
    padding: '0 30px',
    '&.living': {
      top: '32%',
      left: '28%'
    },
    '&.master': {
      top: '76%',
      left: '20%'
    },
    '&.outside': {
      left: '35%',
      top: '10%'
    },
    '&.spare': {
      top: '80%',
      left: '53%'
    }
  }
});

const App = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState('');
  const matches = useMediaQuery('(orientation: portrait)');
  const roomTemps = useFetch('/api/temp');
  const handleOpen = e => {
    const room = e.currentTarget.value
    setRoom(room);
    setOpen(true);
  };
  return (
    <Container maxWidth='sm' className={`${styles.root}`}>
      <img src='apartment.png' className={`${styles.image} apartment`}/>
      {roomTemps.map((room, i) => {
        return <Fab key={i} onClick={handleOpen} value={room.name} color={room.temp > 76 ? 'secondary' : 'primary'} variant='extended' className={`${styles.rooms} rooms ${room.name}`}>{room.temp}°</Fab>
      })}
      <GraphModal {...{setRoom, room, setOpen, open}} />
      <RoomModel />
    </Container>
  )
};

export default App;
