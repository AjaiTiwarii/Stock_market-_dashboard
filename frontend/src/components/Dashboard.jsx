import React, { useState, useEffect } from 'react';
import CompanyList from './CompanyList';
import StockChart from './StockChart';
import { stockAPI } from '../services/api';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockLoading, setStockLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const companiesData = await stockAPI.getCompanies();
        setCompanies(companiesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch companies. Make sure the backend server is running.');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch stock data when company is selected
  const handleSelectCompany = async (company) => {
    setSelectedCompany(company);
    
    try {
      setStockLoading(true);
      const stockPrices = await stockAPI.getStockPrices(company.id);
      setStockData(stockPrices);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch stock data for ${company.symbol}`);
      console.error('Error fetching stock data:', err);
      setStockData([]);
    } finally {
      setStockLoading(false);
    }
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Connection Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      <CompanyList
        companies={companies}
        selectedCompany={selectedCompany}
        onSelectCompany={handleSelectCompany}
        loading={loading}
      />
      
      <StockChart
        company={selectedCompany}
        stockData={stockData}
        loading={stockLoading}
      />
    </div>
  );
};

export default Dashboard;