import { setFilters, setPaintings, setTotalPages } from './slice';

import { ServerData } from '../../utility/dataTypes';
import { apiUrl } from '../../config/constants';
import axios from 'axios';

export const getPagesAndFilters = () => async (dispatch: any) => {
    try {
        const { data } = await axios.get<ServerData>(
            `${apiUrl}/paintings/getPagesAndFilters`,
        );
        if (!data) return;
        dispatch(setTotalPages(data.pageCount));
        dispatch(setFilters(data.filters));
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
