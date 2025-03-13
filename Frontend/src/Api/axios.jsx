import axios from 'axios';

// const Instance = axios.create({
//     // baseURL: 'https://backend-zeta-liart-77.vercel.app/api',
//     baseURL: 'http://localhost:5000/api'
// })

const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://backend-zeta-liart-77.vercel.app/api';

const Instance = axios.create({ baseURL });

export default Instance;