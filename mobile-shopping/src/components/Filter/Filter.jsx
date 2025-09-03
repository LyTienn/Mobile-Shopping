import React, { useState, useEffect } from 'react';
import { Card, Select, Button, Space } from 'antd';
import './Filter.css';

const { Option } = Select;

const Filter = ({ filter, onFilterChange, onReset, onApply }) => {
  useEffect(() => {
    if(filter){
      setFilters(filter);
    }
  }, [filter]);

  const [filters, setFilters] = useState({
    priceFrom: 0,
    priceTo: 50000000,
    ratingFrom: 0,
    ratingTo: 5
  });

  const priceOptions = [
    { value: 0, label: '0 VNĐ' },
    { value: 1000000, label: '1,000,000 VNĐ' },
    { value: 2000000, label: '2,000,000 VNĐ' },
    { value: 3000000, label: '3,000,000 VNĐ' },
    { value: 5000000, label: '5,000,000 VNĐ' },
    { value: 10000000, label: '10,000,000 VNĐ' },
    { value: 15000000, label: '15,000,000 VNĐ' },
    { value: 20000000, label: '20,000,000 VNĐ' },
    { value: 50000000, label: '50,000,000 VNĐ' }
  ];

  const ratingOptions = [
    { value: 0, label: '0 Sao' },
    { value: 1, label: '1 Sao' },
    { value: 2, label: '2 Sao' },
    { value: 3, label: '3 Sao' },
    { value: 4, label: '4 Sao' },
    { value: 5, label: '5 Sao' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      priceFrom: 0,
      priceTo: 50000000,
      ratingFrom: 0,
      ratingTo: 5
    };
    setFilters(resetFilters);
    onReset && onReset(resetFilters);
  };

  return (
    <Card className='filter-container p2-b'
      title="Filter"
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="filter-section">
          <div className="filter-title p2-r">Price</div>
          <div className='filter-field'>
            <span className="filter-label">From:</span>
            <Select
              value={filters.priceFrom}
              onChange={(value) => handleFilterChange('priceFrom', value)}
              className="filter-select"
            >
              {priceOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className='filter-field'>
            <span className="filter-label">To:</span>
            <Select
              value={filters.priceTo}
              onChange={(value) => handleFilterChange('priceTo', value)}
              className="filter-select"
            >
              {priceOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <div className="filter-title p2-r">Rating</div>
          <div className='filter-field'>
            <span className="filter-label">From:</span>
            <Select
              value={filters.ratingFrom}
              onChange={(value) => handleFilterChange('ratingFrom', value)}
              className="filter-select"
            >
              {ratingOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className='filter-field'>
            <span className="filter-label">To:</span>
            <Select
              value={filters.ratingTo}
              onChange={(value) => handleFilterChange('ratingTo', value)}
              className='filter-select'
            >
              {ratingOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <Space className="filter-actions">
          <Button type="default" onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" onClick={onApply}>
            Apply
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default Filter;