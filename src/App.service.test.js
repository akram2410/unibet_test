import axios from 'axios';
import './setUpTests';
import Service from './App.service';

axios.get = jest.fn();
window.sessionStorage = {
  getItem: _ => null,
  setItem: jest.fn()
};

describe('App Service', () => {
  it('should convert the data properly', () => {
    axios.get.mockReturnValue(Promise.resolve({
      data: {
        liveEvents: [
          {
            event: { name: '', start: '', sport: '' },
            liveData: { eventId: 1 }
          },
          {
            event: { name: '', start: '', sport: '' },
            liveData: { eventId: 2 }
          },
          {
            event: { name: '', start: '', sport: '' },
            liveData: { eventId: 3 }
          }
        ]
      }
    }));
    Service.requestMatchesData().then(data => {
      expect(data.dataLoaded).toBeTruthy();
      expect(data.errorMessage).toBeFalsy();
      expect(data.matches.length).toBe(3);
      expect(data.matches[0].eventId).toBe(1);
      expect(data.matches[1].eventId).toBe(2);
      expect(data.matches[2].eventId).toBe(3);
    });
  });

  it('should sent the no data error message when no data is fetched', () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { liveEvents: [] } }));
    Service.requestMatchesData().then(data => {
      expect(data.dataLoaded).toBeTruthy();
      expect(data.errorMessage).toEqual('No matches are available right now!');
      expect(data.matches.length).toBe(0);
    });
  });

  it('should sent the error message when xhr fails', () => {
    axios.get.mockReturnValue(Promise.reject({}));
    Service.requestMatchesData().then(data => {
      expect(data.dataLoaded).toBeTruthy();
      expect(data.errorMessage).toEqual('Error while loading matches!');
      expect(data.matches.length).toBe(0);
    });
  });
});
