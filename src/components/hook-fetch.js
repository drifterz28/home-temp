import {useState, useEffect} from 'react';
import {get} from '../fetch';

const useFetch = (url) => {
  const [ data, setData ] = useState([]);
  const [didFetch, setDidFetch] = useState(false);
  useEffect(() => {
    if (!didFetch) {
      get(url).then(datas => {
        setDidFetch(true);
        setData(datas);
      })
    }
  }, [data]);
  return data;
};

export default useFetch;
