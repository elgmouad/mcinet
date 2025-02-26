import axios from 'axios';
const Instance = axios.create({
    // baseURL: 'https://backend-zeta-liart-77.vercel.app/api',
    baseURL: 'http://localhost:5000/api'
})

export default Instance;