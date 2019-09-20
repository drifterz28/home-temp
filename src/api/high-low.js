// server loaded stuff
const format = require('date-fns/format');

const buildObject = (data) => {
  return data.reduce((accum, value) => {
    const date = format(new Date(value.timestamp), 'yyyy-MM-dd');
    if(accum[date]) {
      accum[date].push(+value.temp);
    } else {
      accum[date] = [+value.temp];
    }
    return accum;
  }, {});
}

module.exports = (data) => {
  const dateObj = buildObject(data);
  const obj = Object.keys(dateObj).reduce((accum, key) => {
    accum.push({
      date: key,
      high: Math.max(...dateObj[key]),
      low: Math.min(...dateObj[key])
    })
    return accum;
  }, []);
  return obj;
};
