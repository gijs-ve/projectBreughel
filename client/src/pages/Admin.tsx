import { Login } from './admin/Login';
import { AdminRouter } from './admin/AdminRouter';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
    return (
        <>
            <div onClick={() => navigate('./paintings')}>
                Wijzig schilderijen
            </div>
            <div onClick={() => navigate('./filters')}>Wijzig filters</div>
            <AdminRouter />
        </>
    );
};
