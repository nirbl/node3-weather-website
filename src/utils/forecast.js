const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url1 =
    'http://api.weatherstack.com/current?access_key=aaae81c7591eab88bf7da1fdf84be3ab&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';

  request({ url: url1, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      const {
        weather_descriptions,
        temperature,
        precip,
        wind_speed,
      } = response.body.current;
      callback(
        undefined,
        weather_descriptions[0] +
          ',' +
          temperature +
          ',' +
          precip +
          ',' +
          wind_speed
      );
      // callback(undefined, weather_descriptions[0] + ' Temperature: ' + temperature + ' Fahrenheit. ' + ' Chance of rain: ' + precip + ' Wind: ' + wind_speed)
    }
  });
};

module.exports = forecast;
