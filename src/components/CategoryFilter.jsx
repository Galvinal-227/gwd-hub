// src/components/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`
            px-3 py-1.5 text-xs font-mono uppercase tracking-wider border-2 border-[#1a1a1a] whitespace-nowrap transition-all
            ${selected === category
              ? 'bg-accent text-white border-accent shadow-[3px_3px_0_0_#1a1a1a]'
              : 'bg-white text-[#1a1a1a] hover:bg-accent-bg hover:border-accent'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;