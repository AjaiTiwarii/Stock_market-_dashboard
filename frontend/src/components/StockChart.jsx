import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';

const StockChart = ({ company, stockData, loading }) => {
  if (loading) {
    return (
      <div className="flex-1 bg-white p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex-1 bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 mb-2">Select a Company</h3>
          <p className="text-gray-500">Choose a company from the left panel to view its stock chart</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const currentPrice = stockData.length > 0 ? stockData[stockData.length - 1]?.close_price : 0;
  const previousPrice = stockData.length > 1 ? stockData[stockData.length - 2]?.close_price : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  const highPrice = Math.max(...stockData.map(d => d.high_price));
  const lowPrice = Math.min(...stockData.map(d => d.low_price));
  const avgVolume = stockData.reduce((sum, d) => sum + d.volume, 0) / stockData.length;

  // Format data for chart
  const chartData = stockData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: item.close_price,
    open: item.open_price,
    high: item.high_price,
    low: item.low_price,
    volume: item.volume
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <div className="mt-2 space-y-1 text-sm">
            <p><span className="text-gray-600">Open:</span> ₹{data.open?.toFixed(2)}</p>
            <p><span className="text-gray-600">High:</span> ₹{data.high?.toFixed(2)}</p>
            <p><span className="text-gray-600">Low:</span> ₹{data.low?.toFixed(2)}</p>
            <p><span className="text-gray-600">Close:</span> ₹{data.price?.toFixed(2)}</p>
            <p><span className="text-gray-600">Volume:</span> {(data.volume / 1000).toFixed(0)}K</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{company.symbol}</h2>
            <p className="text-gray-600">{company.name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">₹{currentPrice?.toFixed(2)}</div>
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}₹{priceChange?.toFixed(2)} ({priceChangePercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">High (30D)</p>
              <p className="text-lg font-semibold text-gray-800">₹{highPrice?.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <TrendingDown className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Low (30D)</p>
              <p className="text-lg font-semibold text-gray-800">₹{lowPrice?.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Volume</p>
              <p className="text-lg font-semibold text-gray-800">{(avgVolume / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Sector</p>
              <p className="text-lg font-semibold text-gray-800">{company.sector}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 rounded-lg p-4" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-sm text-gray-600">
        <p>Last 30 days stock price movement for {company.name}</p>
      </div>
    </div>
  );
};

export default StockChart;