import { Page, pages } from '../pages';

import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { NavButton } from './NavButton';
import { ReactElement } from 'react';
import { selectToken } from '../store';
import { useAppSelector } from '../utility/hooks';

const Navbar = () => {
    const token = useAppSelector(selectToken);
    const Links: ReactElement[] = pages.map((page: Page) => {
        if (page.inNavbar || token) {
            const isRed = token && !page.inNavbar ? true : false;
            return (
                <Link key={page.path} to={page.path}>
                    <NavButton hasToken={isRed} text={page.navText} />
                </Link>
            );
        }
        return <div key={page.path} />;
    });
    return (
        <div className="flex flex-row flex-nowrap pl-20 border-b-2 border-b-blue-800 max-w-full">
            <Logo />
            <div className="pl-4 flex flex-row">{Links}</div>
        </div>
    );
};
export { Navbar };
