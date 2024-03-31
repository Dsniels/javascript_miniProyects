const { getAutoCompleteHandler } = require('./server');

// Test case 1: data length is greater than MAX_CHARS
test('data length is greater than MAX_CHARS', () => {
  const data = 'ThisIsALongString';
  const result = getAutoCompleteHandler(data);
  expect(result).toEqual([]);
});

// Test case 2: data length is less than or equal to MAX_CHARS
test('data length is less than or equal to MAX_CHARS', () => {
  const data = 'ShortStr';
  const result = getAutoCompleteHandler(data);
  expect(result.length).toBe(5);
});

// Test case 3: auxiliary data is generated when Math.random() < RATIO_AUXILIAR_DATA
test('auxiliary data is generated when Math.random() < RATIO_AUXILIAR_DATA', () => {
  // Mocking Math.random() to always return a value less than RATIO_AUXILIAR_DATA
  const originalMathRandom = Math.random;
  Math.random = jest.fn().mockReturnValue(0.05);

  const data = 'ShortStr';
  const result = getAutoCompleteHandler(data);
  expect(result.length).toBe(5);
  expect(result.every(item => item.auxiliary !== '')).toBe(true);

  // Restoring Math.random() to its original implementation
  Math.random = originalMathRandom;
});

// Test case 4: auxiliary data is not generated when Math.random() >= RATIO_AUXILIAR_DATA
test('auxiliary data is not generated when Math.random() >= RATIO_AUXILIAR_DATA', () => {
  // Mocking Math.random() to always return a value greater than or equal to RATIO_AUXILIAR_DATA
  const originalMathRandom = Math.random;
  Math.random = jest.fn().mockReturnValue(0.5);

  const data = 'ShortStr';
  const result = getAutoCompleteHandler(data);
  expect(result.length).toBe(5);
  expect(result.every(item => item.auxiliary === '')).toBe(true);

  // Restoring Math.random() to its original implementation
  Math.random = originalMathRandom;
});