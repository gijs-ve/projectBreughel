import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { loginSuccess } from './slice';

export const login = (name: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, {
                name,
                password,
            });

            dispatch(
                loginSuccess({
                    token: response.data.token,
                    user: response.data.user,
                }),
            );
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data.message);
            } else {
                console.log(error.message);
            }
        }
    };
};
