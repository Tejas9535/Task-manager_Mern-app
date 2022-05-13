import axios from 'axios';

const instance = (token) => axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: { Authorization: `Bearer ${ token}` }
  });
export default instance;