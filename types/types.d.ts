//User related
export type User = {
    id: string;
    name: string;
    mail: string;
    isAdmin: boolean;
};

//Painting related
export type Painter = {
    id: string;
    name: string;
};

export type Painting = {
    name: string;
    length: number;
    width: number;
    price: number;
    painter: Painter;
    filters: string[];
    isApproved: boolean;
    isPurchasable: boolean;
    isSold: boolean;
};
export type Paintings = Painting[];

//Interface
type buttonType = 'default' | 'icon';

//React props
export type ButtonProps = {
    onClickEvent?: Function;
    text?: string;
    type?: string;
    icon?: string;
};

//Redux state
export type UserState = {
    token?: string | null;
    profile?: User | null;
};

export type RawState = {
    userState: UserState;
};

//Server requests
export type request = {
    body?: {
        user?: User;
    };
};
