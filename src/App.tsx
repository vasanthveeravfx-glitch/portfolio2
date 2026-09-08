import { useState, useEffect, useRef, createContext, useContext } from 'react';

// ==================== THEME CONTEXT ====================
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} });

function useTheme() {
  return useContext(ThemeContext);
}

// ==================== HOOKS ====================
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return progress;
}

// ==================== DATA ====================
const COMPANIES = [
  {
    name: 'Digital Domain India',
    role: 'Senior Compositor',
    period: 'Nov 2025 – Jun 2026',
    location: 'Hyderabad, India',
    color: 'from-blue-500 to-cyan-400',
    accent: 'blue',
    description: 'Delivering high-end compositing for feature film and episodic productions. Collaborating closely with supervisors and production teams to maintain visual quality and consistency.',
    shows: [
      { name: 'Feature Film (TBA)', year: '2026', genre: 'Feature VFX' },
      { name: 'Episodic Series', year: '2025', genre: 'Episodic VFX' },
    ],
    bullets: [
      'Delivering high-end compositing for feature film and episodic productions',
      'Collaborating closely with supervisors and production teams',
      'Supporting complex CG integration and final-pixel shot delivery under tight schedules',
    ]
  },
  {
    name: 'JustVFX Studios',
    role: 'Lead Compositor',
    period: 'Apr 2025 – Sep 2025',
    location: 'Hyderabad, India',
    color: 'from-purple-500 to-pink-400',
    accent: 'purple',
    description: 'Led a compositing team on high-end VFX sequences and complex shot delivery. Coordinated with Lighting, Roto, Prep, and CG teams.',
    shows: [
      { name: 'Wednesday', year: '2025', genre: 'Episodic' },
      { name: 'FUZ', year: '2025', genre: 'Episodic' },
      { name: 'Local Productions', year: '2025', genre: 'Regional' },
    ],
    bullets: [
      'Led a compositing team on high-end VFX sequences',
      'Collaborated with VFX and Compositing Supervisors during reviews and look-dev',
      'Coordinated with Lighting, Roto, Prep, and CG teams',
      'Maintained visual consistency across sequences',
    ]
  },
  {
    name: 'MPC Films',
    role: 'Senior Compositor',
    period: 'Jul 2018 – Feb 2025',
    location: 'Bengaluru, India',
    color: 'from-amber-500 to-orange-400',
    accent: 'amber',
    description: 'Seven years of final-pixel compositing for high-end feature films. Handled complex CG integration, multi-pass compositing, and live-action plate integration.',
    shows: [
      { name: 'Mufasa: The Lion King', year: '2024', genre: 'Feature Film' },
      { name: 'The Little Mermaid', year: '2023', genre: 'Feature Film' },
      { name: 'Pinocchio', year: '2022', genre: 'Feature Film' },
      { name: 'Godzilla vs. Kong', year: '2021', genre: 'Feature Film' },
      { name: 'Sonic The Hedgehog 2', year: '2022', genre: 'Feature Film' },
      { name: 'Finch', year: '2021', genre: 'Feature Film' },
      { name: 'The Call of the Wild', year: '2020', genre: 'Feature Film' },
      { name: 'Artemis Fowl', year: '2020', genre: 'Feature Film' },
      { name: 'Maleficent: Mistress of Evil', year: '2019', genre: 'Feature Film' },
      { name: 'Dumbo', year: '2019', genre: 'Feature Film' },
      { name: 'Dolittle', year: '2020', genre: 'Feature Film' },
      { name: 'Dark Phoenix', year: '2019', genre: 'Feature Film' },
      { name: 'Godzilla: King of the Monsters', year: '2019', genre: 'Feature Film' },
    ],
    bullets: [
      'Final-pixel compositing for high-end feature films',
      'Complex CG integration & multi-pass compositing',
      'Shot-level look development matching show aesthetics',
      'ACES/OCIO color workflows',
      'Mentored junior artists through shot reviews',
    ]
  },
  {
    name: 'DNEG',
    role: 'Senior Compositor',
    period: 'Jan 2016 – Jun 2018',
    location: 'Hyderabad, India',
    color: 'from-emerald-500 to-teal-400',
    accent: 'emerald',
    description: 'High-quality compositing across multiple large-scale productions spanning diverse visual styles and workflows.',
    shows: [
      { name: 'Wonder Woman', year: '2017', genre: 'Hollywood' },
      { name: 'Kong: Skull Island', year: '2017', genre: 'Hollywood' },
      { name: 'Fantastic Beasts', year: '2016', genre: 'Hollywood' },
      { name: 'Ghost in the Shell', year: '2017', genre: 'Hollywood' },
      { name: 'Beauty and the Beast', year: '2017', genre: 'Hollywood' },
      { name: 'Suicide Squad', year: '2016', genre: 'Hollywood' },
      { name: 'Transformers', year: '2017', genre: 'Hollywood' },
      { name: 'Legend of Tarzan', year: '2016', genre: 'Hollywood' },
      { name: 'TMNT', year: '2016', genre: 'Hollywood' },
      { name: 'The Great Wall', year: '2016', genre: 'Hollywood' },
      { name: 'Ae Dil Hai Mushkil', year: '2016', genre: 'Indian' },
      { name: 'Kaabil', year: '2017', genre: 'Indian' },
      { name: 'Udta Punjab', year: '2016', genre: 'Indian' },
      { name: 'Raabta', year: '2017', genre: 'Indian' },
      { name: 'Tubelight', year: '2017', genre: 'Indian' },
      { name: 'Mom', year: '2017', genre: 'Indian' },
    ],
    bullets: [
      'Integrated CG, FX, matte paintings, and live-action plates',
      'Maintained accurate lighting and color continuity',
      'Balanced creative direction with technical constraints',
      'Supported pipeline improvements and workflow efficiency',
    ]
  },
  {
    name: 'Gemini FX',
    role: 'Compositor',
    period: 'Feb 2014 – Jan 2016',
    location: 'India',
    color: 'from-rose-500 to-red-400',
    accent: 'rose',
    description: 'Worked on multiple Telugu and regional feature films. Delivered compositing for CG integration, cleanup, and enhancement shots.',
    shows: [
      { name: 'Bhale Manchi Roju', year: '2015', genre: 'Telugu' },
      { name: 'Bhale Magadivoy', year: '2015', genre: 'Telugu' },
      { name: 'Yevade Subramanyam', year: '2015', genre: 'Telugu' },
      { name: 'Race Gurram', year: '2014', genre: 'Telugu' },
      { name: 'Raju Gari Gadhi', year: '2015', genre: 'Telugu' },
    ],
    bullets: [
      'CG integration, cleanup, and enhancement shots',
      'Broadcast and theatrical deadline delivery',
      'Shot continuity and integration realism',
    ]
  },
  {
    name: 'Fire Pixel Studios',
    role: 'Compositor',
    period: 'Jun 2012 – Jan 2014',
    location: 'India',
    color: 'from-indigo-500 to-violet-400',
    accent: 'indigo',
    description: 'Contributed to feature film projects. Executed compositing tasks ranging from basic integration to complex shot fixes.',
    shows: [
      { name: 'Gabbar Singh', year: '2012', genre: 'Telugu' },
      { name: 'Srimannarayana', year: '2012', genre: 'Telugu' },
      { name: 'Paper Dhoni', year: '2013', genre: 'Telugu' },
    ],
    bullets: [
      'Basic integration to complex shot fixes',
      'Feature film compositing tasks',
    ]
  },
  {
    name: 'Magiclume CG Pvt Ltd',
    role: 'Junior Compositor',
    period: 'Jul 2011 – May 2012',
    location: 'India',
    color: 'from-sky-500 to-blue-400',
    accent: 'sky',
    description: 'Started career as Junior Compositor working on feature film projects.',
    shows: [
      { name: 'Spy Kids 4', year: '2011', genre: 'Feature Film' },
      { name: 'Sri Rama Rajyam', year: '2011', genre: 'Feature Film' },
    ],
    bullets: [
      'Foundation in compositing fundamentals',
      'Feature film project delivery',
    ]
  },
];

