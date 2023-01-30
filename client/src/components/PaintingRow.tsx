import { Props } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

const Default = () => {
  return ( <tr>
    <td className="pl-4">Error</td>
    <td>Error</td>
    <td>Error</td>
    <td>Wijzig</td>
    <td>Verwijder</td>
  </tr>)
}

export const PaintingRow = (p: Props) => {
    const { painting } = p;
    const navigate = useNavigate()
    if (!painting)
        return (
           <Default />
        );
    const { id, name, painterId } = painting;
    if (!id || !name || !painterId) return (
      <Default />
   );
    return (
        <tr>
            <td className="pl-12">{id}</td>
            <td className="pl-12">{name}</td>
            <td className="pl-12">{painterId}</td>
            <td className="pl-8" onClick={() => navigate(`${id.toString()}`)}>Wijzig</td>
            <td className="pl-8">Verwijder</td>
        </tr>
    );
};
