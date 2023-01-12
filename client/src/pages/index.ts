import { FC } from 'react';
import { Home } from './Home';
import { Paintings } from './Paintings';
import { UserSettings } from './UserSettings';
type page = {
    component: FC;
    navText: string;
};
const pages: page[] = [
    {
        component: Home,
        navText: 'Home',
    },
    {
        component: Paintings,
        navText: 'Schilderijen',
    },
    {
        component: UserSettings,
        navText: 'Instellingen',
    },
];
export { pages };
