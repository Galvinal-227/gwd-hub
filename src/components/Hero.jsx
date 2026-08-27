// src/components/Hero.jsx
import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import SnakeGame from './SnakeGame';

const Hero = ({ projectCount, categoryCount, techCount }) => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing'
  const [gameScore, setGameScore] = useState(0);

  const handlePlayClick = () => {
    setGameState('playing');
    setGameScore(0);
  };

  const handleGameOver = (score) => {
    setGameScore(score);
  };

  const handleExitGame = () => {
    setGameState('idle');
    setGameScore(0);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Kiri */}
        <div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            <span className="block text-accent">GWD HUB</span>
            <span className="block text-outline">ALL-IN-ONE</span>
          </h1>
          <p className="mt-4 text-sm md:text-base font-mono text-[#1a1a1a] max-w-md">
            Everything I've built, in one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="stat-box">
              <div className="stat-number">{projectCount}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-box">
              <div className="stat-number text-secondary">{categoryCount}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" style={{ color: '#8B5CF6' }}>{techCount}</div>
              <div className="stat-label">Tech Stack</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm font-mono">
            <span className="border-2 border-accent bg-accent text-white px-3 py-1">⌘K</span>
            <span className="text-accent font-medium">Search projects</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </div>
        </div>

        {/* Kanan - Polaroid */}
        <div className="flex flex-col items-start gap-4">
          <div className="border-4 border-[#1a1a1a] bg-white p-3 w-full max-w-sm shadow-[8px_8px_0_0_#2563EB]">
            <div className="aspect-square bg-[#0d0d0d] flex flex-col items-center justify-center border border-[#1a1a1a] relative overflow-hidden font-mono">
              
              {/* Grid background */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>

              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none z-20" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)'
              }}></div>

              {/* ===== KONTEN UTAMA ===== */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-3 py-4">
                
                {/* Jika idle: tampilkan GWD HUB + Play button */}
                {gameState === 'idle' && (
                  <>
                    <div className="shrink-0">
                      <pre className="text-[8px] md:text-[9px] leading-[1.1] text-[#00ff41] select-none whitespace-pre text-center">
{`  ██████╗  ██╗    ██╗██████╗ 
  ██╔════╝ ██║    ██║██╔══██╗
  ██║  ███╗██║ █╗ ██║██║  ██║
  ██║   ██║██║███╗██║██║  ██║
  ╚██████╔╝╚███╔███╔╝██████╔╝
   ╚═════╝  ╚══╝╚══╝ ╚═════╝`}</pre>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      <pre className="text-[8px] md:text-[9px] leading-[1.1] text-[#00ff41] select-none whitespace-pre text-center">
{`  ██╗  ██╗██╗   ██╗██████╗ 
  ██║  ██║██║   ██║██╔══██╗
  ███████║██║   ██║██████╔╝
  ██╔══██║██║   ██║██╔══██╗
  ██║  ██║╚██████╔╝██████╔╝
  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝`}</pre>
                    </div>

                    {/* Tombol PLAY */}
                    <button
                      onClick={handlePlayClick}
                      className="mt-3 flex items-center justify-center gap-3 border-2 border-[#00ff41]/60 px-5 py-2 bg-[#00ff41]/10 hover:bg-[#00ff41]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00ff41]"
                    >
                      <span className="text-[#00ff41] text-xl">▶</span>
                      <span className="text-[#00ff41] text-[10px] tracking-widest font-mono font-bold">PLAY</span>
                    </button>
                  </>
                )}

                {/* Jika playing: tampilkan game Snake */}
                {gameState === 'playing' && (
                  <SnakeGame 
                    onGameOver={handleGameOver} 
                    onExit={handleExitGame}
                  />
                )}

              </div>

              {/* Kursor berkedip (sembunyikan saat game) */}
              {gameState === 'idle' && (
                <div className="absolute bottom-8 right-8 z-10 flex items-center gap-1">
                  <span className="w-2 h-4 bg-[#00ff41] retro-blink"></span>
                  <span className="text-[8px] text-[#00ff41]/50 font-mono">_</span>
                </div>
              )}

              {/* Status bar */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#1a1a1a]/90 px-3 py-1 flex justify-between text-[8px] text-[#00ff41]/70 font-mono border-t border-[#00ff41]/20">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] retro-blink"></span>
                  {gameState === 'playing' ? 'GAME::SNAKE' : 'SYSTEM::GWD'}
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] retro-blink"></span>
                  {gameState === 'playing' ? `SCORE: ${gameScore}` : 'ONLINE'}
                </span>
                <span>v3.0</span>
              </div>
              
              {/* Anchor points */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent"></div>
            </div>
            <div className="mt-2 text-xs font-mono uppercase tracking-wider text-center text-accent">GWD Hub — 2026</div>
          </div>

          {/* Let's Connect */}
          <div className="bounding-box w-full max-w-sm px-4 py-3 border-accent">
            <div className="text-xs font-bold uppercase tracking-widest text-accent">Let's Connect</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <a href="#" className="inline-flex items-center gap-1 border-2 border-[#1a1a1a] px-3 py-1 text-xs font-mono hover:bg-accent hover:text-white hover:border-accent transition-colors">
                <Github size={14} /> GitHub
              </a>
              <a href="#" className="inline-flex items-center gap-1 border-2 border-[#1a1a1a] px-3 py-1 text-xs font-mono hover:bg-accent hover:text-white hover:border-accent transition-colors">
                <Twitter size={14} /> Twitter
              </a>
              <a href="#" className="inline-flex items-center gap-1 border-2 border-[#1a1a1a] px-3 py-1 text-xs font-mono hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="#" className="inline-flex items-center gap-1 border-2 border-[#1a1a1a] px-3 py-1 text-xs font-mono hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                <Mail size={14} /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;