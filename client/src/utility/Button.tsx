import { ButtonProps } from '../../../types/types';

const Button = (p: ButtonProps) => {
    const { onClickEvent, text, type } = p;
    let buttonType = type;
    if (!buttonType) {
        buttonType = 'default';
    }
    return (
        <button
            className="inline-flex items-center px-6 py-3 ml-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            onClick={
                onClickEvent
                    ? () => onClickEvent()
                    : () => {
                          return;
                      }
            }
        >{`${text}`}</button>
    );
};

export { Button };
