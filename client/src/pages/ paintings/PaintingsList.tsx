import { useEffect } from 'react';
import { Painting } from '../../../../types/types';
import { PageWheel } from '../../components/PageWheel';
import {
    getPageCount,
    selectCurrentPage,
    selectTotalPages,
    selectPaintings,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../utility/hooks';
import { PaintingFrame } from './PaintingFrame';

export const PaintingsList = () => {
    const dispatch = useAppDispatch();
    const totalPages = useAppSelector(selectTotalPages);
    const currentPage = useAppSelector(selectCurrentPage);
    useEffect(() => {
        dispatch(getPageCount());
    }, []);
    return (
        <>
            <PageWheel
                currentPage={currentPage ? currentPage : 1}
                totalPages={totalPages ? totalPages : 10}
            />
            <List />
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
                    <th className="pl-12">Naam</th>
                    <th className="pl-12">Schilder</th>
                    <th className="pl-12">Prijs</th>
                </tr>
                <Paintings paintings={paintings} />
            </tbody>
        </table>
    );
};
const Paintings = (p: { paintings: Painting[] }) => {
    const { paintings } = p;
    const allPaintings = paintings.map((i: Painting) => {
        return <PaintingFrame painting={i} />;
    });
    return <>{allPaintings}</>;
};
