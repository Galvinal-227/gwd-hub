import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = ({ project, isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const IconComponent = project?.icon;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setIframeKey(prev => prev + 1);
    } else {
      document.body.style.overflow = 'unset';
      setIsFullscreen(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onClose]);

  if (!project) return null;

  const statusColors = {
    Live: 'text-[#22c55e] bg-[#22c55e]/10',
    Development: 'text-[#f59e0b] bg-[#f59e0b]/10',
    Archived: 'text-[#a3a3a3] bg-[#a3a3a3]/10',
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => {
            if (!isFullscreen) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              ...(isFullscreen && {
                scale: 1,
                borderRadius: 0,
              })
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
              absolute bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#404040] shadow-2xl overflow-hidden
              transition-all duration-300 ease-in-out
              ${isFullscreen 
                ? 'inset-0 rounded-none' 
                : 'inset-4 md:inset-8 max-w-6xl mx-auto rounded-2xl'
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5] dark:border-[#404040] bg-white dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center text-[#171717] dark:text-white border border-[#e5e5e5] dark:border-[#404040] flex-shrink-0">
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-[#171717] dark:text-white truncate">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-[#737373] dark:text-[#a3a3a3]">{project.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[project.status] || 'text-[#a3a3a3] bg-[#a3a3a3]/10'}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setIframeKey(prev => prev + 1)}
                  className="p-2 text-[#737373] dark:text-[#a3a3a3] hover:text-[#171717] dark:hover:text-white transition-colors rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a]"
                  aria-label="Refresh iframe"
                  title="Refresh (⌘R)"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-[#737373] dark:text-[#a3a3a3] hover:text-[#171717] dark:hover:text-white transition-colors rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a]"
                  aria-label="Toggle fullscreen"
                  title={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen (⌘F)`}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-[#737373] dark:text-[#a3a3a3] hover:text-[#171717] dark:hover:text-white transition-colors rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a]"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="relative bg-[#fafafa] dark:bg-[#0d0d0d]" style={{ height: isFullscreen ? 'calc(100vh - 64px)' : 'calc(100vh - 280px)' }}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#fafafa] dark:bg-[#0d0d0d]">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#e5e5e5] dark:border-[#404040] border-t-[#171717] dark:border-t-[#e5e5e5]"></div>
                    <p className="mt-3 text-sm text-[#737373] dark:text-[#a3a3a3]">Loading {project.name}...</p>
                  </div>
                </div>
              )}
              <iframe
                key={iframeKey}
                src={project.url}
                className="w-full h-full border-0"
                title={`${project.name} preview`}
                loading="lazy"
                onLoad={handleIframeLoad}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                allow="fullscreen"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#e5e5e5] dark:border-[#404040] bg-white dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-2 text-xs text-[#a3a3a3] dark:text-[#737373]">
                <span>⌘F</span>
                <span className="text-[#e5e5e5] dark:text-[#404040]">|</span>
                <span>⌘R to refresh</span>
                <span className="text-[#e5e5e5] dark:text-[#404040]">|</span>
                <span>Esc to close</span>
              </div>
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#e5e5e5] dark:border-[#404040] text-[#737373] dark:text-[#a3a3a3] rounded-lg hover:border-[#171717] dark:hover:border-[#e5e5e5] hover:text-[#171717] dark:hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#171717] dark:bg-[#e5e5e5] text-white dark:text-[#171717] rounded-lg hover:bg-[#404040] dark:hover:bg-[#d4d4d4] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in New Tab
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetail;