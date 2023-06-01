import React from 'react';
import { useParams, Params } from 'react-router-dom';
import { Campground } from './types';

interface MatchParams extends Params {
  id: string;
}

interface CampgroundDetailsProps {
  campground: Campground;
}

const CampgroundDetails: React.FC<CampgroundDetailsProps> = ({ campground }) => {
  const { id } = useParams<MatchParams>();

  // Use the `id` parameter to fetch the campground details

  return (
    <div>
      <h2>Campground Details</h2>
      <p>ID: {id}</p>
      {/* Render the campground details */}
      <p>Name: {campground.campground_name}</p>
      {/* <p>Description: {campground.description}</p> */}
    </div>
  );
};

export default CampgroundDetails;
