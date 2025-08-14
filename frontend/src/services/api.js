import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const stockAPI = {
  getCompanies: async () => {
    const response = await api.get('/companies/');
    return response.data;
  },

  getCompany: async (companyId) => {
    const response = await api.get(`/companies/${companyId}`);
    return response.data;
  },

  getStockPrices: async (companyId, days = 30) => {
    const response = await api.get(`/companies/${companyId}/stock-prices/?days=${days}`);
    return response.data;
  },
};