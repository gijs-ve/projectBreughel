export const NavButton = (p: { text: string; hasToken: boolean }) => {
    const { text, hasToken } = p;
    const color = hasToken ? 'red' : 'yellow';
    console.log(color, text);
    return (
        <div
            className={`text-2xl antialiase border-4 rounded-xl border-yellow-400 max-w-48 px-4 py-2 ${
                hasToken
                    ? 'bg-red-600 hover:bg-red-400 hover:border-red-400'
                    : 'bg-yellow-300 hover:bg-yellow-500 hover:border-yellow-400'
            } text-gray-800 ${hasToken ? '' : ''}`}
        >
            {text}
        </div>
    );
};
