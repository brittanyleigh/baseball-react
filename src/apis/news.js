import axios from "axios";
/* eslint-disable no-undef */
const KEY = process.env.REACT_APP_NEWS_API_KEY;

export default axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Authorization: KEY
  }
});
