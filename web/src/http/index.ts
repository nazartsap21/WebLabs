import axios from 'axios';

export const  API_URL = `http://localhost:4000`;

const $api = axios.create({
    baseURL: API_URL ,
    headers: {
        "content-type": "application/json"
    }
})

export default $api;