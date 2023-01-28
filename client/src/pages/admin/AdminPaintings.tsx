import { Painting } from '../../../../types/types';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { addPainting, getAllPaintings } from '../../utility/functions';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';

export const AdminPaintings = () => {
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
                <>
                    <h1>{i.name}</h1> <h1>Wijzig</h1> <h1>Verwijder</h1>
                </>
            );
        });
    };

    return <div>{Paintings()}</div>;
};
