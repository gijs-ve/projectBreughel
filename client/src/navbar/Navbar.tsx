import { Page, pages } from '../pages';
import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
const Navbar = () => {
    const Links: ReactElement[] = pages.map((i: Page) => {
        return (
            <Link key={i.path} to={i.path}>
                {i.navText}
            </Link>
        );
    });
    return (
        <div className="flex-row flex-nowrap justify-center py-12 space-x-5">
            <Logo /> {Links}
        </div>
    );
};
export { Navbar };
