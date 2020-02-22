import axios from 'axios';

const KEY = btoa(process.env.REACT_APP_SPORTSFEED_API_KEY);

export default axios.create({
  baseURL: 'http://statsapi.mlb.com/api/v1/',   
});
