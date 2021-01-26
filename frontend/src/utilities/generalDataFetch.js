import { store } from '../redux/store';

const generalDataFetch = async (endpoint, method, data = undefined) => {
  const state = store.getState();
  const { token } = state.session;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (endpoint !== '/login' && endpoint !== '/register') {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  const fetchedData = await fetch(`${process.env.REACT_APP_BACKEND}${endpoint}`, options);

  if (fetchedData.status === 401) {
    window.location.href = `${process.env.REACT_APP_FRONTEND}/login/`;
    return null;
  }

  const jsonData = await fetchedData.json();
  const { status } = fetchedData;

  const fetchResult = { jsonData, status };
  return fetchResult;
};

export default generalDataFetch;
