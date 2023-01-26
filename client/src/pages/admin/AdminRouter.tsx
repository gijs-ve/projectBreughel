import { Routes, Route, useNavigate } from 'react-router-dom';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
import { Login, AdminPaintings, AdminFilters } from './index';

export const AdminRouter = () => {
    const navigate = useNavigate();
    const token = useAppSelector(selectToken);
    if (!token) {
        return <Login />;
    }
    return (
        <>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <p onClick={() => navigate('./paintings')}>
                    Wijzig schilderijen
                </p>
                <p onClick={() => navigate('./filters')}>Wijzig filters</p>
            </div>
            <Routes>
                <Route path="/paintings" element=<AdminPaintings /> />
                <Route path="/filters" element=<AdminFilters /> />
            </Routes>
        </>
    );
};
