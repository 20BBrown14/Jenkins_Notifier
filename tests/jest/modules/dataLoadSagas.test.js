import request, { checkStatus, parseJson } from '../../../src/modules/dataLoadSagas';

describe('Data Loading Sagas Modules', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe('request', () => {
    it('makes the request successfully', () => {
      fetch.mockResponseOnce({ status: 200, data: ' ' });
      request('someUrl', 'someOptions');
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('someUrl');
    });
    it('sets error if request fails', () => {
      fetch.mockReject(new Error('someErrorMessage'));
      request('someUrl', 'someOptions').then((res) => {
        expect(res.err).toEqual(Error('someErrorMessage'));
      });
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('someUrl');
    });
  });
  describe('Response Status Check', () => {
    describe('response status equals 200', () => {
      it('returns same response it was given', () => {
        const response = { status: 200 };
        const returned = checkStatus(response);
        expect(returned).toEqual(response);
      });
    });
    describe('response status does not equal 200', () => {
      it('throws an error', () => {
        const response = { status: 500 };
        expect(() => { checkStatus(response); }).toThrow(Error);
      });
    });
  });
  describe('JSON Parsing', () => {
    it('returns same response if it contains valid JSON', () => {
      const jsonFunction = jest.fn();
      jsonFunction.mockImplementation(() => (
        {
          property: 'someJsonHere',
        }
      ));
      const response = { json: jsonFunction };
      const returned = parseJson(response);
      expect(returned).toEqual({ property: 'someJsonHere' });
      expect(response.json).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledTimes(1);
    });
    it('throws error if response contains invalid json', () => {
      const jsonFunction = jest.fn();
      jsonFunction.mockImplementation(() => {
        throw new Error();
      });
      const response = { json: jsonFunction };
      expect(() => { parseJson(response); }).toThrow(Error);
    });
  });
});
