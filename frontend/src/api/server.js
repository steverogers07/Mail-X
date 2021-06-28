import axios from "axios";


const server = axios.create({
    baseURL: 'https://mail-x.herokuapp.com',
    // baseURL: 'http://localhost:5000',
    withCredentials: true
});
server.defaults.withCredentials = true

export default server;