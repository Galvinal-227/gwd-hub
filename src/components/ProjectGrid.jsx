import React from 'react';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

const ProjectGrid = ({ projects }) => {
    if (projects.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectGrid;