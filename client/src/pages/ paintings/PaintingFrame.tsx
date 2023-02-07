import { useNavigate } from 'react-router-dom';
import { Painting } from '../../../../types/types';

export const PaintingFrame = (p: { painting?: Painting }) => {
    const { painting } = p;
    const navigate = useNavigate();
    if (!painting) return <>Schilderij wordt geladen</>;
    return (
        <tr onClick={() => navigate(`${painting.id?.toString()}`)}>
            <td className="pl-12">{painting.name}</td>
            <td className="pl-12">{painting.painter?.name}</td>
            <td className="pl-12">{`€${painting.price}`}</td>
        </tr>
    );
};
