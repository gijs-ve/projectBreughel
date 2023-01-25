import axios from 'axios';
import { apiUrl } from '../config/constants';
import { Painting, Paintings, Data } from '../../../types/types';
import { ServerResponse } from 'http';

export const filterPaintings = (
    paintingsArray: Paintings,
    filterArray: string[],
) => {
    if (filterArray.length === 0) return paintingsArray;
    const remainingArray = paintingsArray.filter((painting: Painting) => {
        const filterCheckArray = filterArray.map((filter: string) => {
            if (painting.filters.includes(filter)) return true;
            return false;
        });
        if (filterCheckArray.includes(false)) return false;
        return true;
    });
    return remainingArray;
};

export const getFilters = async () => {
    try {
        const { data, status } = await axios.get<ServerResponse>(
            `${apiUrl}/painting/getFilters`,
        );
        if (!data) return;
        return data;
    } catch (error) {}
};
