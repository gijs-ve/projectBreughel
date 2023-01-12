//User related
export type User = {
    id: string;
    name: string;
    mail: string;
    isAdmin: boolean;
};

//Painting related
export type Painter = User;
export type Category = 'animals' | 'landscape';
export type Painting = {
    name: string;
    length: number;
    width: number;
    price: number;
    painter: Painter;
    category: Category;
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
