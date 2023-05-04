import React from 'react';

export const MainWrapper = (props: { children?: React.ReactNode }) => {
    return <header className="main">{props.children}</header>;
};
