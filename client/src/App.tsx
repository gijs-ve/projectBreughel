import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './navbar/Navbar';
import { Router } from './router/Router';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Router />
        </div>
    );
}

export default App;
