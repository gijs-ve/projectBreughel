import { Page, pages } from '../pages';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
const Navbar = () => {
    const Pages: ReactElement[] = pages.map((i: Page) => {
        return <Link to={i.path}>{i.navText}</Link>;
    });
    return <div>{Pages}</div>;
};
export { Navbar };
