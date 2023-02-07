//User related
export type User = {
    id: string;
    name: string;
    mail: string;
    isAdmin: boolean;
};

//Painting related
export type Painter = {
    id: number;
    name: string;
};

export type Filter = {
    id: number;
    name: string;
    status?: boolean;
};
export type Painting = {
    id?: number;
    name: string;
    height: number;
    width: number;
    price: number;
    painter?: Painter;
    painterId?: number;
    filters?: Filter[];
    paintingfilters?: PaintingFilter[];
    isApproved?: boolean;
    isPurchaseable?: boolean;
    isSold?: boolean;
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
export type AdminProps = {
    token?: string | null | undefined;
};

export type Props = {
    token?: string;
    functions?: {
        setAllpaintings?: Function;
        setPainting?: Function;
        fetchPainting?: Function;
    };
    id?: number | string;
    filters?: Filter[];
    path?: string;
    text?: string;
    painters?: Painter[];
    painting?: Painting;
    paintings?: Painting[];
};

//Redux state
export type UserState = {
    token?: string | null;
    profile?: User | null;
};

export type PaintingState = {
    paintings?: Painting[] | null;
};

export type RawState = {
    userState?: UserState;
    paintingState?: PaintingState;
};

//Server types
export type ServerResponse = {
    data: Data;
};

type PaintingFilter = {
    filter: Filter;
    filterId: number;
    id: number;
    paintingId: number;
};
export type Data = {
    user?: User;
    favorites?: Painting[];
    filterId?: number;
    paintingfilters?: PaintingFilter[];
    filters?: Filter[];
    painting?: Painting;
    paintings?: Painting[];
    painters?: Painter[];
    message?: string;
};
