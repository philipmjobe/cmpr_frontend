import * as maptilersdk from '@maptiler/sdk';

maptilersdk.config.apiKey = 'P3Sp2slnwmVeFNep9d8d	';
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: [16.62662018, 49.2125578], // starting position [lng, lat]
    zoom: 14 // starting zoom
});