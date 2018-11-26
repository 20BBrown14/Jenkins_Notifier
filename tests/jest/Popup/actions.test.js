import { A_JOB_INPUT_DATA_CHANGED, jobInputDataChanged } from '../../../src/Popup/actions';

describe('Popup Actions', () => {
  it('should produce a job input data changed action', () => {
    const dataChangedAction = jobInputDataChanged('someValue');
    expect(dataChangedAction.type).toEqual(A_JOB_INPUT_DATA_CHANGED);
    expect(dataChangedAction.data.newValue).toEqual('someValue');
  });
});
