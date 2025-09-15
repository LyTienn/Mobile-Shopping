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
    priceTo: 5000,
    ratingFrom: 0,
    ratingTo: 5
  });

  const priceOptions = [
    { value: 0, label: '0$' },
    { value: 10, label: '10$' },
    { value: 20, label: '20$' },
    { value: 50, label: '50$' },
    { value: 100, label: '100$' },
    { value: 200, label: '200$' },
    { value: 500, label: '500$' },
    { value: 1000, label: '1000$' },
    { value: 2000, label: '2000$' },
    { value: 5000, label: '5000$' }
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
      priceTo: 1000,
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