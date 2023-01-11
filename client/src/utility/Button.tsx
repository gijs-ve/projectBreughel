import { ButtonProps } from '../../../types/types';

const Button = (p: ButtonProps) => {
    const { onClickEvent, text, type } = p;
    let buttonType = type;
    if (!buttonType) {
        buttonType = 'default';
    }
    return <button onClick={() => onClickEvent()}>{`${text}`}</button>;
};

export { Button };
