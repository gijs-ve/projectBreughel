import { Login } from './admin/Login';
import { AdminRouter } from './admin/AdminRouter';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex-row  flex-wrap">
                <div
                    className="max-w-lg"
                    onClick={() => navigate('./paintings')}
                >
                    Wijzig schilderijen
                </div>
                <div className="max-w-lg" onClick={() => navigate('./filters')}>
                    Wijzig filters
                </div>
            </div>
            <AdminRouter />
        </>
    );
};
