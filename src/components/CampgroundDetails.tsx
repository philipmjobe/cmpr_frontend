import React from "react";
import {Campground} from './interfaces'

interface CampgroundDetailsProps {
  campground: Campground
}

const CampgroundDetails: React.FC<CampgroundDetailsProps> = ({campground}) => {
  return (
    <div>
      <h2>{campground.campground_name}</h2>
      <p>Code: {campground.campground_code}</p>
      <p>Type: {campground.campground_type}</p>
    </div>
  )
}

export default CampgroundDetails;