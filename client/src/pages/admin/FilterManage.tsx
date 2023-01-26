import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../config/constants';
import { Data, Filter } from '../../../../types/types';
import {
    getFilters as requestFilters,
    editFilter as patchFilter,
} from '../../utility/functions';
import { Button } from '../../components/Button';

export const FilterManage = () => {
    const [filters, setFilters] = useState<[] | Filter[]>([]);
    const getFilters = async () => {
        const data = await requestFilters();
        if (!data || !data.filters) return;
        setFilters(data.filters);
    };
    const editFilter = async (i: Filter) => {
        patchFilter(i);
    };
    useEffect(() => {
        getFilters();
    }, []);
    const CurrentFilters = filters.map((i: Filter) => {
        <>
            <div key={i.id}>
                <input>{i.name}</input>{' '}
                <Button onClickEvent={() => editFilter(i)} />
            </div>
        </>;
    });
    return <>{CurrentFilters}</>;
};
