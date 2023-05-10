import React from 'react';
// import './App.css';
// import { useState } from 'react';
import axios from 'axios'; 

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

const defaultCampgrounds: Campground[] = [];

export default function Campgrounds() {
  const [campgrounds, setCampgrounds]: [Campground[], (campgrounds: Campground[]) => void] = React.useState(
    defaultCampgrounds
    );
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true)

  const [error, setError]: [string, (error: string) => void]= React.useState('')

  React.useEffect(() => {
    axios.get<Campground[]>("http://localhost:3000/campgrounds", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setCampgrounds(response.data);
      setLoading(false)
    })
    .catch(ex => {
      const error = ex.response.status === 404 ? "Resource Not Found" : "An Unexpected Error Has Occurred"
      setError(error)
      setLoading(false)
    })
  }, []);

  return (
    <div className='App'>
      <ul className='campgrounds'>
        {campgrounds.map((campground) => (
          <li key={campground.id}>
            <h3>{campground.campground_name}</h3>
          </li>
        ))}
      </ul>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}