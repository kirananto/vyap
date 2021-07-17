import * as React from 'react';
import './profile.css'

export const Profile = () => {
  return (
    <div className="mobile-main">
    {/* <!-- Profile Header --> */}
    <div className="top-container">
      <img
        className="profile-icon"
        src="./assets/icons/profile/profile-icon.svg"
        alt=""
      />
      <h2>Jhon Doe</h2>
      <h5>Shope Name</h5>
    </div>

    {/* <!-- cards Container--> */}
    <div className="cards-container">
      {/* <!-- Card-1 --> */}
      <div className="card-1">
        <div className="card-1-child-1">
          <h4><a className="links" href="#">My Account</a></h4>
        </div>
        <div className="card-1-child-2">
          <h4><a className="links" href="#">Stock Adjust</a></h4>
        </div>
      </div>
      {/* <!-- card-2 --> */}
      <div className="card-2">
        <div className="card-2-child-1">
          <h4><a className="links" href="#">Settings</a></h4>
        </div>
        <div className="card-2-child-2">
          <h4><a className="links" href="#">Logout</a></h4>
        </div>
      </div>
    </div>
    {/* <!-- Cards Container End --> */}

    <div className="whatsapp-btn-container">
      <button className="whatsapp-btn">
        <img
          className="whatsapp-icon"
          src="./assets/icons/profile/whatsapp.svg"
          alt=""
        />Help
      </button>
    </div>

    {/* <!-- Nav-Bottom  --> */}
    <div className="nav-bottom-container">
        <div className="nav-bottom-child-1">
          <figure className="grid justify-items-center">
            <img className="w-6" src="./assets/icons/home.svg" alt="" />
            <figcaption className="text-sm font-semibold text-gray-900">Home</figcaption>
          </figure>
        </div>
        <div className="nav-bottom-child-2">
          <figure  className="grid justify-items-center">
            <img className="w-6" src="./assets/icons/more.svg" alt="" />
            <figcaption className="text-sm font-semibold text-gray-900">More</figcaption>
          </figure>
        </div>
    </div>
  </div>
  );
}
