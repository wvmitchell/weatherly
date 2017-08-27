import 'whatwg-fetch';

export default {
  getConditions: (location) => (
    fetch(`http://api.wunderground.com/api/d2afc821240910b2/conditions/q/${location}.json`)
      .then((response) => {
        return response.json()
      })
  ),
  getForecast: (location) => (
    fetch(`http://api.wunderground.com/api/d2afc821240910b2/forecast/q/${location}.json`)
      .then((response) => {
        return response.json()
      })
  ),
}
