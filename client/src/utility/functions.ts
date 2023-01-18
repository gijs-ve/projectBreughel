import { Painting, Paintings } from '../../../types/types';

export const filterPaintings = (
    paintingsArray: Paintings,
    filterArray: string[],
) => {
    if (filterArray.length === 0) return paintingsArray;
    const remainingArray = paintingsArray.filter((painting: Painting) => {
        const filterCheckArray = filterArray.map((filter: string) => {
            if (painting.filters.includes(filter)) return true;
            return false;
        });
        if (filterCheckArray.includes(false)) return false;
        return true;
    });
    return remainingArray;
};
