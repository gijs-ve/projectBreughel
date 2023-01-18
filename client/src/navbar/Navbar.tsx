import { Page, pages } from '../pages';
import { Logo } from '../utility/Logo';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
const Navbar = () => {
    const Pages: ReactElement[] = pages.map((i: Page) => {
        return <Link to={i.path}>{i.navText}</Link>;
    });
    return (
        <div className="flex-row flex-nowrap justify-center py-12 space-x-5">
            <Logo /> {Pages}
        </div>
    );
};
export { Navbar };
