import React from 'react';

const ProjectStats = ({ projects }) => {
  const total = projects.length;
  const categories = {};
  projects.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      <div>
        <span className="font-semibold text-[#171717] dark:text-white">{total}</span>
        <span className="text-[#737373] dark:text-[#a3a3a3] ml-1">Projects</span>
      </div>
      {Object.entries(categories).map(([key, value]) => (
        <div key={key}>
          <span className="font-semibold text-[#171717] dark:text-white">{value}</span>
          <span className="text-[#737373] dark:text-[#a3a3a3] ml-1">{key}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;