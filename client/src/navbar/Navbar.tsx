import { Page, pages } from '../pages';
import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAppSelector } from '../utility/hooks';
import { selectToken } from '../store';
const Navbar = () => {
    const token = useAppSelector(selectToken);
    const Links: ReactElement[] = pages.map((i: Page) => {
        if (i.inNavbar) {
            return (
                <Link key={i.path} to={i.path}>
                    {i.navText}
                </Link>
            );
        }
        return <div key={i.path} />;
    });
    return (
        <div className="flex-row flex-nowrap justify-center py-12 space-x-5">
            <Logo /> {Links}
        </div>
    );
};
export { Navbar };
