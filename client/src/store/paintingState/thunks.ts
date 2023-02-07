import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { ServerData } from '../../utility/dataTypes';
import { setTotalPages } from './slice';

export const getPageCount = () => async (dispatch: any) => {
    try {
        const { data } = await axios.get<ServerData>(
            `${apiUrl}/paintings/getPages`,
        );
        if (!data) return;
        dispatch(setTotalPages(data.pageCount));
    } catch (error) {
        console.log(error);
    }
};
