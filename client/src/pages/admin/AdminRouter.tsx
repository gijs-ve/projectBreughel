import { Routes, Route, useNavigate } from 'react-router-dom';
import { Props } from '../../../../types/types';
import { selectToken } from '../../store';
import { useAppSelector } from '../../utility/hooks';
import {
    Login,
    AdminAddPainting,
    AdminFilters,
    AdminPaintings,
    AdminFrontpage,
} from './index';

const NavigateField = (p: Props) => {
    const { path, text } = p;
    const navigate = useNavigate();
    return <p onClick={() => navigate(`${path}`)}>{text}</p>;
};

const NavigateTexts = () => {
    const navigateTexts = [
        {
            path: './frontpage',
            text: 'Voorpagina',
        },
        {
            path: './paintings',
            text: 'Schilderijen',
        },
        {
            path: './paintings/addPainting',
            text: 'Voeg een schilderij toe',
        },
        {
            path: './painters',
            text: 'Wijzig schilders',
        },
        {
            path: './filters',
            text: 'Wijzig filters',
        },
    ];
    const Texts = navigateTexts.map((i: { path: string; text: string }) => {
        return <NavigateField path={i.path} text={i.text} />;
    });
    return <>{Texts}</>;
};

export const AdminRouter = () => {
    const token = useAppSelector(selectToken);
    if (!token) {
        return <Login />;
    }
    return (
        <>
            <div className="flex-row inline-flex justify-center flex-nowrap h-max-xs space-x-5">
                <NavigateTexts />
            </div>
            <div className="pt-24">
                <Routes>
                    <Route path="/frontpage/*" element=<AdminFrontpage /> />
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
