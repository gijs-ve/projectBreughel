import { FC } from 'react';
import { Home } from './Home';
import { Paintings } from './Paintings';
import { Offerte } from './Offerte';
import { Contact } from './Contact';
import { Winkelmand } from './Winkelmand';

export type Page = {
    component: FC;
    icon: string;
    navText: string;
    path: string;
};
const pages: Page[] = [
    {
        component: Home,
        icon: 'none',
        navText: 'Home',
        path: '/',
    },
    {
        component: Paintings,
        icon: 'none',
        navText: 'Collecties',
        path: '/collecties',
    },
    {
        component: Offerte,
        icon: 'none',
        navText: 'Persoonlijk schilderij',
        path: '/offerte',
    },
    {
        component: Contact,
        icon: 'none',
        navText: 'Contact',
        path: '/contact',
    },
    {
        component: Winkelmand,
        icon: 'none',
        navText: 'Winkelmand',
        path: '/winkelmand',
    },
];
export { pages };
