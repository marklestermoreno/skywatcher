import { useLocation } from "react-router-dom";
import misc from '../lib/misc'

const apiKey = process.env.REACT_APP_ACCUWEATHER_API;

export function handleKeyPress(event) {
  if (event.key === ' ') {
    event.preventDefault();
  }
};

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const getCurrentPosition = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        misc.axios
          .get(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`
          )
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      },
      error => {
        reject(error);
      }
    );
  });
};

export const getCurrentConditions = async locationKey => {
  const response = await misc.axios.get(
    `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`
  );
  return response.data[0];
};