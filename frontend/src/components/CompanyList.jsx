import React from 'react';
import { Building, TrendingUp } from 'lucide-react';

const CompanyList = ({ companies, selectedCompany, onSelectCompany, loading }) => {
  if (loading) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-6">
          <Building className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Companies</h2>
        </div>
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center mb-6">
        <Building className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Companies</h2>
      </div>
      
      <div className="space-y-2">
        {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => onSelectCompany(company)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
              selectedCompany?.id === company.id
                ? 'bg-blue-50 border-blue-200 shadow-md'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{company.symbol}</h3>
                <p className="text-sm text-gray-600 truncate">{company.name}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  {company.sector}
                </span>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;