import React from 'react';
import './Profile.css';

function Profile() {
  //test -- TODO need to get user data from database
  const user = {
    name: 'Anna',
    role: 'Caregiver',
    phone: '123-456-7980',
    email: 'amuller@example.com',
    address: '123 12th Ave, Seattle, WA, USA 98122',
  };
  
  return (
    <div className="profile-container">
      <h1>Profile</h1>
        <div className="profile-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Phone Number:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
        </div>
    </div>
  );
};

export default Profile;
