// src/components/FeaturedProject.jsx
import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';

const FeaturedProject = ({ project }) => {
  if (!project) return null;
  const IconComponent = project.icon;

  return (
    <div className="border-4 border-[#1a1a1a] bg-white p-6 relative shadow-[8px_8px_0_0_#2563EB]">
      <div className="absolute -top-3 -right-3 bg-accent text-white px-3 py-1 text-xs font-mono font-bold flex items-center gap-1 border-2 border-[#1a1a1a] rotate-3">
        <Star size={12} fill="white" /> FEATURED
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 border-2 border-[#1a1a1a] flex items-center justify-center bg-accent-bg">
            {IconComponent && <IconComponent className="w-7 h-7 text-accent" />}
          </div>
          <div>
            <h3 className="font-heading text-2xl font-black text-accent">{project.name}</h3>
            <div className="flex items-center gap-3 text-sm font-mono">
              <span className="text-accent font-bold">{project.category}</span>
              <span className="w-1 h-1 bg-[#1a1a1a] rounded-full" />
              <span className={`status-badge ${
                project.status === 'Live' ? 'status-live' : 
                project.status === 'Development' ? 'status-dev' : 'status-archived'
              }`}>{project.status}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 font-mono text-sm opacity-80">{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-1">
        {project.tech.map(tech => (
          <span key={tech} className="px-2 py-0.5 text-[10px] font-mono border border-[#1a1a1a] bg-white hover:border-accent hover:bg-accent-bg transition-colors">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent inline-flex items-center gap-2 px-4 py-2 text-sm font-mono"
        >
          Open Project
          <ExternalLink className="w-4 h-4" />
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1a1a1a] bg-white hover:border-accent hover:bg-accent hover:text-white transition-colors text-sm font-mono"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default FeaturedProject;