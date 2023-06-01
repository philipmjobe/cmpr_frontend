import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CampgroundDetails from './CampgroundDetails';

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
      <CampgroundDetails campground={campground} />
    </div>
  );
};

export default CampgroundPage;
