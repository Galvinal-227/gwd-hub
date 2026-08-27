// src/components/Header.jsx
import React from 'react';
import { Github, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = ({ onSearchClick }) => {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-[#1a1a1a] bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center bg-accent overflow-hidden">
              <img src="/LogoG2.png" alt="GWD Logo" className="w-12 h-12" />
            </div>
            <h1 className="font-heading text-xl font-black tracking-tight">
              <span className="text-accent">GWD</span> Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSearchClick}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-mono border-2 border-[#1a1a1a] bg-white hover:border-accent hover:bg-accent-bg transition-colors group"
            >
              <Search className="w-4 h-4 group-hover:text-accent" />
              <span>Search projects...</span>
              <kbd className="ml-1 px-1.5 py-0.5 text-[10px] border border-[#1a1a1a] bg-[#f0f2f5] group-hover:border-accent">⌘K</kbd>
            </button>

            <button
              onClick={onSearchClick}
              className="md:hidden p-2 border-2 border-[#1a1a1a] hover:border-accent hover:bg-accent-bg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="https://github.com/galvin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-[#1a1a1a] hover:border-accent hover:bg-accent hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
