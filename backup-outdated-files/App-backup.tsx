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
  'beef jerky advisory': <ComponentOne />,
  'master plan': <ComponentFive />,
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
  // Track presentation mode state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Allow exiting presentation mode via the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      
      {/* Sidebar - Hidden completely in full-screen presentation mode */}
      <nav style={{
        width: isFullscreen ? '0px' : (isCollapsed ? '60px' : '260px'),
        display: isFullscreen ? 'none' : 'flex',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        padding: isCollapsed ? '15px 5px' : '20px',
        boxSizing: 'border-box',
        transition: 'width 0.2s ease-in-out',
        flexDirection: 'column',
        alignItems: isCollapsed ? 'center' : 'stretch',
        overflowX: 'hidden'
      }}>
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            alignSelf: isCollapsed ? 'center' : 'flex-end',
            marginBottom: '20px',
            padding: '6px 10px',
            cursor: 'pointer',
            backgroundColor: '#e0e0e0',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {isCollapsed ? '➔' : '✕ Collapse'}
        </button>

        {!isCollapsed && <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333', fontSize: '16px' }}>Components</h3>}

        {/* Presentation Button in Sidebar */}
        <button
          onClick={() => setIsFullscreen(true)}
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px'
          }}
          title="Presentation Mode"
        >
          📺 {!isCollapsed && 'Presentation Mode'}
        </button>

        {/* Menu List */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
          {Object.keys(COMPONENT_MAP).map((name) => (
            <li key={name} style={{ marginBottom: '8px' }}>
              <button
                onClick={() => setActiveView(name as ComponentKey)}
                title={name}
                style={{
                  width: '100%',
                  textAlign: isCollapsed ? 'center' : 'left',
                  padding: '10px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  fontWeight: activeView === name ? 'bold' : 'normal',
                  backgroundColor: activeView === name ? '#007acc' : 'transparent',
                  color: activeView === name ? '#fff' : '#555',
                  transition: 'all 0.1s ease',
                }}
              >
                {isCollapsed ? name.charAt(0) : name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area - Layout dynamically resets when in presentation mode */}
      <main style={{ 
        flex: 1, 
        padding: isFullscreen ? '0px' : '20px', 
        backgroundColor: isFullscreen ? 'transparent' : '#fafafa',
        position: 'relative'
      }}>
        {/* Floating Exit Badge - Only visible during presentation mode */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              zIndex: 9999,
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '12px',
              backdropFilter: 'blur(4px)',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)')}
          >
            ✕ Exit Presentation (Esc)
          </button>
        )}

        <div style={{
          border: isFullscreen ? 'none' : '1px solid #e0e0e0',
          borderRadius: isFullscreen ? '0px' : '8px',
          padding: isFullscreen ? '0px' : '24px',
          minHeight: isFullscreen ? '100vh' : 'calc(100vh - 40px)',
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: isFullscreen ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
          boxSizing: 'border-box'
        }}>
          {COMPONENT_MAP[activeView]}
        </div>
      </main>
    </div>
  );
}

// type ComponentKey = keyof typeof COMPONENT_MAP;

// export default function App() {
//   const [activeView, setActiveView] = useState<ComponentKey>('beef jerky advisory');
//   // State to track if sidebar is collapsed
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      
//       {/* Collapsable Sidebar */}
//       <nav style={{
//         width: isCollapsed ? '60px' : '260px',
//         backgroundColor: '#f8f9fa',
//         borderRight: '1px solid #e0e0e0',
//         padding: isCollapsed ? '15px 5px' : '20px',
//         boxSizing: 'border-box',
//         transition: 'width 0.2s ease-in-out',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: isCollapsed ? 'center' : 'stretch',
//         overflowX: 'hidden'
//       }}>
//         {/* Toggle Button */}
//         <button 
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           style={{
//             alignSelf: isCollapsed ? 'center' : 'flex-end',
//             marginBottom: '20px',
//             padding: '6px 10px',
//             cursor: 'pointer',
//             backgroundColor: '#e0e0e0',
//             border: 'none',
//             borderRadius: '4px',
//             fontSize: '12px',
//             fontWeight: 'bold'
//           }}
//         >
//           {isCollapsed ? '➔' : '✕ Collapse'}
//         </button>

//         {/* Navigation Title */}
//         {!isCollapsed && <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333', fontSize: '16px' }}>Components</h3>}

//         {/* Menu List */}
//         <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
//           {Object.keys(COMPONENT_MAP).map((name) => (
//             <li key={name} style={{ marginBottom: '8px' }}>
//               <button
//                 onClick={() => setActiveView(name as ComponentKey)}
//                 title={name}
//                 style={{
//                   width: '100%',
//                   textAlign: isCollapsed ? 'center' : 'left',
//                   padding: '10px',
//                   borderRadius: '6px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   whiteSpace: 'nowrap',
//                   fontWeight: activeView === name ? 'bold' : 'normal',
//                   backgroundColor: activeView === name ? '#007acc' : 'transparent',
//                   color: activeView === name ? '#fff' : '#555',
//                   transition: 'all 0.1s ease',
//                 }}
//               >
//                 {isCollapsed ? name.charAt(0) : name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Expanded Main Content Area */}
//       <main style={{ 
//         flex: 1, 
//         padding: '20px', 
//         backgroundColor: '#fafafa',
//         transition: 'padding 0.2s ease-in-out'
//       }}>
//         <div style={{
//           border: '1px solid #e0e0e0',
//           borderRadius: '8px',
//           padding: '24px',
//           minHeight: 'calc(100vh - 40px)',
//           backgroundColor: '#fff',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//           boxSizing: 'border-box'
//         }}>
//                     {/* Dynamically renders the selected component */}
//           {COMPONENT_MAP[activeView]}
//         </div>
//       </main>
//     </div>
//   );
// }
// //   // 3. Set the first component as the default view
// //   const [activeView, setActiveView] = useState<ComponentKey>('Component One');

//   // return (
//   //   <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
//   //     {/* Sidebar Navigation */}
//   //     <nav style={{
//   //       width: '250px',
//   //       backgroundColor: '#f5f5f5',
//   //       borderRight: '1px solid #ddd',
//   //       padding: '20px',
//   //       boxSizing: 'border-box'
//   //     }}>
//   //       <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Component Viewer</h3>
//   //       <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//   //         {Object.keys(COMPONENT_MAP).map((name) => (
//   //           <li key={name} style={{ marginBottom: '10px' }}>
//   //             <button
//   //               onClick={() => setActiveView(name as ComponentKey)}
//   //               style={{
//   //                 width: '100%',
//   //                 textAlign: 'left',
//   //                 padding: '10px 12px',
//   //                 borderRadius: '6px',
//   //                 border: 'none',
//   //                 cursor: 'pointer',
//   //                 fontSize: '14px',
//   //                 fontWeight: activeView === name ? 'bold' : 'normal',
//   //                 backgroundColor: activeView === name ? '#007acc' : 'transparent',
//   //                 color: activeView === name ? '#fff' : '#333',
//   //                 transition: 'background-color 0.2s',
//   //               }}
//   //             >
//   //               {name}
//   //             </button>
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     </nav>


//       {/* Main Content Preview Window Area
//       <main style={{ flex: 1, padding: '30px', backgroundColor: '#fff' }}>
//         <div style={{
//           border: '1px dashed #ccc',
//           borderRadius: '8px',
//           padding: '20px',
//           minHeight: 'calc(100vh - 100px)',
//           backgroundColor: '#fafafa'
//         }}> */}

