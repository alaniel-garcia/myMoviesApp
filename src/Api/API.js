import axios from 'axios';
import API_KEY from './KEY';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers:{
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language': 'en-US',
  },
});

const API_EP_TRENDING = '/trending/movie/day';
const API_EP_DISCOVER = '/discover/movie';
const API_EP_GENRES = '/genre/movie/list';
const API_EP_SEARCH = '/search/movie';

export default API;

export {
  API,
  API_EP_TRENDING,
  API_EP_DISCOVER,
  API_EP_GENRES,
  API_EP_SEARCH
}
