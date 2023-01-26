import { FilterManage } from './FilterManage';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
export const AdminPaintings = () => {
    const token = useAppSelector(selectToken);
    if (!token) return <>Log in om te wijzigen</>;
    return (
        <>
            <FilterManage token={token} />
        </>
    );
};
