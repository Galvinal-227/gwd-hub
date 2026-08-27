import React from 'react';
import { Search } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center border border-[#e5e5e5] dark:border-[#404040]">
        <Search className="w-8 h-8 text-[#a3a3a3] dark:text-[#737373]" />
      </div>
      <h3 className="text-xl font-semibold text-[#171717] dark:text-white mb-2">
        No projects found
      </h3>
      <p className="text-[#737373] dark:text-[#a3a3a3]">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
};

export default EmptyState;