import React, { useEffect, useState } from 'react';

interface Campground {
  id: number;
  lng: number;
  lat: number;
  gps_composite_field: string;
  campground_code: string;
  campground_name: string;
  campground_type: string;
  phone_number: string;
  dates_open: string;
  comments: string;
  number_of_campsites: number;
  elevation: string;
  amenities: string;
  state: string;
  nearest_town: string;
}

interface CampgroundsProps {
  children: (campgrounds: Campground[]) => React.ReactNode;
}

const Campgrounds = ({ children }: CampgroundsProps) => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

  useEffect(() => {
    // Fetch campground data from API and set the campgrounds state
    const fetchCampgrounds = async () => {
      try {
        // Fetch campground data from API
        const response = await fetch('http://localhost:3000/campgrounds');
        const data = await response.json();

        // Update the campgrounds state
        setCampgrounds(data);
      } catch (error) {
        console.error('Error fetching campgrounds:', error);
      }
    };

    fetchCampgrounds();
  }, []);

  return <>{children(campgrounds)}</>;

};

export default Campgrounds;
