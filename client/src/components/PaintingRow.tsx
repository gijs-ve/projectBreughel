import { Props } from '../../../types/types';

export const PaintingRow = (p: Props) => {
    const { painting } = p;
    if (!painting)
        return (
            <tr>
                <td className="pl-4">Error</td>
                <td>Error</td>
                <td>Error</td>
                <td>Wijzig</td>
                <td>Verwijder</td>
            </tr>
        );
    const { id, name, painterId } = painting;
    return (
        <tr>
            <td className="pl-12">{id}</td>
            <td className="pl-12">{name}</td>
            <td className="pl-12">{painterId}</td>
            <td className="pl-8">Wijzig</td>
            <td className="pl-8">Verwijder</td>
        </tr>
    );
};
