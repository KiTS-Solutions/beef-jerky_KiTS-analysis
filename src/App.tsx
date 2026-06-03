import { useEffect, useState, useRef } from 'react';

// 1. Import all your custom components from the tsx-files folder
import ComponentOne from './tsx-files/beef-jerky-advisory.tsx';
import ComponentTwo from './tsx-files/kits-brand-design-brief.tsx';
import ComponentThree from './tsx-files/kits-competitive-analysis.tsx';
import ComponentFour from './tsx-files/kits-financial-study.tsx';
import ComponentFive from './tsx-files/kits-master-plan.tsx';
import ComponentSix from './tsx-files/kits-manufacturer-brief.tsx';
import ComponentSeven from './tsx-files/kits-outreach-system.tsx';
import ComponentEight from './tsx-files/kits-product-visualization.tsx';
import ComponentNine from './tsx-files/strike-board-presentation-final.tsx';
import ComponentTen from './tsx-files/strike-brand-study.tsx';
import ComponentEleven from './tsx-files/kits-pitch-deck.jsx';
// 2. Define a list of your components for easy navigation mapping
const COMPONENT_MAP = {
  'kits pitch deck': <ComponentEleven />,
  'strike presentation': <ComponentNine />,
  'master plan': <ComponentFive />,
  'beef jerky advisory': <ComponentOne />,
  'financial study': <ComponentFour />,
  'outreach system': <ComponentSeven />,
  'manufacturer brief': <ComponentSix />,
  'brand design brief': <ComponentTwo />,
  'competitive analysis': <ComponentThree />,
  'strike brand study': <ComponentTen />,
  'product visualization': <ComponentEight />,
};


type ComponentKey = keyof typeof COMPONENT_MAP;

