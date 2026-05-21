import { useEffect, useState } from 'react';

// 1. Import all your custom components from the tsx-files folder
import ComponentOne from './tsx-files/beef-jerky-advisory.tsx';
import ComponentTwo from './tsx-files/kits-brand-design-brief.tsx';
import ComponentThree from './tsx-files/kits-competitive-analysis.tsx';
import ComponentFour from './tsx-files/kits-financial-study.tsx';
import ComponentFive from './tsx-files/kits-master-plan.tsx';
import ComponentSix from './tsx-files/kits-manufacturer-brief.tsx';
import ComponentSeven from './tsx-files/kits-outreach-system.tsx';
import ComponentEight from './tsx-files/kits-product-visualization.tsx';
import ComponentNine from './tsx-files/strike-board-presentation.tsx';
import ComponentTen from './tsx-files/strike-brand-study.tsx';

// 2. Define a list of your components for easy navigation mapping
const COMPONENT_MAP = { 
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

export default function App() {
  const [activeView, setActiveView] = useState<ComponentKey>('strike presentation');
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
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      
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
            backgroundColor: '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: isMobile ? '8px' : '6px',
            fontSize: isMobile ? '16px' : '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
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
        backgroundColor: '#f8f9fa',
        borderRight: isMobile ? 'none' : '1px solid #e0e0e0',
        padding: isCollapsed 
          ? (isMobile ? '60px 16px 20px 16px' : '60px 5px 20px 5px') 
          : (isMobile ? '60px 20px 20px 20px' : '60px 20px 20px 20px'),
        boxSizing: 'border-box',
        transition: isMobile ? 'transform 0.3s ease-in-out' : 'width 0.2s ease-in-out, visibility 0.2s',
        flexDirection: 'column',
        alignItems: isCollapsed ? 'center' : 'stretch',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxShadow: isMobile ? '4px 0 15px rgba(0,0,0,0.1)' : 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {!isCollapsed && <h3 style={{ marginTop: 0, marginBottom: isMobile ? '24px' : '20px', color: '#333', fontSize: isMobile ? '18px' : '16px' }}>Components</h3>}

        {/* Presentation Button */}
        <button
          onClick={() => {
            setIsFullscreen(true);
            if (isMobile) setIsCollapsed(true); // Auto-hide menu on mobile presentation
          }}
          style={{
            marginBottom: isMobile ? '24px' : '20px',
            padding: isMobile ? '14px' : '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: isMobile ? '8px' : '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '13px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        >
          📺 {!isCollapsed && 'Presentation Mode'}
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
                  padding: isMobile ? '14px 12px' : '12px 10px',
                  borderRadius: isMobile ? '8px' : '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: isMobile ? '15px' : '14px',
                  whiteSpace: 'nowrap',
                  fontWeight: activeView === name ? 'bold' : 'normal',
                  backgroundColor: activeView === name ? '#007acc' : 'transparent',
                  color: activeView === name ? '#fff' : '#555',
                  transition: 'all 0.1s ease',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              >
                {isCollapsed ? name.charAt(0) : name}
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
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 998,
          }}
        />
      )}

      {/* Main Content Viewer Viewport */}
      <main style={{ 
        flex: 1, 
        padding: isFullscreen ? '0px' : (isMobile ? '70px 12px 12px 12px' : (isTablet ? '20px 16px' : '20px')), 
        backgroundColor: isFullscreen ? 'transparent' : '#fafafa',
        position: 'relative',
        minWidth: 0, // Prevents flex children from stretching past device boundary
        overflowX: 'hidden',
      }}>
        {/* Floating Presentation Mode Exit Button */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'fixed',
              top: isMobile ? '12px' : '15px',
              right: isMobile ? '12px' : '15px',
              zIndex: 9999,
              padding: isMobile ? '12px 18px' : '10px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              color: '#fff',
              border: 'none',
              borderRadius: isMobile ? '24px' : '20px',
              cursor: 'pointer',
              fontSize: isMobile ? '14px' : '13px',
              backdropFilter: 'blur(4px)',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
          >
            ✕ Exit View
          </button>
        )}

        {/* Outer Frame Wrapper */}
        <div style={{
          border: isFullscreen ? 'none' : '1px solid #e0e0e0',
          borderRadius: isFullscreen ? '0px' : (isMobile ? '12px' : '8px'),
          padding: isFullscreen ? '0px' : (isMobile ? '16px' : (isTablet ? '20px' : '24px')),
          minHeight: isFullscreen ? '100vh' : 'calc(100vh - 40px)',
          width: '100%',
          maxWidth: '100%',
          backgroundColor: '#fff',
          boxShadow: isFullscreen ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
          boxSizing: 'border-box',
          overflowX: 'auto', // Adds fallback scrolling if individual components are wide
          overflowY: 'auto',
        }}>
          {COMPONENT_MAP[activeView]}
        </div>
      </main>
    </div>
  );
}
