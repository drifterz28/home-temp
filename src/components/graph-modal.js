import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import format from 'date-fns/format';

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';
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
  }
});

const CustomizedAxisTick = ({x, y, stroke, payload, range}) => {
  const dateFormat = {
    day: 'HH:MM',
    week: 'MM/dd HH:MM',
    month: 'MM/dd HH:MM'
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">{format(new Date(payload.value), dateFormat[range])}</text>
    </g>
  );
};

const tooltipFormater = (value) => {
  return format(new Date(value), 'MM/dd/yyyy h:mm a');
};

const GraphModel = ({setRoom, room, setOpen, open}) => {
  const [range, setRange] = useState('day');
  const [data, setData] = useState([]);
  const hangleRange = range => e => {
    get(`/api/temp?room=${room}&range=${range}`).then(data => {
      setRange(range);
      setData(data.data);
    })
  };

  useEffect(() => {
    if(room) {
      get(`/api/temp?room=${room}&range=${range}`).then(data => {
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
        <h2 id="simple-modal-title">{room} room</h2>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={hangleRange('day')}>1 day</Button>
          <Button onClick={hangleRange('week')}>1 week</Button>
          <Button onClick={hangleRange('month')}>1 month</Button>
        </ButtonGroup>
        <LineChart width={600} height={400} data={data}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="timestamp" tick={<CustomizedAxisTick range={range} />}/>
          <YAxis/>
          <Tooltip labelFormatter={tooltipFormater}/>
          <Line type='monotone' dataKey='temp' stroke="#8884d8" dot={false} label={false}/>
          {room === 'outside' &&
            <Line type='monotone' dataKey='hum' stroke='#82ca9d' dot={false}/>}
        </LineChart>
      </div>
    </Modal>
  );
};

export default GraphModel;
