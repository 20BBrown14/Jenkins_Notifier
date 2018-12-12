import request from '../../../src/modules/dataLoadSagas';

describe('Data Loading Sagas Modules', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe('request', () => {
    it('makes the request', async () => {
      fetch.mockResponseOnce({ status: 204, data: ' ' });
      request('someUrl');
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('someUrl');
    });
  });
});
