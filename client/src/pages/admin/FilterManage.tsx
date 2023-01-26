import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../config/constants';
import { Data } from '../../../../types/types';
import { getFilters } from '../../utility/functions';

export const FilterManage = () => {
    const [filters, setFilters] = useState<[] | string[]>([]);
    const placeFilters = async () => {
        const data = await getFilters();
        if (!data || !data.filters) return
        setFilters(data.filters)
    }
    useEffect(() => {
        placeFilters()
    }, []);
    const CurrentFilters = filters.map((i: string) => {
        <>
            <div></div>
        </>;
    });
    return <></>;
};
