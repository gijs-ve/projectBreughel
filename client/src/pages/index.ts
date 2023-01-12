import { FC } from 'react';
import { Home } from './Home';
import { Paintings } from './Paintings';
import { UserSettings } from './UserSettings';
export type page = {
    component: FC;
    navText: string;
    path: string;
};
const pages: page[] = [
    {
        component: Home,
        navText: 'Home',
        path: '/',
    },
    {
        component: Paintings,
        navText: 'Schilderijen',
        path: '/paintings',
    },
    {
        component: UserSettings,
        navText: 'Instellingen',
        path: '/paintings',
    },
];
export { pages };
