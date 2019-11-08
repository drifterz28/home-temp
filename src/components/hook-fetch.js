import { useState, useEffect } from 'react';
import { get } from '../fetch';

const useFetch = (url, interval = false) => {
  const [ data, setData ] = useState([]);
  const [didFetch, setDidFetch] = useState(false);
  useEffect(() => {
    function getData() {
      get(url).then(datas => {
        setDidFetch(true);
        setData(datas);
      });
    }

    if(interval) {
      let id = setInterval(() => {
        getData();
      }, interval);
      getData();
      return () => {
        clearInterval(id);
      }
    } else {
      getData();
    }
  }, [interval]);
  return data;
};

export default useFetch;
