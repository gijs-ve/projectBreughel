import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../config/constants';
import { AdminProps, Data, Filter } from '../../../../types/types';
import {
    getFilters as requestFilters,
    editFilter as patchFilter,
    addFilter,
} from '../../utility/functions';
import { Button } from '../../components/Button';
import { FC } from 'react';

export const FilterManage = (p: AdminProps) => {
    const { token } = p;
    const [filters, setFilters] = useState<[] | Filter[]>([]);

    useEffect(() => {
        getFilters();
    }, []);
    if (!token) return <>Log in om te wijzigen</>;

    const getFilters = async () => {
        const data = await requestFilters();
        if (!data || !data.filters) return;
        setFilters(data.filters);
    };
    const handleInput = (input: string, id: number) => {
        const newFilters = filters.map((i: Filter) => {
            if (i.id !== id) return i;
            return { id, name: input };
        });
        setFilters(newFilters);
    };
    const editFilter = async (i: Filter) => {
        patchFilter(i);
    };
    const CurrentFilters = filters.map((i: Filter) => {
        return (
            <div key={i.id}>
                <input
                    value={i.name}
                    onChange={(e) => handleInput(e.target.value, i.id)}
                ></input>{' '}
                <Button text="Bewerk" onClickEvent={() => editFilter(i)} />
            </div>
        );
    });
    const AddFilter = () => {
        const [newFilter, setNewFilter] = useState<string>('TET ');
        return (
            <div>
                <input
                    value={newFilter}
                    onChange={(e) => setNewFilter(e.target.value)}
                />
                <Button text="Voeg toe" onClickEvent={() => addFilter(token)} />
            </div>
        );
    };
    return (
        <>
            {CurrentFilters} <AddFilter />
        </>
    );
};
