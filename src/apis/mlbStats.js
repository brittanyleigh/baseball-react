import axios from 'axios';

export default axios.create({
  baseURL: 'http://statsapi.mlb.com/api/v1/',
});
