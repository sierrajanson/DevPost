import './App.css';
import React from 'react';
import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DevPost from "./components/DevPost.js"

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/devpost' element={<DevPost/>} />
            </Routes>
      </Router>
    </div>
  );
}

export default App;
