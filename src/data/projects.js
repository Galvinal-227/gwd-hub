import { 
  Code2,
  Monitor, 
  PenTool,
  LayoutDashboard,
  Gamepad2,
  Box,
  GraduationCap,
  Briefcase,
  Thermometer,
  BookOpen,
  Sparkles,
  Eye,
  Heart,
  User,
  Coffee
} from 'lucide-react';

export const projects = [
  {
    id: 'gwd-studio',
    name: 'GWD Studio',
    description: 'A modern workspace for designing and building web experiences.',
    category: 'Development',
    status: 'Live',
    url: 'https://gwd-studio.vercel.app',
    github: 'https://github.com/Galvinal-227/gwd-studio',
    tech: ['React', 'Vite', 'Tailwind'],
    featured: true,
    tags: ['studio', 'development', 'platform'],
    icon: Code2
  },
  {
    id: 'old-portfolio',
    name: 'Old Portfolio',
    description: 'An earlier personal portfolio showcasing selected work and skills.',
    category: 'Development',
    status: 'Live',
    url: 'https://galvin-portfolio.vercel.app',
    github: 'https://github.com/Galvinal-227/portfolio',
    tech: ['React', 'Vite', 'Tailwind'],
    featured: false,
    tags: ['portfolio', 'personal', 'showcase'],
    icon: User
  },
  {
    id: 'gcodeeditor',
    name: 'GoCodeEditor',
    description: 'A lightweight browser-based code editor for writing and editing code.',
    category: 'Tools',
    status: 'Live',
    url: 'https://gcodeeditor.vercel.app',
    github: 'https://github.com/Galvinal-227/gcodeeditor',
    tech: ['React', 'Monaco Editor', 'TypeScript'],
    featured: false,
    tags: ['code', 'editor', 'developer'],
    icon: PenTool
  },
  {
    id: 'retro-os',
    name: 'Retro OS',
    description: 'A nostalgic desktop environment recreated entirely for the web.',
    category: 'Experiments',
    status: 'Live',
    url: 'https://retro-os-blush.vercel.app',
    github: 'https://github.com/Galvinal-227/retro-os',
    tech: ['React', 'Vite', 'Tailwind'],
    featured: true,
    tags: ['retro', 'os', 'simulation'],
    icon: Monitor
  },
  {
    id: 'velora',
    name: 'Velora',
    description: 'A modern e-commerce experience designed for browsing and discovering products.',
    category: 'Development',
    status: 'Live',
    url: 'https://veloraid-pi.vercel.app',
    github: 'https://github.com/Galvinal-227/velora',
    tech: ['React', 'Vite', 'Tailwind'],
    featured: false,
    tags: ['ecommerce', 'shopping', 'products'],
    icon: LayoutDashboard
  },
  {
    id: 'youandme',
    name: 'You & Me',
    description: 'A personal space built to capture memories, stories, and moments together.',
    category: 'Other',
    status: 'Live',
    url: 'https://youandme-six.vercel.app',
    github: 'https://github.com/Galvinal-227/youandme',
    tech: ['React', 'Vite', 'Tailwind'],
    featured: false,
    tags: ['personal', 'memories', 'relationship'],
    icon: Heart
  },
  {
    id: 'galvinalfitov2',
    name: 'Galvinal Fit V2',
    description: 'The latest version of my personal portfolio, showcasing my work, skills, and creative experiments.',
    category: 'Development',
    status: 'Live',
    url: 'https://galvinalfito.my.id',
    github: 'https://github.com/Galvinal-227/galvinalfitov2',
    tech: ['React', 'Vite', 'Tailwind', 'GSAP', 'Lenis', 'Figma'],
    featured: true,
    tags: ['portfolio', 'personal', 'showcase', 'developer'],
    icon: User
  },
  {
    id: 'novaui',
    name: 'Nova UI',
    description: 'A collection of reusable UI components for modern web interfaces.',
    category: 'Tools',
    status: 'Live',
    url: 'https://novaui-six.vercel.app',
    github: 'https://github.com/Galvinal-227/novaui-1.0.0',
    tech: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
    tags: ['ui', 'components', 'library'],
    icon: Sparkles
  },
  {
    id: 'btn3d',
    name: '3D Button Library',
    description: 'A collection of interactive 3D buttons for creative web interfaces.',
    category: 'Tools',
    status: 'Live',
    url: 'https://galvinal-227.github.io/btn3d',
    github: 'https://github.com/Galvinal-227/btn3d',
    tech: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
    featured: false,
    tags: ['3d', 'buttons', 'animation'],
    icon: Box
  },
  {
    id: 'learncoding',
    name: 'Learn Coding',
    description: 'An interactive learning platform for exploring programming concepts.',
    category: 'Development',
    status: 'Live',
    url: 'https://learncoding-one.vercel.app',
    github: 'https://github.com/Galvinal-227/learncoding',
    tech: ['React', 'Vite', 'Tailwind'],
    featured: false,
    tags: ['education', 'coding', 'learning'],
    icon: GraduationCap
  },
  {
    id: 'weather-dashboard',
    name: 'Weather Dashboard',
    description: 'A simple dashboard for checking current weather and forecasts.',
    category: 'Tools',
    status: 'Live',
    url: 'https://galvinal-227.github.io/WeatherDashboard',
    github: 'https://github.com/Galvinal-227/WeatherDashboard',
    tech: ['HTML', 'CSS', 'JavaScript', 'API'],
    featured: false,
    tags: ['weather', 'dashboard', 'forecast'],
    icon: Thermometer
  },
  {
    id: 'project-gallery',
    name: 'Project Gallery',
    description: 'A visual collection of projects built across different experiments and ideas.',
    category: 'Development',
    status: 'Live',
    url: 'https://galvinal-227.github.io/ProjectGallery',
    github: 'https://github.com/Galvinal-227/ProjectGallery',
    tech: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
    tags: ['gallery', 'showcase', 'projects'],
    icon: Eye
  },
  {
    id: 'al-q-app',
    name: 'Al-Q App',
    description: 'A digital companion for reading the Quran and checking prayer times.',
    category: 'Development',
    status: 'Live',
    url: 'https://al-q-app.vercel.app',
    github: 'https://github.com/Galvinal-227/al-q-app',
    tech: ['React', 'API', 'Tailwind'],
    featured: false,
    tags: ['islamic', 'quran', 'prayer'],
    icon: BookOpen
  },
  {
    id: 'pelatihan',
    name: 'Pelatihan Platform',
    description: 'A web platform for organizing training programs and learning materials.',
    category: 'Development',
    status: 'Live',
    url: 'https://galvinal-227.github.io/pelatihan',
    github: 'https://github.com/Galvinal-227/pelatihan',
    tech: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
    tags: ['training', 'courses', 'education'],
    icon: Briefcase
  },
  {
    id: 'jamhtmlcssjs',
    name: 'Digital Clock',
    description: 'A minimal digital clock focused on simplicity and clean visual design.',
    category: 'Experiments',
    status: 'Live',
    url: 'https://galvinal-227.github.io/jamhtmlcssjs',
    github: 'https://github.com/Galvinal-227/jamhtmlcssjs',
    tech: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
    tags: ['clock', 'minimalist', 'time'],
    icon: Coffee
  }
];

// Import Activity icon for fitness project
import { Activity } from 'lucide-react';

export const categories = ['All', 'Development', 'Tools', 'AI', 'Games', 'Experiments', 'Other'];

export const getStats = (projects) => {
  const stats = {};
  projects.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  return stats;
};