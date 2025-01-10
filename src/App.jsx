import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Weather } from './components/Weather'
import { SeeMore } from './components/SeeMore'

function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Weather />} />
                    <Route path="/seemore" element={<SeeMore />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
