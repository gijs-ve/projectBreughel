import { useEffect, useState } from 'react';
import { Filter } from '../../../../types/types';
import {
    getFilters as requestFilters,
    editFilter as patchFilter,
    addFilter,
    deleteFilter,
} from '../../utility/functions';
import { Button } from '../../components/Button';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';

export const AdminFilters = () => {
    const token = useAppSelector(selectToken);
    const [filters, setFilters] = useState<[] | Filter[]>([]);
    const [allowAddFilter, setAllowAddFilter] = useState<boolean>(false);
    const getFilters = async () => {
        const data = await requestFilters();
        if (!data || !data.filters) return;
        setFilters(data.filters);
    };
    useEffect(() => {
        getFilters();
    }, []);
    if (!token) return <>Log in om te wijzigen</>;

    const handleInput = (input: string, id: number) => {
        const newFilters = filters.map((i: Filter) => {
            if (i.id !== id) return i;
            return { id, name: input };
        });
        setFilters(newFilters);
    };
    const editFilter = async (i: Filter) => {
        patchFilter(token, i);
    };
    const CurrentFilters = filters.map((i: Filter) => {
        return (
            <div key={i.id}>
                <input
                    value={i.name}
                    onChange={(e) => handleInput(e.target.value, i.id)}
                ></input>{' '}
                <Button text="Bewerk" onClickEvent={() => editFilter(i)} />
                <Button
                    text="Verwijder"
                    onClickEvent={() => {
                        deleteFilter(i, token);
                        getFilters();
                    }}
                />
            </div>
        );
    });
    const AddFilter = () => {
        const [newFilter, setNewFilter] = useState<string>('Filter');
        if (!allowAddFilter) return <></>;
        return (
            <div>
                <h1>Nieuwe filter</h1>
                <input
                    value={newFilter}
                    onChange={(e) => setNewFilter(e.target.value)}
                />
                <Button
                    text="Voeg toe"
                    onClickEvent={() => addFilter(token, newFilter)}
                />
            </div>
        );
    };
    return (
        <>
            <h1>Lijst met filters</h1>
            {CurrentFilters}{' '}
            <Button
                text={allowAddFilter ? 'Hide add filter' : 'Show add filter'}
                onClickEvent={() => setAllowAddFilter(!allowAddFilter)}
            />
            <AddFilter />
        </>
    );
};
