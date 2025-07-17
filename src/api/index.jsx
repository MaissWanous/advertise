
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://c8be0c9e100e.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;
