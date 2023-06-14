import React from 'react';

const Legend = () => {
  return (
    <div className="legend">
      <h4>Amenities Legend</h4>
      <div>
        <strong>RV Hookups:</strong>
        <ul>
          <li>NH: No hookups</li>
          <li>E: Electric</li>
          <li>WE: Water Electric</li>
          <li>WES: Water Electric Sewer</li>
        </ul>
      </div>
      <div>
        <strong>Sanitary Dump:</strong>
        <ul>
          <li>DP: Dump available</li>
          <li>ND: No dump</li>
        </ul>
      </div>
      <div>
        <strong>Max RV Length:</strong>
        <ul>
          <li>32ft: 32 feet</li>
        </ul>
      </div>
      <div>
        <strong>Toilets:</strong>
        <ul>
          <li>FT: Flush toilets</li>
          <li>VT: Vault toilets</li>
          <li>FTVT: Some flush toilets, some vault toilets</li>
          <li>PT: Pit toilets</li>
          <li>NT: No toilets</li>
        </ul>
      </div>
      <div>
        <strong>Drinking Water:</strong>
        <ul>
          <li>DW: Drinking water at campground</li>
          <li>NW: No drinking water (bring your own)</li>
        </ul>
      </div>
      <div>
        <strong>Showers:</strong>
        <ul>
          <li>SH: Showers</li>
          <li>NS: No showers</li>
        </ul>
      </div>
      <div>
        <strong>Reservations:</strong>
        <ul>
          <li>RS: Accepts reservations</li>
          <li>NR: No reservations</li>
          <li>Blank: Unknown reservations (no data available)</li>
        </ul>
      </div>
      <div>
        <strong>Pets:</strong>
        <ul>
          <li>PA: Pets allowed</li>
          <li>NP: No pets allowed</li>
        </ul>
      </div>
      <div>
        <strong>Fee:</strong>
        <ul>
          <li>L$: Free or under $12</li>
        </ul>
      </div>
    </div>
  );
};

export default Legend;
