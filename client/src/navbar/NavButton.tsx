export const NavButton = (p: { text: string; hasToken: boolean }) => {
    const { text, hasToken } = p;
    const color = hasToken ? 'red' : 'yellow';
    console.log(color, text);
    return (
        <div
            className={`border-4 rounded-xl border-yellow-400 max-w-48 px-4 py-2 bg-${color}-200`}
        >
            {text}
        </div>
    );
};
