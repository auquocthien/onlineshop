import axios from 'axios';

const DB_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_URL
    : process.env.REACT_APP_DEV_URL;

// eslint-disable-next-line import/no-anonymous-default-export
export default (token) =>
  axios.create({
    baseURL: DB_URI,
    Authorization: `Bearer ${token}`
    // headers: new Headers({
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //   "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    // })
  });
