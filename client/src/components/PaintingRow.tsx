import { Props } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { changeApproved, getAllPaintings } from '../utility/functions';
import { useAppSelector } from '../utility/hooks';
import { selectToken } from '../store';

const Default = () => {
    return <></>;
};

export const PaintingRow = (p: Props) => {
    const token = useAppSelector(selectToken);
    const { painting, functions } = p;
    const navigate = useNavigate();
    if (!painting) return <Default />;
    const { id, name, painter, isApproved } = painting;
    if (!id || !name || !painter) return <Default />;
    const handleApproval = async (id: number, token: string | null) => {
        await changeApproved(id, token);
        if (!functions || !functions.setAllpaintings || !token) return;
        const data = await getAllPaintings(token);
        if (!data || !data.paintings) return;
        functions.setAllpaintings(data.paintings);
    };
    return (
        <tr>
            <td className="pl-12">{id}</td>
            <td className="pl-12">{name}</td>
            <td className="pl-12">{painter.name}</td>
            <td className="pl-8" onClick={() => navigate(`${id.toString()}`)}>
                Wijzig
            </td>
            <td className="pl-8" onClick={() => handleApproval(id, token)}>
                {isApproved ? 'Maak ontzichtbaar' : 'Maak zichtbaar'}
            </td>
        </tr>
    );
};
