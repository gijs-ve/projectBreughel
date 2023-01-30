
import { useEffect, useState } from 'react';
import { Painting } from '../../../types/types';
import { getAllPaintings } from '../utility/functions';
import { useAppSelector } from '../utility/hooks';
import { selectToken } from '../store';
import { PaintingRow } from './PaintingRow';

export const PaintingTable = () => {
    const token = useAppSelector(selectToken);
    const [allPaintings, setAllpaintings] = useState<Painting[] | []>([]);
    useEffect(() => {
        if (!token) return;
        const fetchAllPaintings = async () => {
            const data = await getAllPaintings(token);
            if (!data || !data.paintings) return;
            setAllpaintings(data.paintings);
        };
        fetchAllPaintings();
    }, []);
    const Paintings = () => {
        return allPaintings.map((i: Painting) => {
            return (
                    <PaintingRow key={i.id} painting={i} />
            );
        });
    };
    return <table className="mx-auto">
                <tbody>
                    <tr>
                        <th className="pl-12">ID</th>
                        <th className="pl-12">Naam</th>
                        <th className="pl-12">Schilder</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {Paintings()}
                </tbody>
            </table>
}