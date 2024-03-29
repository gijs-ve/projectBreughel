import { useState } from 'react';

export const NavButton = (p: { text: string; hasToken: boolean }) => {
    const { text, hasToken } = p;
    const color = hasToken ? 'red' : 'yellow';
    const [mouseEnter, setMouseEnter] = useState(false);
    return (
        <div
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            className={`text-1xl h-full antialiase px-8 min-w-min ${
                hasToken
                    ? 'bg-blue-600 hover:bg-red-400 hover:border-blue-400'
                    : 'bg-blue-700 hover:bg-blue-600 hover:border-yellow-400'
            } text-gray-800 ${hasToken ? '' : ''}`}
        >
            <div
                className={`translate-y-1/2 text-yellow-500 ${
                    mouseEnter ? 'border-b-2 border-yellow-400' : ''
                }`}
            >
                {text}
            </div>
        </div>
    );
};
