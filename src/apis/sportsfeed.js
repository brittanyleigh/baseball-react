import axios from 'axios';

const KEY = btoa(process.env.REACT_APP_SPORTSFEED_API_KEY);

export default axios.create({
  baseURL: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current',   
  headers: {
    "Authorization": "Basic " + KEY
  }
});
