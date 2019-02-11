import toMatchImageSnapshot from 'jest-image-snapshot';
import { determineJobStatusImage, determineJobStatusTooltip } from '../../../src/modules/jobStatus';

jest.mock('../../../src/assets/successful.png');

expect.extend({ toMatchImageSnapshot });
describe('jobStatus Module', () => {
  describe('determineJobStatusImage', () => {
    describe('When color is blue', () => {
      it('should return succesful image', () => {
        const image = determineJobStatusImage('blue');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is blue_anime', () => {
      it('should return succesfulAnime image', () => {
        const image = determineJobStatusImage('blue_anime');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is red', () => {
      it('should return failure image', () => {
        const image = determineJobStatusImage('red');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is red_anime', () => {
      it('should return failureAnime image', () => {
        const image = determineJobStatusImage('red_anime');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is yellow', () => {
      it('should return unstable image', () => {
        const image = determineJobStatusImage('yellow');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is yellow_anime', () => {
      it('should return unstable_anime image', () => {
        const image = determineJobStatusImage('yellow_anime');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is notbuilt', () => {
      it('should return notbuilt image', () => {
        const image = determineJobStatusImage('notbuilt');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is notbuilt_anime', () => {
      it('should return notbuilt_anime image', () => {
        const image = determineJobStatusImage('notbuilt_anime');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color aborted', () => {
      it('should return notbuilt image', () => {
        const image = determineJobStatusImage('aborted');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is aborted_anime', () => {
      it('should return notbuild_anime image', () => {
        const image = determineJobStatusImage('aborted_anime');
        expect(image).toBeDefined();
        expect(image).not.toEqual('unknown_status');
      });
    });
    describe('When color is unknown', () => {
      it('should return unknown_status string', () => {
        const image = determineJobStatusImage('someStatus');
        expect(image).toBeDefined();
        expect(image).toEqual('unknown_status');
      });
    });
  });
  describe('determineJobStatusTooltip', () => {
    describe('When color is blue', () => {
      it('should return successful build string', () => {
        const tooltip = determineJobStatusTooltip('blue');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Successful Build');
      });
    });
    describe('When color is blue_anime', () => {
      it('should return building string', () => {
        const tooltip = determineJobStatusTooltip('blue_anime');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Building');
      });
    });
    describe('When color is red', () => {
      it('should return failed built string', () => {
        const tooltip = determineJobStatusTooltip('red');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Failed Build');
      });
    });
    describe('When color is red_anime', () => {
      it('should return building string', () => {
        const tooltip = determineJobStatusTooltip('red_anime');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Building');
      });
    });
    describe('When color is yellow', () => {
      it('should return unstable string', () => {
        const tooltip = determineJobStatusTooltip('yellow');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Unstable Build');
      });
    });
    describe('When color is yellow_anime', () => {
      it('should return building string', () => {
        const tooltip = determineJobStatusTooltip('yellow_anime');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Building');
      });
    });
    describe('When color is notbuild', () => {
      it('should return notbuilt string', () => {
        const tooltip = determineJobStatusTooltip('notbuilt');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Never Built');
      });
    });
    describe('When color is notbuild_anime', () => {
      it('should return building string', () => {
        const tooltip = determineJobStatusTooltip('notbuilt_anime');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Building');
      });
    });
    describe('When color is aborted', () => {
      it('should return aborted string', () => {
        const tooltip = determineJobStatusTooltip('aborted');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Aborted');
      });
    });
    describe('When color is aborted_anime', () => {
      it('should return building string', () => {
        const tooltip = determineJobStatusTooltip('aborted_anime');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Building');
      });
    });
    describe('When color is unknown', () => {
      it('should return unknown status string', () => {
        const tooltip = determineJobStatusTooltip('unknown');
        expect(tooltip).toBeDefined();
        expect(tooltip).toEqual('Unknown Status');
      });
    });
  });
});
