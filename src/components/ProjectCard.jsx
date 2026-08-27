// src/components/ProjectCard.jsx
import React, { useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

const ProjectCard = ({ project }) => {
  const [showDetail, setShowDetail] = useState(false);
  const IconComponent = project.icon;

  const statusClass = {
    Live: 'status-live',
    Development: 'status-dev',
    Archived: 'status-archived',
  }[project.status] || '';

  return (
    <>
      <div
        className="card-brutalist p-4 cursor-pointer relative group"
        onClick={() => setShowDetail(true)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="card-icon w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center bg-white group-hover:border-accent group-hover:bg-accent-bg transition-colors">
              {IconComponent && <IconComponent className="w-5 h-5 group-hover:text-accent" />}
            </div>
            <div>
              <h4 className="font-heading text-lg font-black leading-tight group-hover:text-accent transition-colors">
                {project.name}
              </h4>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-accent font-bold">{project.category}</span>
                <span className="w-1 h-1 bg-[#1a1a1a] rounded-full" />
                <span className={`status-badge ${statusClass}`}>{project.status}</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#1a1a1a] group-hover:text-accent group-hover:translate-x-1 transition-all" />
        </div>

        <p className="mt-2 text-sm font-mono text-[#1a1a1a] opacity-75 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono border border-[#1a1a1a] bg-white group-hover:border-accent group-hover:bg-accent-bg transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-mono border border-[#1a1a1a] bg-white">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 border-2 border-[#1a1a1a] hover:border-accent hover:bg-accent hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => setShowDetail(true)}
            className="p-1 border-2 border-[#1a1a1a] hover:border-accent hover:bg-accent hover:text-white transition-colors"
            aria-label="Preview"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ProjectDetail
        project={project}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
};

export default ProjectCard;