// server loaded stuff
const format = require('date-fns/format');

const buildObject = (data) => {
  return data.reduce((accum, value) => {
    const date = format(new Date(value.timestamp), 'yyyy-MM-dd');
    if(accum[date]) {
      accum[date].temp.push(+value.temp);
      accum[date].humi.push(+value.hum);
    } else {
      accum[date] = {
        temp: [+value.temp],
        humi: [+value.hum]
      }
    }
    return accum;
  }, {});
}

module.exports = (data) => {
  const dateObj = buildObject(data);
  const obj = Object.keys(dateObj).reduce((accum, key) => {
    accum.push({
      date: key,
      tempHigh: Math.max(...dateObj[key].temp),
      tempLow: Math.min(...dateObj[key].temp),
      humidityHigh: Math.max(...dateObj[key].humi),
      humidityLow: Math.min(...dateObj[key].humi)
    })
    return accum;
  }, []);
  return obj;
};
