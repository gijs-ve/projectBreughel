import { Routes, Route } from 'react-router-dom';
import { Page, pages } from '../pages';
import { FC } from 'react';
const Router = () => {
    const routes = pages.map((i: Page) => {
        const Component: FC = i.component;
        return (
            <Route key={i.path} path={`${i.path}/*`} element=<Component /> />
        );
    });
    return <Routes>{routes}</Routes>;
};
export { Router };
