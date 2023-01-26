import { Login } from './admin/Login';
import { AdminRouter } from './admin/AdminRouter';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <p onClick={() => navigate('./paintings')}>
                    Wijzig schilderijen
                </p>
                <p onClick={() => navigate('./filters')}>Wijzig filters</p>
            </div>
            <AdminRouter />
        </>
    );
};