// Animated Background Component
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.alpha})`;
        ctx.fill();
        
        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
      }}
    />
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<ComponentKey>('kits pitch deck');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Track screen size for responsive breakpoints
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  // Handle window resizing and escape key listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        if (isMobile) setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile]);

  // Compute sidebar widths based on device and collapse states
  const getSidebarWidth = () => {
    if (isFullscreen) return '0px';
    if (isMobile) return isCollapsed ? '0px' : '100%';
    if (isTablet) return isCollapsed ? '60px' : '240px';
    return isCollapsed ? '60px' : '260px';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground />
      
      {/* Floating Hamburger / Toggle Button for Mobile & Desktop */}
      {!isFullscreen && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            position: isMobile ? 'fixed' : 'absolute',
            top: isMobile ? '12px' : '15px',
            left: isMobile ? '12px' : 'auto',
            right: isMobile ? 'auto' : (isCollapsed ? 'auto' : '20px'),
            zIndex: 1000,
            padding: isMobile ? '12px 16px' : '10px 14px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: isMobile ? '12px' : '10px',
            fontSize: isMobile ? '16px' : '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2)';
          }}
        >
          {isMobile ? (isCollapsed ? '☰' : '✕') : (isCollapsed ? '➔' : '✕')}
        </button>
      )}

      {/* Responsive Sidebar Menu */}
      <nav style={{
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 999,
        width: getSidebarWidth(),
        visibility: (isMobile && isCollapsed) || isFullscreen ? 'hidden' : 'visible',
        display: isFullscreen ? 'none' : 'flex',
        background: 'linear-gradient(180deg, rgba(15, 15, 25, 0.95) 0%, rgba(10, 10, 20, 0.98) 100%)',
        borderRight: isMobile ? 'none' : '1px solid rgba(102, 126, 234, 0.2)',
        padding: isCollapsed 
          ? (isMobile ? '60px 16px 20px 16px' : '60px 5px 20px 5px') 
          : (isMobile ? '60px 20px 20px 20px' : '60px 20px 20px 20px'),
        boxSizing: 'border-box',
        transition: isMobile ? 'transform 0.3s ease-in-out' : 'width 0.2s ease-in-out, visibility 0.2s',
        flexDirection: 'column',
        alignItems: isCollapsed ? 'center' : 'stretch',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxShadow: isMobile ? '4px 0 30px rgba(102, 126, 234, 0.3)' : '2px 0 20px rgba(102, 126, 234, 0.15)',
        WebkitOverflowScrolling: 'touch',
        backdropFilter: 'blur(20px)',
      }}>
        {!isCollapsed && <h3 style={{ marginTop: 0, marginBottom: isMobile ? '24px' : '20px', color: '#e0e0ff', fontSize: isMobile ? '18px' : '16px', fontWeight: '600', letterSpacing: '0.5px', textShadow: '0 0 10px rgba(102, 126, 234, 0.5)' }}>Components</h3>}

        {/* Presentation Button */}
        <button
          onClick={() => {
            setIsFullscreen(true);
            if (isMobile) setIsCollapsed(true); // Auto-hide menu on mobile presentation
          }}
          style={{
            marginBottom: isMobile ? '24px' : '20px',
            padding: isMobile ? '16px 20px' : '14px 18px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundSize: '200% 200%',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: isMobile ? '16px' : '14px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '13px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5), 0 0 30px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            animation: 'gradientShift 3s ease infinite',
            backdropFilter: 'blur(10px)',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.7), 0 0 40px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.5), 0 0 30px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
          }}
        >
          <span style={{ fontSize: isMobile ? '18px' : '16px', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}>📺</span>
          {!isCollapsed && <span>Presentation Mode</span>}
        </button>

        {/* Menu Items */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', overflowY: 'auto' }}>
          {Object.keys(COMPONENT_MAP).map((name) => (
            <li key={name} style={{ marginBottom: isMobile ? '12px' : '8px' }}>
              <button
                onClick={() => {
                  setActiveView(name as ComponentKey);
                  if (isMobile) setIsCollapsed(true); // Close drawer after selection on mobile
                }}
                title={name}
                style={{
                  width: '100%',
                  textAlign: isCollapsed ? 'center' : 'left',
                  padding: isMobile ? '14px 16px' : '12px 14px',
                  borderRadius: isMobile ? '12px' : '10px',
                  border: activeView === name ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  fontSize: isMobile ? '15px' : '14px',
                  whiteSpace: 'nowrap',
                  fontWeight: activeView === name ? '600' : '400',
                  background: activeView === name
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)'
                    : 'rgba(255,255,255,0.05)',
                  color: activeView === name ? '#e0e0ff' : '#a0a0c0',
                  transition: 'all 0.3s ease',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeView === name 
                    ? '0 4px 15px rgba(102, 126, 234, 0.3), 0 0 20px rgba(102, 126, 234, 0.2)' 
                    : 'none',
                  textShadow: activeView === name ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeView !== name) {
                    e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeView !== name) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {isCollapsed ? name.charAt(0).toUpperCase() : name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Dark Overlay Tint Backing for Mobile Drawer Menu */}
      {isMobile && !isCollapsed && !isFullscreen && (
        <div 
          onClick={() => setIsCollapsed(true)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 20, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 998,
          }}
        />
      )}

      {/* Main Content Viewer Viewport */}
      <main style={{ 
        flex: 1, 
        padding: isFullscreen ? '0px' : (isMobile ? '70px 12px 12px 12px' : (isTablet ? '20px 16px' : '20px')), 
        backgroundColor: isFullscreen ? 'transparent' : 'rgba(15, 15, 25, 0.6)',
        position: 'relative',
        minWidth: 0, // Prevents flex children from stretching past device boundary
        overflowX: 'hidden',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Floating Presentation Mode Exit Button */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'fixed',
              top: isMobile ? '5px' : '5px',
              right: isMobile ? '5px' : '5px',
              zIndex: 9999,
              padding: isMobile ? '8px 10px' : '6px 10px',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(185, 28, 28, 0.9) 100%)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: isMobile ? '16px' : '14px',
              cursor: 'pointer',
              fontSize: isMobile ? '12px' : '11px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.3s ease',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(239, 68, 68, 0.7), 0 0 40px rgba(239, 68, 68, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)';
            }}
          >
            ✕
          </button>
        )}

        {/* Outer Frame Wrapper */}
        <div style={{
          border: isFullscreen ? 'none' : '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: isFullscreen ? '0px' : (isMobile ? '16px' : '12px'),
          padding: isFullscreen ? '0px' : (isMobile ? '16px' : (isTablet ? '20px' : '24px')),
          minHeight: isFullscreen ? '100vh' : 'calc(100vh - 40px)',
          width: '100%',
          maxWidth: '100%',
          backgroundColor: isFullscreen ? 'transparent' : 'rgba(10, 10, 20, 0.8)',
          boxShadow: isFullscreen ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(102, 126, 234, 0.1)',
          boxSizing: 'border-box',
          overflowX: 'auto', // Adds fallback scrolling if individual components are wide
          overflowY: 'auto',
          backdropFilter: isFullscreen ? 'none' : 'blur(20px)',
        }}>
          {COMPONENT_MAP[activeView]}
        </div>
      </main>
    </div>
  );
}
