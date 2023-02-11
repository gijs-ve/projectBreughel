import { useEffect, useState } from 'react';
import { Painting } from '../../../../types/types';
import { PageWheel } from '../../components/PageWheel';
import {
    getPagesAndFilters,
    selectCurrentPage,
    selectTotalPages,
    selectPaintings,
    selectFilters,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../utility/hooks';
import { PaintingFrame } from './PaintingFrame';

export const PaintingsList = () => {
    const dispatch = useAppDispatch();
    const totalPages = useAppSelector(selectTotalPages);
    const currentPage = useAppSelector(selectCurrentPage);

    useEffect(() => {
        dispatch(getPagesAndFilters());
    }, []);
    return (
        <>
            <Filters />
            <List />
            <PageWheel
                currentPage={currentPage ? currentPage : 1}
                totalPages={totalPages ? totalPages : 10}
            />
        </>
    );
};

const List = () => {
    const paintings = useAppSelector(selectPaintings);
    if (!paintings) return <>Geen schilderijen gevonden</>;
    return (
        <table className="mx-auto">
            <tbody>
                <tr>
                    <th className="pl-12">Schilderij</th>
                    <th className="pl-12">Schilder</th>
                    <th className="pl-12">Prijs</th>
                    <th className="pl-12">Tags</th>
                </tr>
                <Paintings paintings={paintings} />
            </tbody>
        </table>
    );
};
const Paintings = (p: { paintings: Painting[] }) => {
    const { paintings } = p;
    const allPaintings = paintings.map((i: Painting) => {
        return <PaintingFrame key={i.id} painting={i} />;
    });
    return <>{allPaintings}</>;
};

const Filters = () => {
    const filters = useAppSelector(selectFilters);
    const [filterState, setFilterState] = useState<
        | {
              name: string;
              status: boolean;
          }[]
        | null
    >(null);
    useEffect(() => {
        const initialFilterState = filters?.map((i: { name: string }) => {
            return { name: i.name, status: false };
        });
        if (!initialFilterState) return;
        setFilterState(initialFilterState);
    }, []);
    const handleClick = (name: string) => {
        const newFilterState = filterState?.map(
            (i: { name: string; status: boolean }) => {
                if (i.name === name) return { ...i, status: !i.status };
                return i;
            },
        );
        if (!newFilterState) return;
        setFilterState(newFilterState);
    };
    const filterNames = filterState?.map(
        (i: { name: string; status: boolean }) => {
            return (
                <div
                    className="pt-4 border border-y-4 border-sky-500"
                    onClick={() => handleClick(i.name)}
                    key={i.name}
                >
                    {i.name + ' '}
                    {i.status ? 'ACTIEF' : 'INACTIEF'}
                </div>
            );
        },
    );
    return <div className="container flex mx-auto">{filterNames}</div>;
};
