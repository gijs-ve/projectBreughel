import { Props } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { changeApproved } from '../utility/functions';
import { useAppSelector } from '../utility/hooks';
import { selectToken } from '../store';

const Default = () => {
  return ( <></>)
}

export const PaintingRow = (p: Props) => {
  const token = useAppSelector(selectToken);
    const { painting } = p;
    const navigate = useNavigate()
    if (!painting || !painting.isApproved)
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
            <td className="pl-8" onClick={() => changeApproved(id, token)}>Verwijder</td>
        </tr>
    );
};
