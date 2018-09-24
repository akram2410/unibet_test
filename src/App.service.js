import axios from 'axios';

const MATCHES_DATA_API = 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a';
const CACHE_KEY = 'matches-data';
const CACHE_TIME_KEY = 'matches-data-fetch-time';
const CACHE_EXPIRY_TIME = 2 * 60 * 1000;

export default {
  /**
   * Makes the request to matches api and sets the loading and error flags
   * accordingly.
   */
  async requestMatchesData() {
    let matches = [];
    let errorMessage = '';
    let dataLoaded = false;
    try {
      matches = processMatchData(await getCacheData());
      if (!matches || !matches.length) {
        errorMessage = 'No matches are available right now!';
      }
    } catch (error) {
      errorMessage = 'Error while loading matches!';
    } finally {
      dataLoaded = true;
    }
    return { matches, errorMessage, dataLoaded };
  }
}

/**
 * Caches the data received from the api and when next time the request is made
 * the cached data is returned. The validity of the data is 2 minutes.
 */
async function getCacheData() {
  const data = JSON.parse(sessionStorage.getItem(CACHE_KEY));
  const cacheTimeData = sessionStorage.getItem(CACHE_TIME_KEY);
  const cacheTime = cacheTimeData ? new Date(cacheTimeData).getTime() : 0;
  const elapsedTime = new Date().getTime() - cacheTime;

  if (data && elapsedTime <= CACHE_EXPIRY_TIME) return data;

  const response = await axios.get(MATCHES_DATA_API);
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(response));
  sessionStorage.setItem(CACHE_TIME_KEY, new Date().toString());
  return response;
}

/**
 * Extracts the information that is needed for displaying match data from the
 * api response.
 */
function processMatchData(response) {
  return response.data.liveEvents.map(({ event, liveData }) => ({
    name: event.name,
    startDateTime: event.start,
    sportType: event.sport,
    score: liveData.score,
    eventId: liveData.eventId
  }));
}
