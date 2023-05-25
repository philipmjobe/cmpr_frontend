import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CampgroundPage = () => {
  const { id } = useParams();
  const [campground, setCampground] = useState(null);

  useEffect(() => {
    axios
      .get(`/campgrounds/${id}`)
      .then((response) => {
        setCampground(response.data);
      })
      .catch((error) => {
        console.error('Error fetching campground details:', error);
      });
  }, [id]);

  if (!campground) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{campground["campground_name"]}</h2>
      {/* Display other campground details */}
    </div>
  );
};

export default CampgroundPage;
