import { useState, useMemo } from 'react';

export const useSearch = (items, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(item => {
        return searchFields.some(field => {
          const value = item[field];
          if (Array.isArray(value)) {
            return value.some(v => v.toLowerCase().includes(term));
          }
          return String(value).toLowerCase().includes(term);
        });
      });
    }

    return result;
  }, [items, searchTerm, selectedCategory, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
  };
};