import { Routes, Route, useNavigate } from 'react-router-dom';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
import { Login, AdminAddPainting, AdminFilters, AdminPaintings } from './index';

export const AdminRouter = () => {
    const navigate = useNavigate();
    const token = useAppSelector(selectToken);
    if (!token) {
        return <Login />;
    }
    return (
        <>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <p onClick={() => navigate('./paintings')}>Schilderijen</p>
                <p onClick={() => navigate('./paintings/addPainting')}>
                    Voeg een schilderij toe
                </p>
                <p onClick={() => navigate('./paintings/editPaintings')}>
                    Wijzig schilderijen
                </p>
                <p onClick={() => navigate('./filters')}>Wijzig filters</p>
            </div>
            <div className="pt-24">
                <Routes>
                    <Route path="/paintings/*" element=<AdminPaintings /> />
                    <Route
                        path="/paintings/addPainting"
                        element=<AdminAddPainting />
                    />
                    <Route path="/filters" element=<AdminFilters /> />
                </Routes>
            </div>
        </>
    );
};
