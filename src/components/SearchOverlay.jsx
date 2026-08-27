import React, { useEffect, useRef, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const SearchOverlay = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const filteredResults = query.trim()
    ? projects.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : projects;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      setSelectedIndex(-1);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      }
      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const project = filteredResults[selectedIndex];
        if (project) {
          onSelect(project.id);
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredResults, selectedIndex, onClose, onSelect]);

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll('[data-result-item]');
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto mt-20 md:mt-32 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-[#e5e5e5] dark:border-[#404040] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-[#e5e5e5] dark:border-[#404040]">
                <Search className="w-5 h-5 text-[#737373] dark:text-[#a3a3a3] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, categories, tech stack..."
                  className="flex-1 bg-transparent border-none outline-none text-[#171717] dark:text-white placeholder:text-[#a3a3a3] dark:placeholder:text-[#737373] text-lg"
                />
                <button
                  onClick={onClose}
                  className="p-1 text-[#737373] dark:text-[#a3a3a3] hover:text-[#171717] dark:hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div ref={resultsRef} className="max-h-[400px] overflow-y-auto p-2">
                {filteredResults.length > 0 ? (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#a3a3a3] dark:text-[#737373] px-3 py-2">
                      {filteredResults.length} project{filteredResults.length > 1 ? 's' : ''}
                    </p>
                    {filteredResults.map((result, index) => {
                      const IconComponent = result.icon;
                      return (
                        <button
                          key={result.id}
                          data-result-item
                          onClick={() => {
                            onSelect(result.id);
                            onClose();
                          }}
                          className={`
                            w-full flex items-center justify-between p-3 rounded-lg transition-colors group
                            ${selectedIndex === index 
                              ? 'bg-[#f5f5f5] dark:bg-[#2a2a2a]' 
                              : 'hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a]'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center text-[#171717] dark:text-white border border-[#e5e5e5] dark:border-[#404040] flex-shrink-0">
                              {IconComponent && <IconComponent className="w-4 h-4" />}
                            </div>
                            <div className="text-left min-w-0 flex-1">
                              <p className="text-[#171717] dark:text-white font-medium truncate">{result.name}</p>
                              <div className="flex items-center gap-2 text-xs text-[#737373] dark:text-[#a3a3a3]">
                                <span>{result.category}</span>
                                <span className="w-1 h-1 rounded-full bg-[#d4d4d4] dark:bg-[#404040]" />
                                <span>{result.status}</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#a3a3a3] dark:text-[#737373] group-hover:text-[#171717] dark:group-hover:text-white transition-colors flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                ) : query.trim() ? (
                  <div className="text-center py-12">
                    <p className="text-[#737373] dark:text-[#a3a3a3]">No projects found.</p>
                    <p className="text-sm text-[#a3a3a3] dark:text-[#737373] mt-1">Try a different search term.</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#a3a3a3] dark:text-[#737373]">Type to search through all projects</p>
                    <div className="flex justify-center gap-1 mt-3 text-xs text-[#a3a3a3] dark:text-[#737373]">
                      <kbd className="px-2 py-1 bg-[#f5f5f5] dark:bg-[#2a2a2a] rounded border border-[#e5e5e5] dark:border-[#404040]">↑↓</kbd>
                      <span>navigate</span>
                      <kbd className="px-2 py-1 bg-[#f5f5f5] dark:bg-[#2a2a2a] rounded border border-[#e5e5e5] dark:border-[#404040]">Enter</kbd>
                      <span>select</span>
                      <kbd className="px-2 py-1 bg-[#f5f5f5] dark:bg-[#2a2a2a] rounded border border-[#e5e5e5] dark:border-[#404040]">Esc</kbd>
                      <span>close</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;