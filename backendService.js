import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://localhost:9000/',
    headers: {
        'content-Type': 'application/json',
    },
})

export default instance;