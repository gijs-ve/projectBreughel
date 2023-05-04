import './App.css';

import { Footer } from './footer/Footer';
import { FooterWrapper } from './components/wrappers/FooterWrapper';
import { HeaderWrapper } from './components/wrappers/HeaderWrapper';
import { MainWrapper } from './components/wrappers/MainWrapper';
import { Navbar } from './navbar/Navbar';
import React from 'react';
import { Router } from './router/Router';
import logo from './logo.svg';

function App() {
    return (
        <div>
            <HeaderWrapper>
                <Navbar />
            </HeaderWrapper>
            <MainWrapper>
                <Router />
            </MainWrapper>
            <FooterWrapper>
                <Footer />
            </FooterWrapper>
        </div>
    );
}

export default App;
