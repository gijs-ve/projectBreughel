import './App.css';

import { Footer } from './footer/Footer';
import { Navbar } from './navbar/Navbar';
import React from 'react';
import { Router } from './router/Router';
import logo from './logo.svg';

function App() {
    return (
        <div className="App flex flex-col h-screen justify-between">
            <div className="h-100  bg-blue-700">
                <Navbar />
            </div>
            <div className="mb-auto h-100 bg-green-500">
                <Router />
            </div>
            <Footer />
        </div>
    );
}

export default App;
