import './App.css';

import { Footer } from './footer/Footer';
import { Navbar } from './navbar/Navbar';
import React from 'react';
import { Router } from './router/Router';
import logo from './logo.svg';

function App() {
    return (
        <div className="App flex flex-col h-screen justify-between select-none">
            <div className="max-h-40 bg-blue-700">
                <Navbar />
            </div>
            <div className="bg-blue-600 h-8" />

            <div className="mb-auto h-100 bg-blue-600">
                <Router />
            </div>
            <Footer />
        </div>
    );
}

export default App;
