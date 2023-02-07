import { getFavorites } from '../../utility/functions';
import { Painting, Props } from '../../../../types/types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminFrontpage = () => {
    const [favorites, setFavorites] = useState<Painting[] | null>(null);
    useEffect(() => {
        const fetchFavorites = async () => {
            const data = await getFavorites();
            if (!data || !data.favorites) return;
            setFavorites(data.favorites);
        };
        fetchFavorites();
    }, []);

    return (
        <>
            <div>Schilderijen in slider</div>
            <FavoriteField />
        </>
    );
};

const FavoriteField = (p: Props) => {
    const navigate = useNavigate();
    const { paintings } = p;
    if (!paintings) return <></>;
    const MappedPaintings = paintings.map((i: Painting) => {
        if (!i.id) return <></>;
        return (
            <>
                <div onClick={() => navigate(`${i.id ? i.id.toString() : ''}`)}>
                    {i.name}
                </div>
                <div>Verwijder uit</div>
            </>
        );
    });
    return <>{MappedPaintings}</>;
};
