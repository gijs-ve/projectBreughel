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
            return (
                <Link key={i.path} to={i.path}>
                    <NavButton text={i.navText} />
                </Link>
            );
        }
        return <div key={i.path} />;
    });
    return (
        <div className="flex flex-row flex-nowrap justify-center py-12 space-x-5 min-w-24 pr-40 border-b-8 border-b-blue-800">
            <Logo /> {Links}
        </div>
    );
};
export { Navbar };
