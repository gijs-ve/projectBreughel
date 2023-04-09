import { Page, pages } from '../pages';

import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { NavButton } from './NavButton';
import { ReactElement } from 'react';
import { selectToken } from '../store';
import { useAppSelector } from '../utility/hooks';

const Navbar = () => {
    const twlg = `md:sticky md:top-0 md:flex md:flex-row md:flex-nowrap lg:pl-4 xl:pl-40 md:border-b-2 md:border-b-blue-800 md:max-w-full`;
    const twsm = `sm:sticky sm:top-0 sm:flex sm:flex-row sm:flex-nowrap sm:border-b-2 sm:border-b-red-800`;
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
        <div className={twlg + ' ' + twsm}>
            <Logo />
            <div className="pl-4 flex flex-row min-w-fit">{Links}</div>
        </div>
    );
};
export { Navbar };
