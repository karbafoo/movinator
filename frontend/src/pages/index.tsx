import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from '../components/Navbar';
import {RouterWrapper} from './router';

const Pages = () => {
    return (
        <div className="app">
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                    padding: 0,
                }}
            >
                <Router>
                    <Navbar />
                    <RouterWrapper />
                </Router>
            </div>
        </div>
    );
};

export {Pages};
