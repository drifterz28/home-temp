import {useState, useEffect} from 'react';
import {get} from '../fetch';

const useFetch = (url) => {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    if (data.length === 0) {
      get(url).then(datas => {
        setData(datas);
      })
    }
  }, [data]);
  return data;
};

export default useFetch;
