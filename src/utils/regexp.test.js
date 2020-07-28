import {
  matchVariables,
  matchVariableName,
  includesTokenToEval,
} from './regexp';

describe('matchVariables', () => {
  test('should return null for empty string ', () => {
    const result = matchVariables('');
    expect(result).toBeNull();
  });

  test('should return null for url without curly brackets', () => {
    const result = matchVariables('domain.com/anything');
    expect(result).toBeNull();
  });

  test('should return 1-element array', () => {
    const result = matchVariables('domain.com/{content.id}');
    expect(result).toEqual(expect.arrayContaining(['{content.id}']));
  });

  test('should return 2-element array', () => {
    const result = matchVariables('domain.com/{content.year}/{content.id}');
    expect(result).toEqual(expect.arrayContaining(['{content.year}', '{content.id}']));
  });
});

describe('matchVariableName', () => {
  test('should return null for empty string ', () => {
    const result = matchVariableName('');
    expect(result).toBeNull();
  });

  test('should return null for string without curly brackets ', () => {
    const result = matchVariableName('content.id');
    expect(result).toBeNull();
  });

  test('should return variable name for valid string with curly brackets', () => {
    const result = matchVariableName('{content.id}');
    expect(result).toBe('content.id');
  });

  test('should return variable name for valid string with curly brackets and additional characters', () => {
    const result = matchVariableName('domain.com/{content.name}/anything');
    expect(result).toBe('content.name');
  });
});

describe('includesTokenToEval', () => {
  test('should return null for empty string ', () => {
    const result = includesTokenToEval('');
    expect(result).toBeNull();
  });

  test('should return null for string "{content.id}"', () => {
    const result = includesTokenToEval('{content.id}');
    expect(result).toBeNull();
  });

  test('should return truthy for string "{slugify(content.name)}"', () => {
    const result = includesTokenToEval('{slugify(content.name)}');
    expect(result).toBeTruthy();
  });
});
