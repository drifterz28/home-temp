const highLow = require('../high-low.js');
const data = require('./test-data.json');

const goodData = [
  {
    date: '2019-09-19',
    tempHigh: 75,
    tempLow: 68,
    humidityHigh: 75,
    humidityLow: 10
  },
  {
    date: '2019-09-18',
    tempHigh: 75,
    tempLow: 64,
    humidityHigh: 75,
    humidityLow: 8 },
  {
    date: '2019-09-17',
    tempHigh: 78,
    tempLow: 68,
    humidityHigh: 74,
    humidityLow: 9
  },
  {
    date: '2019-09-16',
    tempHigh: 75,
    tempLow: 68,
    humidityHigh: 73,
    humidityLow: 10
  },
  {
    date: '2019-09-15',
    tempHigh: 75,
    tempLow: 68,
    humidityHigh: 75,
    humidityLow: 8
  },
  {
    date: '2019-09-14',
    tempHigh: 75,
    tempLow: 68,
    humidityHigh: 74,
    humidityLow: 8
  },
  {
    date: '2019-09-13',
    tempHigh: 75,
    tempLow: 68,
    humidityHigh: 75,
    humidityLow: 8
  }
];

it('properly formats to high low temps', () => {
  console.log(highLow(data.data))
  expect(highLow(data.data)).toEqual(goodData);
});
