export const NavButton = (p: { text: string }) => {
    const { text } = p;
    return (
        <div className="border-4 rounded-xl border-yellow-400 max-w-48 px-4 py-2 bg-yellow-200">
            {text}
        </div>
    );
};
