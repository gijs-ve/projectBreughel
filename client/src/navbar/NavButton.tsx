export const NavButton = (p: { text: string }) => {
    const { text } = p;
    return <div className="border-4 rounded-lg max-w-48 px-4 py-2">{text}</div>;
};
