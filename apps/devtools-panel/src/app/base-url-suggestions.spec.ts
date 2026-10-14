import { findOperation, suggestBaseUrls } from './base-url-suggestions';

describe('findOperation', () => {
  const operations = [
    { method: 'get', path: '/pet/findByStatus', tokenName: 'FIND_PETS_BY_STATUS' },
    { method: 'get', path: '/pet/{petId}', tokenName: 'GET_PET_BY_ID' },
    { method: 'post', path: '/pet', tokenName: 'ADD_PET' },
  ];
  const find = (baseUrl: string, method: string, url: string): string | undefined =>
    findOperation(operations, baseUrl, { method, url })?.tokenName;

  it('finds the operation of a request under an absolute base URL', () => {
    expect(find('https://api.test/v3', 'GET', 'https://api.test/v3/pet/7')).toBe('GET_PET_BY_ID');
    expect(find('https://api.test/v3/', 'POST', 'https://api.test/v3/pet')).toBe('ADD_PET');
  });

  it('prefers the most literal template', () => {
    expect(find('https://api.test/v3', 'GET', 'https://api.test/v3/pet/findByStatus')).toBe('FIND_PETS_BY_STATUS');
  });

  it('matches a relative base URL against the path', () => {
    expect(find('/api', 'GET', 'http://localhost:4200/api/pet/7')).toBe('GET_PET_BY_ID');
    expect(find('', 'GET', 'http://localhost:4200/pet/7')).toBe('GET_PET_BY_ID');
  });

  it('returns nothing for another base URL, method or path', () => {
    expect(find('https://api.test/v3', 'GET', 'https://other.test/v3/pet/7')).toBeUndefined();
    expect(find('https://api.test/v3', 'GET', 'https://api.test/v2/pet/7')).toBeUndefined();
    expect(find('https://api.test/v3', 'DELETE', 'https://api.test/v3/pet/7')).toBeUndefined();
    expect(find('https://api.test/v3', 'GET', 'https://api.test/v3/pet/7/photos')).toBeUndefined();
  });
});

describe('suggestBaseUrls', () => {
  const petstore = [
    { method: 'get', path: '/pet/findByStatus' },
    { method: 'get', path: '/pet/{petId}' },
    { method: 'post', path: '/pet' },
    { method: 'get', path: '/store/inventory' },
  ];

  it('derives the base URL from a request that ends with a path template', () => {
    expect(
      suggestBaseUrls(petstore, [{ method: 'GET', url: 'https://petstore3.swagger.io/api/v3/store/inventory' }]),
    ).toEqual([{ baseUrl: 'https://petstore3.swagger.io/api/v3', operations: 1 }]);
  });

  it('ranks candidates by the number of distinct operations seen under them', () => {
    const suggestions = suggestBaseUrls(petstore, [
      { method: 'GET', url: 'https://api.test/v3/pet/findByStatus' },
      { method: 'GET', url: 'https://api.test/v3/store/inventory' },
      { method: 'POST', url: 'https://api.test/v3/pet' },
      { method: 'GET', url: 'https://other.test/shop/store/inventory' },
    ]);
    expect(suggestions[0]).toEqual({ baseUrl: 'https://api.test/v3', operations: 3 });
    expect(suggestions[1]).toEqual({ baseUrl: 'https://other.test/shop', operations: 1 });
  });

  it('counts an operation once however many of its requests were seen', () => {
    expect(
      suggestBaseUrls(petstore, [
        { method: 'GET', url: 'https://api.test/pet/1' },
        { method: 'GET', url: 'https://api.test/pet/2' },
      ]),
    ).toEqual([{ baseUrl: 'https://api.test', operations: 1 }]);
  });

  it('ignores requests with another method or an unrelated path', () => {
    expect(
      suggestBaseUrls(petstore, [
        { method: 'DELETE', url: 'https://api.test/v3/store/inventory' },
        { method: 'GET', url: 'https://api.test/v3/users/me' },
        { method: 'GET', url: 'not a url' },
      ]),
    ).toEqual([]);
  });

  it('ignores templates without a literal segment, which would match every request', () => {
    expect(
      suggestBaseUrls([{ method: 'get', path: '/{id}' }], [{ method: 'GET', url: 'https://api.test/a/b' }]),
    ).toEqual([]);
  });

  it('returns at most three suggestions', () => {
    const observed = ['a', 'b', 'c', 'd'].map((host) => ({
      method: 'GET',
      url: `https://${host}.test/store/inventory`,
    }));
    expect(suggestBaseUrls(petstore, observed)).toHaveLength(3);
  });
});
