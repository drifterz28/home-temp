import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { get } from '../fetch';

import RoomModel from './room-model';

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
  },
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
  }
});

const App = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState('');
  const [data, setData] = useState([]);
  const [range, setRange] = useState('day');
  const matches = useMediaQuery('(orientation: portrait)');
  const handleOpen = e => {
    const room = e.currentTarget.value
    setRoom(room);
    get(`/api/temp?room=${room}&range=${range}`).then(data => {
      setData(data.data);
      setOpen(true);
    })
  };
  const hangleRange = range => e => {
    get(`/api/temp?room=${room}&range=${range}`).then(data => {
      setRange(range);
      setData(data.data);
    })
  }
  return (
    <Container maxWidth='sm' className={`${styles.root}`}>
      <img src='apartment.png' className={`${styles.image} apartment`}/>
      <Fab onClick={handleOpen} value='living' color='primary' variant='extended' className={`${styles.rooms} rooms living`}>72°</Fab>
      <Fab onClick={handleOpen} value='outside' color='secondary' variant='extended' className={`${styles.rooms} rooms outside`}>87°</Fab>
      <Fab onClick={handleOpen} value='master' color='primary' variant='extended' className={`${styles.rooms} rooms master`}>68°</Fab>
      <Fab onClick={handleOpen} value='spare' color='primary' variant='extended' className={`${styles.rooms} rooms spare`}>65°</Fab>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={styles.paper}>
          <h2 id="simple-modal-title">{room} room</h2>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={hangleRange('day')}>1 day</Button>
            <Button onClick={hangleRange('week')}>1 week</Button>
            <Button onClick={hangleRange('month')}>1 month</Button>
          </ButtonGroup>
          <AreaChart width={600} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="timestamp"/>
            <YAxis/>
            <Tooltip/>
            <Area type='monotone' dataKey='temp' stroke='#8884d8' />
            {room === 'outside' &&
              <Area type='monotone' dataKey='hum' stroke='#ooo' />}
          </AreaChart>
        </div>
      </Modal>
      <RoomModel />
    </Container>
  )
};

export default App;
