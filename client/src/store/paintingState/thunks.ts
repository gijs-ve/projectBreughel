import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { ServerData } from '../../utility/dataTypes';
import { setTotalPages, setPaintings } from './slice';

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

export const getPaintingsFromPage = (page: number) => async (dispatch: any) => {
    try {
        const { data } = await axios.get<ServerData>(
            `${apiUrl}/paintings/getPaintings/${page}`,
        );
        if (!data) return;
        dispatch(setPaintings(data.paintings));
    } catch (error) {
        console.log(error);
    }
};
