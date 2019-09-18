import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

import AddRoom from './add-room';

const data = [
  {
    "day": "may 1",
    "temperature": [
      -1,
      10
    ]
  },
  {
    "day": "may 2",
    "temperature": [
      2,
      15
    ]
  },
  {
    "day": "may 3",
    "temperature": [
      3,
      12
    ]
  },
  {
    "day": "may 4",
    "temperature": [
      4,
      12
    ]
  },
  {
    "day": "may 5",
    "temperature": [
      12,
      16
    ]
  },
  {
    "day": "may 6",
    "temperature": [
      5,
      16
    ]
  },
  {
    "day": "may 7",
    "temperature": [
      3,
      12
    ]
  },
  {
    "day": "may 8",
    "temperature": [
      0,
      8
    ]
  },
  {
    "day": "may 9",
    "temperature": [
      -3,
      5
    ]
  }
];

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
  const matches = useMediaQuery('(orientation: portrait)');
  const handleOpen = e => {
    setRoom(e.currentTarget.value);
    setOpen(true);
  };

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
          <AreaChart width={600} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="day"/>
            <YAxis/>
            <Tooltip/>
            <Area type='monotone' dataKey='temperature' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
        </div>
      </Modal>
      <AddRoom />
    </Container>
  )
};

export default App;
