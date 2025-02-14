import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import MyProfile from './MyProfile';

const SelectProfile = () => {
    const { id } = useParams(); // Get id from route
    const userId = JSON.parse(localStorage.getItem("id")); // Get logged-in user ID from localStorage

    return (
        <div>
            {userId === id ? <MyProfile userId ={id}/> : <Profile userId={id}/>}
        </div>
    );
};

export default SelectProfile;
