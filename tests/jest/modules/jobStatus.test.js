import toMatchImageSnapshot from 'jest-image-snapshot';
import determineImage from '../../../src/modules/jobStatus';

jest.mock('../../../src/assets/successful.png');

expect.extend({ toMatchImageSnapshot });

describe('determineJobStatusImage', () => {
  describe('When color is blue', () => {
    it('should return succesful image', () => {
      const image = determineImage('blue');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is blue_anime', () => {
    it('should return succesfulAnime image', () => {
      const image = determineImage('blue_anime');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is red', () => {
    it('should return failure image', () => {
      const image = determineImage('red');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is red_anime', () => {
    it('should return failureAnime image', () => {
      const image = determineImage('red_anime');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is yellow', () => {
    it('should return unstable image', () => {
      const image = determineImage('yellow');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is yellow_anime', () => {
    it('should return unstable_anime image', () => {
      const image = determineImage('yellow_anime');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is notbuilt', () => {
    it('should return notbuilt image', () => {
      const image = determineImage('notbuilt');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is notbuilt_anime', () => {
    it('should return notbuilt_anime image', () => {
      const image = determineImage('notbuilt_anime');
      expect(image).toBeDefined();
      expect(image).not.toEqual('unknown_status');
    });
  });
  describe('When color is unknown', () => {
    it('should return unknown_status string', () => {
      const image = determineImage('someStatus');
      expect(image).toBeDefined();
      expect(image).toEqual('unknown_status');
    });
  });
});
