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
export type Filter = 'abstract' | 'animal' | 'blackWhite' | 'color' | 'gold';
export type Painting = {
    name: string;
    length: number;
    width: number;
    price: number;
    painter: Painter;
    filters: Filter[];
    isApproved: boolean;
    isPurchasable: boolean;
    isSold: boolean;
};

//Interface
type buttonType = 'default' | 'icon';

//React props
export type ButtonProps = {
    onClickEvent: Function;
    text?: string;
    type?: string;
    icon?: string;
};
