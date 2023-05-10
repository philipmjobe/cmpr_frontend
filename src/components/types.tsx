// Define or import StateType and CampgroundType types
export type State = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export type Campground = {
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
};