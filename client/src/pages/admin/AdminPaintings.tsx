import { AdminFilters } from './AdminFilters';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
import { Painting } from '../../../../types/types';
import { useState } from 'react';
export const AdminPaintings = () => {
    const initialPainting: Painting = {
        name: 'Name',
        length: 0,
        width: 0,
        price: 0,
    };
    const [painting, setPainting] = useState<Painting>(initialPainting);
    const changePainting = (property: string, payload: string | number) => {
        switch (property) {
            case 'name':
                if (typeof payload === 'string') {
                    setPainting({ ...painting, name: payload });
                }
                break;
            case 'length':
                setPainting({ ...painting, length: +payload });
                break;
            case 'width':
                setPainting({ ...painting, width: +payload });
                break;
            case 'price':
                setPainting({ ...painting, price: +payload });
                break;
            default:
                return;
        }
    };
    return (
        <>
            <input
                value={painting.name}
                onChange={(e) => changePainting('name', e.target.value)}
                type="text"
            />
            <input
                value={painting.length}
                onChange={(e) => changePainting('length', e.target.value)}
                type="number"
            />
            <input
                value={painting.width}
                onChange={(e) => changePainting('width', e.target.value)}
                type="number"
            />
            <input
                value={painting.price}
                onChange={(e) => changePainting('price', e.target.value)}
                type="number"
            />
        </>
    );
};
