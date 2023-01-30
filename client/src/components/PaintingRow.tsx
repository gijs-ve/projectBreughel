import { Props } from '../../../types/types';
import { Link } from 'react-router-dom';

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
            <Link key={id} to={id.toString()}><td className="pl-8">Wijzig</td></Link>
            <td className="pl-8">Verwijder</td>
        </tr>
    );
};
