import { Painting } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';

export const PaintingFrame = (p: { painting?: Painting }) => {
    const { painting } = p;
    const navigate = useNavigate();
    if (!painting) return <>Schilderij wordt geladen</>;
    const getFilters = () => {
        const rawFilters = painting.paintingfilters;
        if (!rawFilters || rawFilters.length === 0) return 'Geen';
        const filters = rawFilters.map((i: { filter: { name: string } }) => {
            return i.filter.name;
        });
        return filters.join(', ');
    };
    return (
        <tr onClick={() => navigate(`${painting.id?.toString()}`)}>
            <td className="pl-12">{painting.name}</td>
            <td className="pl-12">{painting.painter?.name}</td>
            <td className="pl-12">{`€${painting.price}`}</td>
            <td className="pl-12">{`${getFilters()}`}</td>
        </tr>
    );
};
