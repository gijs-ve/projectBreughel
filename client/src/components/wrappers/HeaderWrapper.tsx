import React from 'react';

export const HeaderWrapper = (props: { children?: React.ReactNode }) => {
    return <header className="header">{props.children}</header>;
};
