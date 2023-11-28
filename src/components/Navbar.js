import React, {useState, useEffect} from 'react';
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import {getAuth, signOut, onAuthStateChanged} from "firebase/auth";

const Navbar= () =>{
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasRedirected = localStorage.getItem('redirected');
    if (hasRedirected) {
      setLoggedIn(true);
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User is signed in:", uid);
        setLoggedIn(true);
      } else {
        console.log("User is signed out");
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('redirected');
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  console.log(loggedIn);
  return (
  <div className="link_container">
    <li>
      <Link to="/"className="link">Home</Link>
    </li>
    <li>
      <Link to="/devpost"className="link">DevPost</Link>
    </li>
    <li className="login">
      {loggedIn ? (<button className="logOutBut" onClick={handleSignOut}>Sign Out</button>): (<Link to="/login" className="link">Login</Link>)}
    </li>
  </div>
  );
}
export default Navbar;