const ALL_FILMS = [
  'Mufasa: The Lion King', 'The Little Mermaid', 'Godzilla vs. Kong', 'Wednesday',
  'Wonder Woman', 'Fantastic Beasts', 'Kong: Skull Island', 'Pinocchio',
  'Sonic The Hedgehog 2', 'Finch', 'Beauty and the Beast', 'Suicide Squad',
  'Ghost in the Shell', 'Transformers', 'Dark Phoenix', 'Dumbo',
  'Maleficent: Mistress of Evil', 'The Call of the Wild', 'Legend of Tarzan',
  'Dolittle', 'Artemis Fowl', 'Ae Dil Hai Mushkil', 'Kaabil', 'Udta Punjab',
  'Tubelight', 'Mom', 'Gabbar Singh', 'Bhale Manchi Roju', 'Yevade Subramanyam',
];

const SHOW_IMAGES: Record<string, string> = {
  // MPC Films - Real Movie Posters from TMDB
  'Mufasa: The Lion King': 'https://image.tmdb.org/t/p/w500/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg',
  'The Little Mermaid': 'https://image.tmdb.org/t/p/w500/ym7dYwbAhHfQKMBGqjdBdQhE8XZ.jpg',
  'Pinocchio': 'https://image.tmdb.org/t/p/w500/vx1u0uwxdlhV2MUzj4VlcERplag.jpg',
  'Godzilla vs. Kong': 'https://image.tmdb.org/t/p/w500/pgxGAuXb2n8KAg7MQNPgriX7Gy.jpg',
  'Sonic The Hedgehog 2': 'https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUke6vHk50M7Dk.jpg',
  'Finch': 'https://image.tmdb.org/t/p/w500/x7xMMyQxJz0JMBe0bXbYnGkN0Fh.jpg',
  'The Call of the Wild': 'https://image.tmdb.org/t/p/w500/wj12gfhYfMz2BkK0e4dLp9VlC3q.jpg',
  'Artemis Fowl': 'https://image.tmdb.org/t/p/w500/n3wqqBLUi3Q0e3GEjWpXbDq0kGv.jpg',
  'Maleficent: Mistress of Evil': 'https://image.tmdb.org/t/p/w500/xM8rKTrJ1e0hGqMbOdaTq8VCQJr.jpg',
  'Dumbo': 'https://image.tmdb.org/t/p/w500/279LwXaJmUl3BGDZObPqVA64bWW.jpg',
  'Dolittle': 'https://image.tmdb.org/t/p/w500/zzXGRiJY8hBMFpKQJXyB2VdZfQk.jpg',
  'Dark Phoenix': 'https://image.tmdb.org/t/p/w500/hL3sZJX9gpBnBTfVgFBVmQqVWfQ.jpg',
  'Godzilla: King of the Monsters': 'https://image.tmdb.org/t/p/w500/x4So4OkqnBOSMFckEjO0gVHObvi.jpg',
  
  // DNEG Hollywood
  'Wonder Woman': 'https://image.tmdb.org/t/p/w500/imekS7f1uHy4FCfRPXlZAC0LTGg.jpg',
  'Kong: Skull Island': 'https://image.tmdb.org/t/p/w500/r2517Vc9E0r8elPj0yGAYLmgGG7.jpg',
  'Fantastic Beasts': 'https://image.tmdb.org/t/p/w500/h6NYfV3SKMpJ5e0P1yGAYLmgGG7.jpg',
  'Ghost in the Shell': 'https://image.tmdb.org/t/p/w500/myB2ZVSR0VXlPBYQnz5g1VwIYhC.jpg',
  'Beauty and the Beast': 'https://image.tmdb.org/t/p/w500/lNevJBp9bKjQrxnkHg2aQ1fdTZd.jpg',
  'Suicide Squad': 'https://image.tmdb.org/t/p/w500/Fq3bzHpmhPjZDm0MUvFjO7RlCa.jpg',
  'Transformers': 'https://image.tmdb.org/t/p/w500/sA5MzJhGR3Qa7fBmiWjemKc4Q9p.jpg',
  'Legend of Tarzan': 'https://image.tmdb.org/t/p/w500/4xYZP5G9sI9VqMTFkFESzQ3q3Qk.jpg',
  'TMNT': 'https://image.tmdb.org/t/p/w500/fb3Fsb7FbpZ3vB0e7OdjReVfTQk.jpg',
  'The Great Wall': 'https://image.tmdb.org/t/p/w500/hm0Z5bfMdCg3DV6oq2DURQJqApX.jpg',
  
  // DNEG Indian
  'Ae Dil Hai Mushkil': 'https://image.tmdb.org/t/p/w500/hlDOF4UhUqrYY7gqLk3Rl0Fx4ns.jpg',
  'Kaabil': 'https://image.tmdb.org/t/p/w500/hlDOF4UhUqrYY7gqLk3Rl0Fx4ns.jpg',
  'Udta Punjab': 'https://image.tmdb.org/t/p/w500/hlDOF4UhUqrYY7gqLk3Rl0Fx4ns.jpg',
  'Raabta': 'https://image.tmdb.org/t/p/w500/hlDOF4UhUqrYY7gqLk3Rl0Fx4ns.jpg',
  'Tubelight': 'https://image.tmdb.org/t/p/w500/hlDOF4UhUqrYY7gqLk3Rl0Fx4ns.jpg',
  'Mom': 'https://image.tmdb.org/t/p/w500/hlDOF4UhUqrYY7gqLk3Rl0Fx4ns.jpg',
  
  // JustVFX
  'Wednesday': 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQn7JzAoHF9xUBvOlA.jpg',
  'FUZ': 'https://image.qwenlm.ai/generated-images/651357d0-b4f4-450e-98a6-74ea787ec29c/_result.png',
  'Local Productions': 'https://image.qwenlm.ai/generated-images/355921ef-1319-4a43-9d22-1b278fe938a4/_result.png',
  
  // Gemini FX (Telugu)
  'Bhale Manchi Roju': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  'Bhale Magadivoy': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  'Yevade Subramanyam': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  'Race Gurram': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  'Raju Gari Gadhi': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  
  // Fire Pixel (Telugu)
  'Gabbar Singh': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  'Srimannarayana': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  'Paper Dhoni': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
  
  // Magiclume CG
  'Spy Kids 4': 'https://image.tmdb.org/t/p/w500/hm0Z5bfMdCg3DV6oq2DURQJqApX.jpg',
  'Sri Rama Rajyam': 'https://image.tmdb.org/t/p/w500/2wCaF36obO4LysX0m57h0BKxX27.jpg',
};

