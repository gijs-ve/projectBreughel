import { Routes, Route } from 'react-router-dom';
import { pages, page } from '../pages';
const Router = () => {
    const routes = pages.map((i: page) => {
        return <Route path={`${i.path}`} element={`${i.component}`} />;
    });
    return <Routes>{routes}</Routes>;
};
export { Router };
