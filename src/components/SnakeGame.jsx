// src/components/SnakeGame.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 16;
const CELL_SIZE = 1;

const SnakeGame = ({ onGameOver, onExit }) => {
  const [snake, setSnake] = useState([
    [8, 8],
    [7, 8],
    [6, 8],
  ]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  const generateFood = useCallback((currentSnake) => {
    const maxAttempts = 100;
    for (let i = 0; i < maxAttempts; i++) {
      const newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];
      if (!currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1])) {
        return newFood;
      }
    }
    return null;
  }, []);

  const resetGame = useCallback(() => {
    setSnake([
      [8, 8],
      [7, 8],
      [6, 8],
    ]);
    setFood([10, 10]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead = [...head];

        switch (direction) {
          case 'RIGHT': newHead[0]++; break;
          case 'LEFT': newHead[0]--; break;
          case 'UP': newHead[1]--; break;
          case 'DOWN': newHead[1]++; break;
          default: break;
        }

        if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          if (onGameOver) onGameOver(score);
          return prevSnake;
        }

        const hitSelf = prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
        if (hitSelf) {
          setGameOver(true);
          setIsPlaying(false);
          if (onGameOver) onGameOver(score);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(prev => prev + 1);
          const newFood = generateFood(newSnake);
          if (newFood) {
            setFood(newFood);
          } else {
            setGameOver(true);
            setIsPlaying(false);
            if (onGameOver) onGameOver(score + 1);
            return newSnake;
          }
          return newSnake;
        } else {
          newSnake.pop();
          return newSnake;
        }
      });
    };

    intervalRef.current = setInterval(moveSnake, 180);

    return () => clearInterval(intervalRef.current);
  }, [direction, food, gameOver, isPlaying, generateFood, onGameOver, score]);

  // Keyboard control (desktop)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || gameOver) return;
      const key = e.key;
      e.preventDefault();
      switch (key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, isPlaying]);

  // Touch control
  const handleTouch = (dir) => {
    if (!isPlaying || gameOver) return;
    const opposite = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };
    if (direction !== opposite[dir]) {
      setDirection(dir);
    }
  };

  const renderGrid = () => {
    const grid = [];
    const snakeSet = new Set(snake.map(s => `${s[0]},${s[1]}`));
    const foodKey = `${food[0]},${food[1]}`;

    for (let y = 0; y < GRID_SIZE; y++) {
      let row = '';
      for (let x = 0; x < GRID_SIZE; x++) {
        const key = `${x},${y}`;
        if (key === foodKey) {
          row += '● ';
        } else if (snakeSet.has(key)) {
          row += '█ ';
        } else {
          row += '  ';
        }
      }
      grid.push(row);
    }
    return grid;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-mono select-none relative">
      {/* Tombol EXIT di pojok kanan atas */}
      <button
        onClick={onExit}
        className="absolute top-0 right-0 z-30 text-[6px] text-[#ff4444] border border-[#ff4444]/50 px-1.5 py-0.5 hover:bg-[#ff4444]/20 transition-colors font-mono"
        title="Exit game"
      >
        ✕ EXIT
      </button>

      <div className="relative">
        {/* Grid container */}
        <div className="border-2 border-[#00ff41]/30 bg-[#0d0d0d] p-1">
          {renderGrid().map((row, idx) => (
            <div key={idx} className="text-[6px] leading-[1.1] text-[#00ff41] whitespace-pre tracking-tight">
              {row}
            </div>
          ))}
        </div>
        {/* Skor */}
        <div className="absolute top-1 left-1 text-[6px] text-[#00ff41]/70 font-mono">
          SCORE: {score}
        </div>

        {/* Game Over overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="text-[#00ff41] text-[10px] font-mono text-center">
              <div>GAME OVER</div>
              <div className="text-[8px] mt-1">SCORE: {score}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={resetGame}
                  className="border border-[#00ff41] px-2 py-0.5 text-[8px] hover:bg-[#00ff41] hover:text-black transition-colors"
                >
                  PLAY AGAIN
                </button>
                <button
                  onClick={onExit}
                  className="border border-[#ff4444] px-2 py-0.5 text-[8px] hover:bg-[#ff4444] hover:text-black transition-colors"
                >
                  EXIT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tombol kontrol touch untuk mobile */}
      <div className="mt-2 flex flex-col items-center gap-0.5 touch-none">
        <button
          onClick={() => handleTouch('UP')}
          className="w-8 h-6 border border-[#00ff41]/50 text-[#00ff41] text-xs flex items-center justify-center hover:bg-[#00ff41]/20 active:bg-[#00ff41]/40 transition-colors font-mono"
          aria-label="Up"
        >
          ▲
        </button>
        <div className="flex gap-1">
          <button
            onClick={() => handleTouch('LEFT')}
            className="w-8 h-6 border border-[#00ff41]/50 text-[#00ff41] text-xs flex items-center justify-center hover:bg-[#00ff41]/20 active:bg-[#00ff41]/40 transition-colors font-mono"
            aria-label="Left"
          >
            ◄
          </button>
          <button
            onClick={() => handleTouch('DOWN')}
            className="w-8 h-6 border border-[#00ff41]/50 text-[#00ff41] text-xs flex items-center justify-center hover:bg-[#00ff41]/20 active:bg-[#00ff41]/40 transition-colors font-mono"
            aria-label="Down"
          >
            ▼
          </button>
          <button
            onClick={() => handleTouch('RIGHT')}
            className="w-8 h-6 border border-[#00ff41]/50 text-[#00ff41] text-xs flex items-center justify-center hover:bg-[#00ff41]/20 active:bg-[#00ff41]/40 transition-colors font-mono"
            aria-label="Right"
          >
            ►
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;