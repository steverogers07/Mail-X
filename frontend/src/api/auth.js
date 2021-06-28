import { getCookie } from './cookie';

const isAuthenticated = () =>{
    return getCookie('authtoken2');
}

export default isAuthenticated;