import { getCookie } from './cookie';

const isAuthenticated = () =>{
    return getCookie('authtoken');
}

export default isAuthenticated;