import { getPreviewUrl } from './utils';

const content = {
  id: 42,
  name: 'This is a name',
  year: '2020',
  elements: {
    header: {
      value: 'header',
    },
  },
};

const previewResourceUrl = 'https://goacoustic.com/tenant_id/'

describe('getPreviewUrl', () => {
  test('should work for hardcoded url', () => {
    const config = { url: 'https://localhost:3000/blog/this-is-hardcoded' };
    const result = getPreviewUrl({
      config,
      content
    });

    expect(result).toBe(`https://localhost:3000/blog/this-is-hardcoded`);
  });


  test('should work for single value', () => {
    const config = { url: 'design-topics/{content.id}' };
    const result = getPreviewUrl({
      config,
      content,
      previewResourceUrl
    });

    expect(result).toBe(`${previewResourceUrl}design-topics/42`);
  });

  test('should work with leading `/` in the url', () => {
    const config = { url: '/design-topics/{content.id}' };
    const result = getPreviewUrl({
      config,
      content,
      previewResourceUrl
    });

    expect(result).toBe(`${previewResourceUrl}design-topics/42`);
  });

  test('should work for single nested value', () => {
    const config = { url: 'design-topics/{content.elements.header.value}' };
    const result = getPreviewUrl({
      config,
      content,
      previewResourceUrl
    });

    expect(result).toBe(`${previewResourceUrl}design-topics/header`);
  });

  test('should work for multiple values', () => {
    const config = { url: 'design-topics/{content.year}/{content.id}' };
    const result = getPreviewUrl({
      config,
      content,
      previewResourceUrl
    });

    expect(result).toBe(`${previewResourceUrl}design-topics/2020/42`);
  });

  test('should work with "eval" function', () => {
    const config = { url: 'design-topics/{content.year}/{slugify(content.name)}' };
    const result = getPreviewUrl({
      config,
      content,
      previewResourceUrl
    });

    expect(result).toBe(`${previewResourceUrl}design-topics/2020/This-is-a-name`);
  });

  test('should work with absolute url', () => {
    const config = { url: 'https://google.com/design-topics/{slugify(content.name)}' };
    const result = getPreviewUrl({
      config,
      content
    });

    expect(result).toBe(`https://google.com/design-topics/This-is-a-name`);
  });
});