import React from 'react';
import { Bus, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Transport = () => {
  // Routes Data extracted from reference
  const routesLeft = [
    "Ayyur", "Haleseebam", "Kagadasam", "Local Staff Bus", 
    "Kaknoor", "Jawalagiri", "Mathur", "Seekanapalli", 
    "Alsanatham", "Mathigiri", "Athipalli", "Kariyamangalam"
  ];

  const routesRight = [
    "Bargur", "Tirupathur", "Anchetty", "Poonapalli", 
    "Rayakottai", "Mudampatti", "Kelamangalam & Gowthalam", 
    "Berigai", "Krishnagiri", "Basthi", "Ashok Leyland"
  ];

  const RouteList = ({ routes, align }: { routes: string[], align: 'left' | 'right' }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px', // Reduced gap for compactness
      width: '100%',
      padding: '0 20px',
      marginTop: '10px' // Slight top margin
    }}>
      {routes.map((route, index) => (
        <motion.div 
          key={route}
          initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }} // Faster stagger
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
            gap: '8px',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem', // Smaller text
            fontWeight: 500,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            padding: '8px 16px', // Compact padding
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
            cursor: 'default',
            margin: '0' // Removed extra margin
          }}
          whileHover={{
            scale: 1.02,
            background: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)'
          }}
        >
          {align === 'left' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 8px #3b82f6', flexShrink: 0 }}></div>}
          <span style={{ flex: 1, textAlign: align }}>{route}</span>
          {align === 'right' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 8px #3b82f6', flexShrink: 0 }}></div>}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="transport-page" style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      backgroundImage: "url('/assets/landing_page_bg.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
        {/* Dark Overlay matching Home page */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
            pointerEvents: 'none'
        }}></div>

        {/* Main Grid Layout */}
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '100px 1fr 80px', // Adjusted rows to maximize middle space
            gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr minmax(300px, 1fr)', // Increase center space ratio
            zIndex: 10
        }}>
            {/* Top Edge - Header */}
            <div className="edge-top" style={{
                gridRow: '1',
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: '10px'
            }}>
                <h1 style={{
                    fontFamily: "'Merriweather', serif",
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#fff',
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 4px 10px rgba(0,0,0,0.8)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <Bus size={40} color="#3b82f6" style={{ filter: 'drop-shadow(0 0 10px #3b82f6)' }} />
                    ACE Transport Routes
                </h1>
            </div>

            {/* Left Edge - Route List 1 */}
            <div className="edge-left" style={{
                gridRow: '2',
                gridColumn: '1',
                display: 'flex',
                alignItems: 'flex-start', // Start from top
                justifyContent: 'flex-start',
                paddingLeft: '30px',
                paddingTop: '20px', 
                background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)'
            }}>
                <RouteList routes={routesLeft} align="left" />
            </div>

            {/* Center Content - The "Premium" Visual */}
            <div className="center-stage" style={{
                gridRow: '2',
                gridColumn: '2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px'
            }}>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotateX: 20 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                        position: 'relative',
                        width: '350px',
                        height: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Glowing Rings Background */}
                    <div style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        border: '2px solid rgba(59, 130, 246, 0.3)',
                        boxShadow: '0 0 50px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(59, 130, 246, 0.1)',
                        animation: 'spin 10s linear infinite' 
                    }}></div>
                     <div style={{
                        position: 'absolute',
                        width: '240px',
                        height: '240px',
                        borderRadius: '50%',
                        border: '1px dashed rgba(255, 255, 255, 0.2)',
                        animation: 'spin-reverse 15s linear infinite'
                    }}></div>

                    {/* Central Glass Disc */}
                    <div style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <Bus size={80} color="#fff" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))' }} />
                        
                        {/* Orbiting Icons */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                        >
                            <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                <div style={{ background: '#3b82f6', width: '8px', height: '8px', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6' }}></div>
                            </div>
                        </motion.div>
                    </div>

                    <h1 style={{
                        marginTop: '30px',
                        fontFamily: "'Merriweather', serif",
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: 'white',
                        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                        letterSpacing: '2px',
                        zIndex: 3
                    }}>
                        Campus
                    </h1>
                     <p style={{
                        fontFamily: "'Inter', sans-serif",
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.9rem',
                        letterSpacing: '2px', // Reduced tracking slightly
                        textTransform: 'uppercase',
                        marginTop: '5px'
                    }}>
                        Logistics
                    </p>

                </motion.div>
            </div>

            {/* Right Edge - Route List 2 */}
            <div className="edge-right" style={{
                gridRow: '2',
                gridColumn: '3',
                display: 'flex',
                alignItems: 'flex-start', // Start from top
                justifyContent: 'flex-end',
                paddingRight: '30px',
                paddingTop: '20px',
                background: 'linear-gradient(-90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)'
            }}>
                <RouteList routes={routesRight} align="right" />
            </div>

            {/* Bottom Edge - Footer */}
            <div className="edge-bottom" style={{
                gridRow: '3',
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', // Stick near top of footer 
                padding: '0 60px',
                paddingBottom: '20px', // Lift footer content slightly
                color: 'rgba(255,255,255,0.6)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={18} />
                    <span style={{ fontSize: '0.9rem' }}>Transport Incharge: Mr. Govindaraj</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <span style={{ fontSize: '0.9rem' }}>9442855079</span>
                </div>
            </div>
        </div>
        
        {/* Style Tag for Animations */}
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { 
                from { transform: rotate(0deg); } 
                to { transform: rotate(360deg); } 
            }
            @keyframes spin-reverse { 
                from { transform: rotate(360deg); } 
                to { transform: rotate(0deg); } 
            }
        `}} />
    </div>
  );
};

export default Transport;
