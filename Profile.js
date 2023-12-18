import React from 'react';
import './Profile.css';
import './DevPost.css'
import Anon from "../images/anon.png";
const Profile = () =>{
  // add inputs here to fill in values
  // add some sort of photo uploading functionality 
  // add Connectdr Tab 
  // include option to upload here, will have to link to authenticated account!

  // would be nice to have a line beneath each h3 and a little plus to add to them, which leads to dropdown
  return (
    <div className="profile_content">
      <div>
        <h1> User Profile </h1>
        <img src={Anon} height="200"></img>
      </div> 
      <div className="profile_text">
        <h3> Bio </h3>
        <h3> Language </h3>
        <h3> Socials </h3>
      </div>
    </div>
  );
}
export default Profile;

