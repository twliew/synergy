import React, { useState, useEffect } from 'react';

function Matches() {
  const [matchedUserIds, setMatchedUserIds] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchMatchedUserIds(username);
  }, [username]);

  const fetchMatchedUserIds = async (username) => {
    try {
      const response = await fetch(`/api/matchedUserIds/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch matched user IDs');
      }
      const data = await response.json();
      setMatchedUserIds(data);
    } catch (error) {
      console.error('Error fetching matched user IDs:', error);
    }
  };

  return (
    <div>
      <h1>Matches</h1>
      <div>
        {matchedUserIds.map(userId => (
          <div key={userId} className="user-card">
            <p>User ID: {userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
