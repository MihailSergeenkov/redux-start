import axios from 'axios';

const API_KEY = '5f9ef25d231ba42851b4a03c';

const client = axios.create({
  baseURL: 'https://chapters-ac63.restdb.io/rest',
  headers: {
    'x-apikey': API_KEY,
  },
});

export default client;
