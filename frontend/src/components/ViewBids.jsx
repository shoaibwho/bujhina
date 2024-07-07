import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBids = ({ problemId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/problems/${problemId}`);
      setBids(response.data.bids);
    };
    fetchData();
  }, [problemId]);

  return (
    <div>
      <h2>Bids for this Problem</h2>
      {bids.length > 0 ? (
        <ul>
          {bids.map((bid) => (
            <li key={bid._id}>
              Teacher: {/* Display teacher details from User model */}
              Price: ${bid.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids yet.</p>
      )}
    </div>
  );
};

export default ViewBids;
