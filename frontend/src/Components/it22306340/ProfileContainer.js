import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile/UserProfile';

const URL = 'http://localhost:5000/users'; 


const ProfileContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(URL).then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  return (
    <div>
      <h1>All User Profiles</h1>
      <UserProfile users={users} /> 
    </div>
  );
};

export default ProfileContainer;
