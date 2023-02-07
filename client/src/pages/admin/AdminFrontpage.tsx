import { getFavorites } from '../../utility/functions';
import { Painting } from '../../../../types/types';
import { useState, useEffect } from 'react';

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
    return <>Schilderijen zichtbaar in slider</>;
};
