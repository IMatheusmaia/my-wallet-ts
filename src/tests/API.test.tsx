import { vi } from 'vitest';
import fetchData from '../services/request';
import mockData from './helpers/mockData';

const MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => mockData,
} as Response;

const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

test('Testa se a função fetchData é chamada', async () => {
  const data = await fetchData();
  expect(mockFetch).toHaveBeenCalled();
  expect(mockFetch).toHaveBeenCalledTimes(1);
  fetchData();
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(mockFetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  expect(data.CAD.name).toBe('Dólar Canadense/Real Brasileiro');
});
