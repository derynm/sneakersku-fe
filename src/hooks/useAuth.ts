import { useState } from 'react';
import { useApi } from '../service/api';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie ] = useCookies(['token']);

    const [user, setUser] = useState(null);
    const api = useApi();

    const login = async (email: string, password: string) => {
        try {
            const response: any = await api.postLogin({
                data: {
                    email,
                    password
                }
            });
            setCookie('token', response.data.token, { path: '/', maxAge: 3600 });

            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const isLoggedIn = () => {
        return cookies.token !== undefined;
    }

    const register = async (name: string,email: string, password: string) => {
        try {
            await api.postRegister({
                data: {
                    name,
                    email,
                    password
                }
            });

            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        removeCookie('token');
        navigate('/login');
    }

    const getMe = async () => {
        try {
            const response = await api.getCurrentUser();
            setUser(response as any);
        } catch (error) {
            console.log(error)
        }
    }

    return {
        register,
        login,
        getMe,
        isLoggedIn,
        logout,
        user
    }
}

export default useAuth;