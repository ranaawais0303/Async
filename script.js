'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
////////////////////////////////////////////////////////////////////////
///////////country api by using xmlHTTP request response

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${+(
              data.population / 1000000
            ).toFixed(1)}M People</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*

// const url = 'https://restcountries.com/v3.1/name/{name}';
const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country 1
    renderCountry(data);

    //Get neighbour country (2)
    const [neighbour] = data.borders;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    //event Listener for country 2
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      // console.log(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('USA');
getCountryAndNeighbour('Pakistan');
*/

///////////////////////////////////////////////////////////////
//Fetch api
//https://restcountries.com/v2/name/${country}

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(res => {
//     if (!res.ok)
//       throw new Error(`${errorMsg}(
//     ${res.status}
//   )`);
//     return res.json();
//   });
// };

/////////////////////////////////////////////////////////
// const getCountry = function (country) {
//   //Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}🛹🦼🦼🛹🛹 `);
//       renderError(`something went wrong 🛴🛴🛹🛹🛹 ${err.message}.try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountry('pak');
// });

//////////////////////////////////////////////////////
// const getCountry = function (country) {
//   //Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('no neighbour is found');

//       //Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}🛹🦼🦼🛹🛹 `);
//       renderError(`something went wrong 🛴🛴🛹🛹🛹 ${err.message}.try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

/////////////////////////////////////////////////////////
///////challenge # 1
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`problem with geocoding(
//     ${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(` you are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(`country not found(
//     ${res.status}
//   )`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(` ${err.message}🛴🚲🚲🛹🛹`));
// };
// whereAmI(52.5081, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// getCountry('pak');
////////////////////////////////////////////////////////
///////Promisifying
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

/////////////////////////////////////////////////////////
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then(response => {
//       if (!response.ok)
//         throw new Error(`problem with geocoding(
//     ${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(` you are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(`country not found(
//     ${res.status}
//   )`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(` ${err.message}🛴🚲🚲🛹🛹`));
// };
// btn.addEventListener('click', whereAmI);

////////////////////////////////////////////////////
//same whereAmI function with async await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then(pos => console.log(pos));
const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //reverse Geolocation
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //Country Data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('problem getting Country data');
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    // alert(err.message);
    renderError(` ${err.message}`);
  }
};

whereAmI();
whereAmI();
