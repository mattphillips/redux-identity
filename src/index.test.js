import identityReducer from './';

describe('Identity Reducer', () => {
  test('returns function when given initial state', () => {
    expect(typeof identityReducer('some state') === 'function').toBe(true);
  });

  test('inner function returns given initial state when invoked with no data', () => {
    expect(identityReducer('some state')()).toBe('some state');
  });

  test('inner function returns given first value', () => {
    const state = 'hello';
    const action = {
      type: 'HELLO',
      payload: 'world'
    };
    expect(identityReducer('hi')(state, action)).toBe('hello');
  });
});
