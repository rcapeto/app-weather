//https://api.hgbrasil.com/weather?key=1bd479a1&lat=37.4219347&lon=-122.0840367

const API_KEY = '1bd479a1';

export function getServiceURL(lat, long) {
   return `https://api.hgbrasil.com/weather?key=${API_KEY}&lat=${lat}&lon=${long}`;
}

export function getServiceWithCityURL(city) {
   return `https://api.hgbrasil.com/weather?key=${API_KEY}&city_name=${city}`;
}