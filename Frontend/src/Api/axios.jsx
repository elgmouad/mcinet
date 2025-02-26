import axios from 'axios';
const Instance = axios.create({
    // baseURL: 'https://backend-zeta-liart-77.vercel.app/api',
    baseURL: 'https://mcinetbackend.onrender.com/api'
})

export default Instance;