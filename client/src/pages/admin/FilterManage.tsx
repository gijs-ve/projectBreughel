import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../config/constants';
import { Data } from '../../../../types/types';
import { getFilters } from '../../utility/functions';

export const FilterManage = () => {
    const [filters, setFilters] = useState<[] | string[]>([]);
    useEffect(() => {
        const data = getFilters();
        console.log(data)
    }, []);
    const CurrentFilters = filters.map((i: string) => {
        <>
            <div></div>
        </>;
    });
    return <></>;
};
