const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');

// Add feelslike const var
const messageSix = document.querySelector('#message-6');

// To Check
const imgweather = document.createElement('img');
imgweather.setAttribute('class', 'weather-icon');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // To Check
  const location = search.value.replace(/;/g, '');

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  messageFour.textContent = '';
  messageFive.textContent = '';

  // Add feelslike
  messageSix.textContent = '';

  //We change to prefix: "http://localhost:3000" because of Heroku PORT || LocalHost:3000
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageTwo.textContent = data.error;
      } else {
        console.log('/weather?address= --data--', data.location, data.weather);
        console.log(data);
        messageOne.textContent = data.location;

        // Adding split for better showing weather

        let arrweather = data.weather.split(',');
        console.log(arrweather);
        messageTwo.textContent = arrweather[0];
        switch (arrweather[0]) {
          case 'Sunny':
            imgweather.src = '/img/icon-sunny.png';
            break;
          case 'Cloudy':
            imgweather.src = '/img/icon-cloudy.png';
            break;
          case 'Overcast':
            imgweather.src = '/img/icon-cloudy.png';
            break;
          case 'Patchy rain possible':
            imgweather.src = '/img/icon-cloudy.png';
            break;
          case 'Partly cloudy':
            imgweather.src = '/img/icon-partly-cloudy.png';
            break;
          case 'Haze':
            imgweather.src = '/img/icon-haze-foggy.png';
            break;
          case 'Clear':
            imgweather.src = '/img/icon-moon.png';
            break;
          case 'Rain':
            imgweather.src = '/img/icon-raining.png';
            break;
          case 'Light Rain':
            imgweather.src = '/img/icon-light-rain.png';
            break;
          case 'Light Drizzle':
            imgweather.src = '/img/icon-light-rain.png';
        }
        messageTwo.appendChild(imgweather);

        messageThree.textContent = arrweather[1] + ' c';
        messageFour.textContent = 'Precipitation: ' + 100 * arrweather[3] + '%';
        messageFive.textContent = 'Wind speed: ' + arrweather[4] + ' Kmph';
        messageSix.textContent = 'Feels like: ' + arrweather[2] + ' Degrees';
      }
    });
  });
});
