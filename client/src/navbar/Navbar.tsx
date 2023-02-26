import { Page, pages } from '../pages';

import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { NavButton } from './NavButton';
import { ReactElement } from 'react';
import { selectToken } from '../store';
import { useAppSelector } from '../utility/hooks';

const Navbar = () => {
    const token = useAppSelector(selectToken);
    const Links: ReactElement[] = pages.map((i: Page) => {
        if (i.inNavbar || token) {
            const isRed = token && !i.inNavbar ? true : false;
            return (
                <Link key={i.path} to={i.path}>
                    <NavButton hasToken={isRed} text={i.navText} />
                </Link>
            );
        }
        return <div key={i.path} />;
    });
    return (
        <div className="flex flex-row flex-nowrap justify-center py-4 space-x-5 min-w-24 pr-40 border-b-8 border-b-blue-800">
            <Logo /> <div className="flex flex-row  space-x-10">{Links}</div>
        </div>
    );
};
export { Navbar };