// ==================== COMPONENTS ====================

// Scroll Progress Bar
function ScrollProgress() {
  const progress = useScrollProgress();
  const { theme } = useTheme();
  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] h-[2px] ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
      <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}

// Theme Toggle
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-white/10 hover:bg-white/20 text-yellow-300'
          : 'bg-black/10 hover:bg-black/20 text-indigo-600'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = theme === 'dark'
    ? (scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent')
    : (scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm' : 'bg-transparent');

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subColor = theme === 'dark' ? 'text-white/60' : 'text-gray-600';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className={`${textColor} font-bold text-xl tracking-wider flex items-center gap-1`}>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">VV</span>
          <span className={`text-xs font-normal ${subColor} hidden sm:inline`}>STUDIOS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Experience', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`${subColor} hover:text-cyan-400 transition-colors text-sm tracking-wide font-medium`}>
              {item}
            </a>
          ))}
          <ThemeToggle />
          <a href="https://vimeo.com/877477854" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            Showreel ↗
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className={textColor}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} px-6 py-6 space-y-4`}>
          {['Work', 'Experience', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className={`block ${subColor} hover:text-cyan-400 text-sm font-medium`}>{item}</a>
          ))}
          <a href="https://vimeo.com/877477854" target="_blank" rel="noopener noreferrer"
            className="inline-block px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm">
            Showreel ↗
          </a>
        </div>
      )}
    </nav>
  );
}

// Hero
function Hero() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://image.tmdb.org/t/p/original/pgxGAuXb2n8KAg7MQNPgriX7Gy.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            transform: `scale(1.15) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
            filter: theme === 'light' ? 'brightness(1.2)' : 'brightness(0.5)'
          }}
        />
        <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-gradient-to-b from-black/70 via-black/50 to-black'
          : 'bg-gradient-to-b from-white/70 via-white/50 to-white'
        }`} />
        <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-gradient-to-r from-black/80 via-transparent to-black/80'
          : 'bg-gradient-to-r from-white/80 via-transparent to-white/80'
        }`} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'} 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${
          theme === 'dark' ? 'border-cyan-400/20 bg-cyan-400/5' : 'border-cyan-600/20 bg-cyan-600/5'
        }`}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className={`text-sm tracking-wider font-medium ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>
            SENIOR COMPOSITOR · HYDERABAD, INDIA
          </span>
        </div>

        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Peda Surya Vasanthakumar
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Veera
          </span>
        </h1>

        <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
          Feature Film VFX | CG Integration • LookDev • Sequence Continuity
        </p>

        <p className={`text-base max-w-2xl mx-auto mb-10 ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
          12+ years shaping feature-film and episodic VFX through precise CG integration, look development, and final-pixel craft across MPC, DNEG, JustVFX, and Digital Domain.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="https://vimeo.com/877477854" target="_blank" rel="noopener noreferrer"
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Watch Showreel
          </a>
          <a href="#work" className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
            theme === 'dark'
              ? 'border border-white/20 text-white/80 hover:border-white/40 hover:text-white'
              : 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
          }`}>
            Explore My Journey ↓
          </a>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-4 gap-6 max-w-2xl mx-auto p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-white/[0.03] border border-white/5' : 'bg-black/[0.03] border border-black/5'
        }`}>
          {[
            { val: '12+', label: 'YEARS' },
            { val: '50+', label: 'FILMS' },
            { val: '7', label: 'STUDIOS' },
            { val: '4', label: 'LANGUAGES' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{s.val}</div>
              <div className={`text-[10px] tracking-widest mt-1 ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className={`text-xs tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>SCROLL</span>
        <div className={`w-px h-8 ${theme === 'dark' ? 'bg-gradient-to-b from-white/30 to-transparent' : 'bg-gradient-to-b from-gray-400 to-transparent'}`} />
      </div>
    </section>
  );
}

// Film Marquee
function FilmMarquee() {
  const { theme } = useTheme();
  return (
    <div className={`py-6 overflow-hidden border-y ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 border-white/5' : 'bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 border-black/5'}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...ALL_FILMS, ...ALL_FILMS].map((film, i) => (
          <span key={i} className={`mx-6 text-base font-light tracking-wider ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>
            {film} <span className="text-cyan-400/50 mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Company Film Showcase with horizontal scroll
function CompanyShowcase({ company, index }: { company: typeof COMPANIES[0]; index: number }) {
  const { ref, isInView } = useInView(0.1);
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const cardBg = theme === 'dark'
    ? 'bg-white/[0.03] border-white/5 hover:border-white/10'
    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md';

  return (
    <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 50}ms` }}>
      
      {/* Company Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-sm`}>
              {company.name.charAt(0)}
            </div>
            <div>
              <h3 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {company.name}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                {company.role} · {company.period}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-white/5 text-white/50' : 'bg-gray-100 text-gray-500'}`}>
            {company.shows.length} Shows
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-white/5 text-white/50' : 'bg-gray-100 text-gray-500'}`}>
            {company.location}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className={`text-base mb-6 max-w-3xl leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-gray-600'}`}>
        {company.description}
      </p>

      {/* Scroll Controls */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>
          Projects
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            canScrollLeft
              ? theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'opacity-30 cursor-not-allowed bg-white/5 text-white/30'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            canScrollRight
              ? theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'opacity-30 cursor-not-allowed bg-white/5 text-white/30'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {company.shows.map((show, i) => {
          const img = SHOW_IMAGES[show.name];
          return (
            <div key={i} className={`flex-shrink-0 w-[260px] md:w-[320px] rounded-2xl border overflow-hidden transition-all duration-500 snap-start group cursor-pointer ${cardBg} hover:-translate-y-1`}>
              <div className="relative h-48 overflow-hidden">
                {img ? (
                  <img 
                    src={img} 
                    alt={show.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = `w-full h-full bg-gradient-to-br ${company.color} flex items-center justify-center`;
                        fallback.innerHTML = `<div class="text-center"><span class="text-white/90 text-5xl font-black block">${show.name.charAt(0)}</span><span class="text-white/40 text-xs tracking-widest uppercase mt-1 block">${show.genre}</span></div>`;
                        parent.insertBefore(fallback, target);
                      }
                    }}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${company.color} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)'
                    }} />
                    <div className="text-center z-10">
                      <span className="text-white/90 text-5xl font-black block">{show.name.charAt(0)}</span>
                      <span className="text-white/40 text-xs tracking-widest uppercase mt-1 block">{show.genre}</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md font-medium tracking-wide ${
                    show.genre === 'Hollywood' ? 'bg-amber-500/90 text-white' :
                    show.genre === 'Indian' ? 'bg-orange-500/90 text-white' :
                    show.genre === 'Telugu' ? 'bg-rose-500/90 text-white' :
                    show.genre === 'Feature Film' ? 'bg-blue-500/90 text-white' :
                    show.genre === 'Episodic' ? 'bg-purple-500/90 text-white' :
                    show.genre === 'Regional' ? 'bg-teal-500/90 text-white' :
                    show.genre === 'Feature VFX' ? 'bg-cyan-500/90 text-white' :
                    'bg-white/20 text-white'
                  }`}>
                    {show.genre}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-bold text-sm leading-tight drop-shadow-lg">{show.name}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-white/50 text-xs">{show.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/40 text-xs">{company.name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bullets */}
      <div className={`mt-6 grid md:grid-cols-2 gap-2`}>
        {company.bullets.map((bullet, i) => (
          <div key={i} className={`flex items-start gap-2 text-sm ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${company.color} flex-shrink-0`} />
            {bullet}
          </div>
        ))}
      </div>
    </div>
  );
}

// Work Section
function WorkSection() {
  const { ref, isInView } = useInView();
  const { theme } = useTheme();

  return (
    <section id="work" className={`py-24 md:py-32 relative ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 text-sm tracking-widest font-medium">01 / SELECTED WORK</span>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400/30 to-transparent' : 'bg-gradient-to-r from-cyan-600/30 to-transparent'}`} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Pixels with purpose,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">shots with soul.</span>
          </h2>
          <p className={`max-w-2xl mb-16 ${theme === 'dark' ? 'text-white/50' : 'text-gray-600'}`}>
            A career built across ambitious productions, global teams, and the exacting last mile of a visual-effects shot.
          </p>
        </div>

        <div className="space-y-20">
          {COMPANIES.map((company, idx) => (
            <CompanyShowcase key={company.name} company={company} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Quote
function QuoteSection() {
  const { ref, isInView } = useInView();
  const { theme } = useTheme();

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-black via-gray-900/30 to-black' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,200,255,0.3) 0%, transparent 50%)' }} />
      </div>
      <div ref={ref} className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-cyan-400/30 text-7xl mb-4 font-serif">"</div>
        <blockquote className={`text-2xl md:text-4xl font-light leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>
          A great composite doesn't call attention to itself. It makes the{' '}
          <em className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">impossible feel inevitable.</em>
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-cyan-400/30" />
          <span className={`text-sm tracking-wider ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`}>THE CRAFT</span>
          <div className="w-12 h-px bg-cyan-400/30" />
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const { ref, isInView } = useInView();
  const { theme } = useTheme();

  const strengths = [
    { icon: '🎯', title: 'Final-Pixel Compositing', desc: 'Deep compositing, quality control, and the finish that keeps audiences inside the story.' },
    { icon: '🎬', title: 'CG & Live-Action Integration', desc: 'Seamlessly blending CG elements with live-action plates for photorealistic results.' },
    { icon: '🔍', title: 'Shot-Level Look Development', desc: 'Crafting the visual identity of each shot to match established aesthetics.' },
    { icon: '💡', title: 'Lighting & Pass Balancing', desc: 'Relighting, pass balancing, and image-making for natural CG integration.' },
    { icon: '🎨', title: 'Color Management', desc: 'ACES, OCIO, LUT management, and template-led setups protecting creative intent.' },
    { icon: '👥', title: 'Team Leadership', desc: 'Mentoring junior artists, thoughtful reviews, and building stronger teams.' },
    { icon: '⚡', title: 'Problem Solving', desc: 'Delivering complex shots under tight production schedules with precision.' },
    { icon: '🔄', title: 'Sequence Continuity', desc: 'Clear visual standards protecting the logic of every sequence.' },
  ];

  const tools = [
    { category: 'Compositing', items: ['NukeX (Advanced)', 'Fusion'] },
    { category: 'Tracking', items: ['PFTrack'] },
    { category: 'Image Editing', items: ['Adobe Photoshop'] },
    { category: 'Workflows', items: ['ACES', 'OCIO', 'LUT Management', 'Template-based Comp'] },
    { category: 'Operating Systems', items: ['Linux', 'Windows'] },
  ];

  return (
    <section id="skills" className={`py-24 md:py-32 relative ${theme === 'dark' ? 'bg-gradient-to-b from-black via-gray-950 to-black' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 text-sm tracking-widest font-medium">02 / EXPERTISE</span>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400/30 to-transparent' : 'bg-gradient-to-r from-cyan-600/30 to-transparent'}`} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Technical fluency.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Creative sensitivity.</span>
          </h2>
        </div>

        {/* Core Strengths Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {strengths.map((s, i) => (
            <div key={i} className={`p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1 group ${
              theme === 'dark'
                ? 'bg-white/[0.02] border-white/5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.02]'
                : 'bg-white border-gray-200 hover:border-cyan-400/30 hover:shadow-lg'
            }`}>
              <span className="text-3xl mb-3 block">{s.icon}</span>
              <h3 className={`font-bold mb-2 group-hover:text-cyan-400 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical Skills */}
        <div className={`rounded-2xl border p-8 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((cat) => (
              <div key={cat.category}>
                <h4 className={`text-xs tracking-widest uppercase mb-3 ${theme === 'dark' ? 'text-cyan-400/60' : 'text-cyan-600'}`}>{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <span key={item} className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 text-white/70 border border-white/5 hover:border-cyan-400/30 hover:text-cyan-400'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-cyan-400/30 hover:text-cyan-600'
                    }`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About
function AboutSection() {
  const { ref, isInView } = useInView();
  const { theme } = useTheme();

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className={`absolute inset-0 opacity-5`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400 blur-[150px]" />
      </div>
      <div ref={ref} className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-cyan-400 text-sm tracking-widest font-medium">ABOUT</span>
        <h2 className={`text-3xl md:text-4xl font-bold mt-4 mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          The best work happens when craft and collaboration share the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">same frame.</span>
        </h2>
        <p className={`text-lg leading-relaxed max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-gray-600'}`}>
          I bring a calm, detail-oriented eye to demanding productions — whether that means untangling a difficult plate, keeping a sequence visually coherent, or helping an artist find the clearest path through a shot.
        </p>
        <div className="flex items-center justify-center gap-4">
          {['Telugu', 'English', 'Hindi'].map(lang => (
            <span key={lang} className={`px-5 py-2 rounded-full text-sm font-medium ${
              theme === 'dark' ? 'border border-white/10 text-white/60' : 'border border-gray-200 text-gray-600 bg-white'
            }`}>{lang}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact
function ContactSection() {
  const { ref, isInView } = useInView();
  const { theme } = useTheme();

  return (
    <section id="contact" className={`py-24 md:py-32 relative ${theme === 'dark' ? 'bg-gradient-to-b from-black to-gray-950' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 text-sm tracking-widest font-medium">03 / LET'S CONNECT</span>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400/30 to-transparent' : 'bg-gradient-to-r from-cyan-600/30 to-transparent'}`} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Have a world to bring{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">to life?</span>
          </h2>
          <p className={`max-w-2xl mb-12 ${theme === 'dark' ? 'text-white/50' : 'text-gray-600'}`}>
            For opportunities, collaborations, or a conversation about the craft — I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Email */}
          <a href="mailto:vasanthveeravfx@gmail.com" className={`group block p-8 rounded-2xl border transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/[0.02] border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.02]'
              : 'bg-white border-gray-200 hover:border-cyan-400/30 hover:shadow-lg'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className={`text-xs tracking-wider mb-2 ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>EMAIL</p>
            <p className={`font-medium group-hover:text-cyan-400 transition-colors break-all ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              vasanthveeravfx@gmail.com
            </p>
          </a>

          {/* Phone */}
          <a href="tel:+919700380381" className={`group block p-8 rounded-2xl border transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/[0.02] border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.02]'
              : 'bg-white border-gray-200 hover:border-cyan-400/30 hover:shadow-lg'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className={`text-xs tracking-wider mb-2 ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>PHONE</p>
            <p className={`font-medium group-hover:text-cyan-400 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              +91 97003 80381
            </p>
          </a>

          {/* Location */}
          <div className={`group block p-8 rounded-2xl border transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/[0.02] border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.02]'
              : 'bg-white border-gray-200 hover:border-cyan-400/30 hover:shadow-lg'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className={`text-xs tracking-wider mb-2 ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>LOCATION</p>
            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Hyderabad, India</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center gap-4 mt-12">
          <a href="https://www.linkedin.com/in/vasanth-kumar-veera-b17ba034" target="_blank" rel="noopener noreferrer"
            className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${
              theme === 'dark'
                ? 'border-white/10 text-white/60 hover:border-cyan-400/30 hover:text-cyan-400'
                : 'border-gray-200 text-gray-600 hover:border-cyan-400/30 hover:text-cyan-600'
            }`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn ↗
          </a>
          <a href="https://vimeo.com/877477854" target="_blank" rel="noopener noreferrer"
            className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${
              theme === 'dark'
                ? 'border-white/10 text-white/60 hover:border-cyan-400/30 hover:text-cyan-400'
                : 'border-gray-200 text-gray-600 hover:border-cyan-400/30 hover:text-cyan-600'
            }`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.316 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.359-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.796 3.486 4.807z"/>
            </svg>
            Showreel ↗
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={`py-8 border-t ${theme === 'dark' ? 'border-white/5 bg-black' : 'border-gray-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">VV</span>
            <span className={theme === 'dark' ? 'text-white/30' : 'text-gray-400'}>.</span>
          </span>
          <span className={`text-sm ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} Peda Surya Vasanthakumar Veera
          </span>
        </div>
        <div className={`text-sm ${theme === 'dark' ? 'text-white/20' : 'text-gray-400'}`}>
          Senior Compositor · Hyderabad, India
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <FilmMarquee />
        <WorkSection />
        <QuoteSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
