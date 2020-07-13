const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dcb435d9b604a51387db57a963454e94&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + '. It is ' +
                body.current.temperature + '° degrees out and feels like ' +
                body.current.feelslike + '° degrees. There are ' +
                body.current.wind_speed + 'km/h winds at ' +
                body.current.wind_dir + '. There is a ' +
                body.current.precip + '% chance of precipitation.'
            )
        }
    })
}

module.exports = forecast