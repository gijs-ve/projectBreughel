import React from 'react';

export const FooterWrapper = (props: { children?: React.ReactNode }) => {
    return <footer className="footer">{props.children}</footer>;
};
