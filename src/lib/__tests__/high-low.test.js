const highLow = require('../high-low.js');
const data = require('./test-data.json.js');

const goodData = [ { date: '2019-09-19', high: 75, low: 68 },
{ date: '2019-09-18', high: 75, low: 64 },
{ date: '2019-09-17', high: 78, low: 68 },
{ date: '2019-09-16', high: 75, low: 68 },
{ date: '2019-09-15', high: 75, low: 68 },
{ date: '2019-09-14', high: 75, low: 68 },
{ date: '2019-09-13', high: 75, low: 68 } ];

it('properly formats to high low temps', () => {
  expect(highLow(data.data)).toEqual(goodData);
});
