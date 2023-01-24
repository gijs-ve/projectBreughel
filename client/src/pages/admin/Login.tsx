import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utility/hooks';
import { useNavigate } from 'react-router-dom';
import { login, selectToken } from '../../store';

export const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useAppSelector(selectToken);
    const cnButton =
        'inline-flex items-center px-6 py-3 ml-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700';
    const whiteLabel =
        'text-white group flex items-center px-2 py-2 text-base font-medium rounded-md';
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const submitForm = (e: any) => {
        e.preventDefault();
        dispatch(login(name, password));
    };

    return (
        <div className="flex flex-col flex-wrap border-4 rounded-xl border-gray-300 content-center text-center border-2 bg-gray-400 my-[10%] mx-[25%]">
            <form onSubmit={submitForm}>
                <div>
                    <h1 className={whiteLabel + ' pl-24'}>Name</h1>

                    <input
                        className="h-[10%] w-[55%] py-[2%] pl-4"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className={whiteLabel + ' pl-24'}>Password</h1>
                    <input
                        className="h-[10%] w-[55%]"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" className={cnButton}>
                    Login
                </button>
            </form>
        </div>
    );
};
