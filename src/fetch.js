const fetcher = (url, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  };

  return fetch(url, {...defaultOptions, ...options}).then(response => response.json());
};

export const get = url => fetcher(url);

export const post = (url, data) => fetcher(url, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const put = (url, data) => fetcher(url, {
  method: 'PUT',
  body: JSON.stringify(data),
});


export const fetchDelete = (url, data) => fetcher(url, {
  method: 'DELETE',
  body: JSON.stringify(data),
});
