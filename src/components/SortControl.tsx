import React from 'react';
import '../styles/SortControl.css';

export type SortOption = 'name' | 'price' | 'none';

interface SortControlProps {
  currentSort: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

const SortControl: React.FC<SortControlProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="sort-control">
      <label htmlFor="sort-select">Sort by:</label>
      <select 
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        <option value="none">Default</option>
        <option value="name">Name (A-Z)</option>
        <option value="price">Price (Low to High)</option>
      </select>
    </div>
  );
};

export default SortControl;