export interface Campground {
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

export interface State {
  id: string;
  name: string;
  abbreviation: string;
  boundingBox: {
    minLat: number;
    minLon: number;
    maxLat: number;
    maxLon: number;
  };
}