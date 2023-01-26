import { Routes, Route } from 'react-router-dom';
import { AdminPaintings } from './AdminPaintings';
import { AdminFilters } from './AdminFilters';
import { useAppSelector } from '../../utility/hooks';
import { selectToken } from '../../store';
export const AdminRouter = () => {
    const token = useAppSelector(selectToken);
    if (!token) return <>Log in om te wijzigen</>;
    return (
        <Routes>
            <Route path="/paintings" element=<AdminPaintings /> />
            <Route path="/filters" element=<AdminFilters token={token} /> />
        </Routes>
    );
};
