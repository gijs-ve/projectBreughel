import { FC } from 'react';
import { Home } from './Home';
import { Paintings } from './Paintings';
import { UserSettings } from './UserSettings';
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
        navText: 'Schilderijen',
        path: '/schilderijen',
    },
    {
        component: UserSettings,
        icon: 'none',
        navText: 'Instellingen',
        path: '/user',
    },
];
export { pages };
