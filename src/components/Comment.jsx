import React, { useEffect, useState } from 'react';

const Comment = ({c}) => {
    const [profile, setProfile] = useState({});
    console.log (c.userId);
   
  
    
    const fetchId = async () => {
        try {
          const response = await fetch(`https://server-08ld.onrender.com/${c.userId}/get_id`);
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
    
          const data = await response.json();
          setProfile(data[0]);
          console.log(data[0]);
          

        
        } catch (err) {
          console.log(err.message);
        }
      };
      useEffect(() => {
        fetchId();
        }, []);
    return (
            <div  style={{ padding: "5px 0", borderBottom: "1px solid #ccc" }}>
                <strong>{profile.first_name} {profile.last_name}</strong>: {c.comment}
              </div>
    );
};

export default Comment;