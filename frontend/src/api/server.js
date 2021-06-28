import axios from "axios";

axios.defaults.withCredentials = true
const server = axios.create({
    baseURL: 'https://mail-x.herokuapp.com',
    // baseURL: 'http://localhost:5000',
    withCredentials: true,
});


export default server;