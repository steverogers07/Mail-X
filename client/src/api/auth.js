import { getCookie } from './cookie';
export const g_id = '747047291644-u1amvc1utafscsca4rhtg8kh0vqa3qg0.apps.googleusercontent.com';
const isAuthenticated = () =>{
    return getCookie('authtoken2');
}

export default isAuthenticated;