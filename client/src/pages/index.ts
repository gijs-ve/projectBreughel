import { FC } from 'react';
import { Home } from './Home';
import { Paintings } from './Paintings';
import { UserSettings } from './UserSettings';
export type Page = {
    component: FC;
    navText: string;
    path: string;
};
const pages: Page[] = [
    {
        component: Home,
        navText: 'Home',
        path: '/',
    },
    {
        component: Paintings,
        navText: 'Schilderijen',
        path: '/schilderijen',
    },
    {
        component: UserSettings,
        navText: 'Instellingen',
        path: '/user',
    },
];
export { pages };
