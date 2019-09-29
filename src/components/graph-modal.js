import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import format from 'date-fns/format';

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';
import { get } from '../fetch';
import { DayGraph, HighLowGraph } from './graphs';

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
  }
});

const GraphModel = ({setRoomIp, room, setOpen, open}) => {
  const [range, setRange] = useState('day');
  const [data, setData] = useState([]);

  const hangleRange = range => e => {
    setData({});
    get(`/api/temp?ip=${room.ip}&range=${range}`).then(data => {
      setRange(range);
      setData(data.data);
    })
  };

  useEffect(() => {
    if(room) {
      get(`/api/temp?ip=${room.ip}&range=${range}`).then(data => {
        setData(data.data);
      });
    }
  }, [room])

  const styles = useStyles();
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={styles.paper}>
        <h2 id="simple-modal-title">{room.name} room</h2>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={hangleRange('day')}>1 day</Button>
          <Button onClick={hangleRange('week')}>1 week</Button>
          <Button onClick={hangleRange('month')}>1 month</Button>
        </ButtonGroup>
        {range === 'day' ? <DayGraph data={data} room={room.name} range={range} /> : <HighLowGraph data={data} range={range} /> }
      </div>
    </Modal>
  );
};

export default GraphModel;
