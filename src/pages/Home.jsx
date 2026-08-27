// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { projects, categories } from '../data/projects';
import { useSearch } from '../hooks/useSearch';
import Header from '../components/Header';
import SearchOverlay from '../components/SearchOverlay';
import CategoryFilter from '../components/CategoryFilter';
import FeaturedProject from '../components/FeaturedProject';
import ProjectGrid from '../components/ProjectGrid';
import Hero from '../components/Hero';

const Home = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredItems } = useSearch(
    projects,
    ['name', 'description', 'category', 'tech', 'tags']
  );

  const featuredProjects = projects.filter(p => p.featured);

  // Hitung statistik
  const totalProjects = projects.length;
  const uniqueCategories = new Set(projects.map(p => p.category)).size;
  const uniqueTech = new Set(projects.flatMap(p => p.tech)).size;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProject = (id) => {
    const project = projects.find(p => p.id === id);
    if (project && project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Header onSearchClick={() => setSearchOpen(true)} />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelectProject}
      />

      <main>
        <Hero 
          projectCount={totalProjects} 
          categoryCount={uniqueCategories} 
          techCount={uniqueTech} 
        />

        <div className="max-w-7xl mx-auto px-4 pb-12">
          {featuredProjects.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-black uppercase tracking-wider mb-4">Featured</h2>
              <div className="space-y-4">
                {featuredProjects.map(project => (
                  <FeaturedProject key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="font-heading text-2xl font-black uppercase tracking-wider">All Projects</h2>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter projects..."
                    className="w-full px-3 py-2 font-mono text-sm border-2 border-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="md:hidden px-3 py-2 border-2 border-[#1a1a1a] font-mono text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
                >
                  ⌘K
                </button>
              </div>
            </div>

            <div className="mb-6">
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            <ProjectGrid projects={filteredItems} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;