import React from 'react';
import format from 'date-fns/format';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';

const CustomizedAxisTick = ({x, y, stroke, payload, range}) => {
  const dateFormat = {
    day: 'h:mm a',
    week: 'MM/dd',
    month: 'MM/dd'
  };
  const date = range === 'day' ? payload.value : payload.value + 'T00:00:00';
  console.log(date)
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor='middle' fill='#666'>{format(new Date(date), dateFormat[range])}</text>
    </g>
  );
};

const tooltipFormater = (value) => {
  return format(new Date(value), 'MM/dd/yyyy h:mm a');
};

export const DayGraph = ({data, range, room}) => {
  return (
    <LineChart width={800} height={400} data={data} margin={{top: 10}}>
      <CartesianGrid strokeDasharray='3 3'/>
      <XAxis dataKey='timestamp' tick={<CustomizedAxisTick range={range} />}/>
      <YAxis/>
      <Tooltip labelFormatter={tooltipFormater}/>
      <Line type='monotone' dataKey='temp' stroke='#8884d8' dot={false} label={false}/>
      {room === 'outside' &&
        <Line type='monotone' dataKey='hum' stroke='#82ca9d' dot={false}/>}
    </LineChart>
  );
};

export const HighLowGraph = ({data, range}) => {
  console.log(data)
  return (
    <LineChart width={800} height={400} data={data} margin={{top: 10}}>
      <CartesianGrid strokeDasharray='3 3'/>
      <XAxis dataKey='date' tick={<CustomizedAxisTick range={range} />}/>
      <YAxis/>
      <Tooltip/>
      <Line type='monotone' dataKey='high' stroke='#8884d8' dot={false} label={false}/>
      <Line type='monotone' dataKey='low' stroke='#8884d8' dot={false} label={false}/>
    </LineChart>
  )
}
