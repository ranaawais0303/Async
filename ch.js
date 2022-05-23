'use strict';
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`problem with geocoding(
    ${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(` you are in ${data.city}, ${data.country}`);
    })
    .catch(err => console.error(` ${err.message}🛴🚲🚲🛹🛹`));
};
whereAmI(52.5081, 13.381);
// whereAmI(-33.933, 18.474);
