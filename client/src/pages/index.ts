import { FC } from 'react';
import { Admin } from './Admin';
import { Home } from './Home';
import { Paintings } from './Paintings';
import { Offerte } from './Offerte';
import { Contact } from './Contact';
import { Winkelmand } from './Winkelmand';

export type Page = {
    component: FC;
    icon: string;
    navText: string;
    inNavarbar: boolean;
    path: string;
};
const pages: Page[] = [
    {
        component: Home,
        icon: 'none',
        navText: 'Home',
        inNavarbar: true,
        path: '/',
    },
    {
        component: Paintings,
        icon: 'none',
        navText: 'Collecties',
        inNavarbar: true,
        path: '/collecties',
    },
    {
        component: Offerte,
        icon: 'none',
        navText: 'Persoonlijk schilderij',
        inNavarbar: true,
        path: '/offerte',
    },
    {
        component: Contact,
        icon: 'none',
        navText: 'Contact',
        inNavarbar: true,
        path: '/contact',
    },
    {
        component: Winkelmand,
        icon: 'none',
        navText: 'Winkelmand',
        inNavarbar: true,
        path: '/winkelmand',
    },
    {
        component: Admin,
        icon: 'none',
        navText: 'Admin Paneel',
        inNavarbar: false,
        path: '/boekelo-zoo',
    },
];
export { pages };
