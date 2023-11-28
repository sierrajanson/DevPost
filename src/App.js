import './App.css';
import React from 'react';
import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import Login from './components/Login.js'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DevPost from "./components/DevPost.js"

function App() {
  // w vsc react js config url: https://code.visualstudio.com/docs/nodejs/reactjs-tutorial
  // w push to git tutorial: https://www.datacamp.com/tutorial/git-push-pull
  return (
    <div className="App">
      <Router>
          <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/devpost' element={<DevPost/>} />
                <Route path='/login' element={<Login/>} />

            </Routes>
      </Router>
    </div>
  );
}

export default App;

