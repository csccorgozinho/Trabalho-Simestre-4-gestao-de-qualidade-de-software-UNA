import { AJAX } from 'C:\Users\cscco\OneDrive\Documentos\test\src\js\helpers.js'; 

describe('AJAX Function', () => {
  // Mocking fetch function
  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  it('should make a GET request and return data', async () => {
    const responseData = { message: 'Success', status: 200 };
    const json = jest.fn().mockResolvedValue(responseData);
    fetch.mockResolvedValue({ ok: true, json });

    const url = 'https://example.com/api';

    const result = await AJAX(url);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(result).toEqual(responseData);
  });

  it('should make a POST request and return data', async () => {
    const responseData = { message: 'Created', status: 201 };
    const json = jest.fn().mockResolvedValue(responseData);
    fetch.mockResolvedValue({ ok: true, json });

    const url = 'https://example.com/api';
    const uploadData = { key: 'value' };

    const result = await AJAX(url, uploadData);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    expect(result).toEqual(responseData);
  });

  it('should handle timeout and throw an error', async () => {
    const url = 'https://example.com/api';
    const timeoutError = new Error('Request took too long! Timeout after 10 seconds');
    fetch.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 2000)));

    try {
      await AJAX(url);
    } catch (error) {
      expect(error).toEqual(timeoutError);
    }
  });

  it('should handle network errors and throw an error', async () => {
    const url = 'https://example.com/api';
    const networkError = new Error('Network request failed');

    fetch.mockRejectedValue(networkError);

    try {
      await AJAX(url);
    } catch (error) {
      expect(error).toEqual(networkError);
    }
  });
});