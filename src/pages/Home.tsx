import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { 
  GraduationCap, 
  Trophy, 
  Building2, 
  FileText, 
  Landmark, 
  Bus, 
  Home as HomeIcon, 
  Info,
  Dumbbell
} from 'lucide-react';

function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showMenuGrid, setShowMenuGrid] = useState(false);
  const [showSadAnimation, setShowSadAnimation] = useState(false);
  const [sadAnimationData, setSadAnimationData] = useState<any>(null);
  
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [welcomeAnimationData, setWelcomeAnimationData] = useState<any>(null);

  /* 
   * Robot Animation Removed as per user request.
   * Transition is now: Main Menu -> Sub Menu immediately.
   */
  // const [showRobotAnimation, setShowRobotAnimation] = useState(false); // Removed
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fetch animations
    fetch('/assets/Sad guy is walking.json')
      .then(res => res.json())
      .then(data => setSadAnimationData(data))
      .catch(err => console.error("Failed to load sad animation", err));

    fetch('/assets/Welcome Animation.json')
      .then(res => res.json())
      .then(data => setWelcomeAnimationData(data))
      .catch(err => console.error("Failed to load welcome animation", err));
  }, []);

  // Toggle Form
  const toggleForm = () => {
    if (showSadAnimation) setShowSadAnimation(false);
    if (showWelcomeAnimation) setShowWelcomeAnimation(false);
    // if (showRobotAnimation) setShowRobotAnimation(false); 
    if (showSubMenu) setShowSubMenu(false);
    
    setIsFormOpen(!isFormOpen);
  };

  // Handle Form Submit (Success -> Welcome Animation)
  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setShowWelcomeAnimation(true);
  };

  // Handle Form Close (Cancel -> Sad Animation)
  const handleFormClose = () => {
    setIsFormOpen(false);
    setShowSadAnimation(true);
  };

  // Handle Menu Item Click -> Sub Menu (Immediate)
  const handleMenuClick = (category: string) => {
    setShowMenuGrid(false);
    setSelectedCategory(category);
    // setShowRobotAnimation(true); // Skipped
    setShowSubMenu(true);
  };

  // Timer for Sad Animation
  useEffect(() => {
    if (showSadAnimation) {
      const timer = setTimeout(() => {
        setShowSadAnimation(false);
        setShowMenuGrid(true); 
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showSadAnimation]);

  // Timer for Welcome Animation
  useEffect(() => {
    if (showWelcomeAnimation) {
      const timer = setTimeout(() => {
        setShowWelcomeAnimation(false);
        setShowMenuGrid(true); 
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showWelcomeAnimation]);

  // Robot Animation Timer Removed

  // Typewriter variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const sadText = "You haven't submitted the form!!!";
  
  // B.E Sub-menu items (9 items)
  const beCourses = [
    "CSE", "ECE", "MECH", 
    "CIVIL", "EEE", "IT", 
    "AI & DS", "AERO", "BIO-MED"
  ];

  return (
    <div className="landing-container">
      {/* ... header ... */}
      <div className="landing-overlay"></div>
      
      {/* Header */}
      <header className={`header ${showMenuGrid || showSubMenu ? 'blurred' : ''}`} style={{ transition: 'filter 0.3s' }}>
        <div className="logo-shield">
          <div className="logo-inner">
             <div className="logo-torch"></div>
             <div className="logo-book"></div>
          </div>
        </div>
        <div className="header-text">
          <h1 className="school-name">Meridian College</h1>
          <p className="school-motto">Est. 1885 • Excellence in Education</p>
        </div>
      </header>

      {/* Enquiry Form Modal */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleFormClose}>×</button>
            <h2 className="form-title">Enquiry Form</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-input" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="tel" className="form-input" placeholder="Phone Number" required />
              </div>
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Course Interested" />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Sad Animation Modal */}
      {showSadAnimation && sadAnimationData && (
        <div 
            style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: 50,
                background: 'rgba(255, 255, 255, 0.2)', // Glassy background
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                pointerEvents: 'none',
                gap: '0px'
            }}
        >
           {/* Typewriter Text */}
           <motion.h2
             className="typewriter-text"
             style={{
               fontFamily: "'Merriweather', serif",
               fontSize: '3.5rem', 
               fontWeight: 800, 
               color: '#ff0000', 
               textShadow: '2px 2px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', 
               textAlign: 'center',
               zIndex: 51,
               marginBottom: '-30px',
             }}
             variants={sentence}
             initial="hidden"
             animate="visible"
           >
             {sadText.split("").map((char, index) => {
               return (
                 <motion.span key={char + "-" + index} variants={letter}>
                   {char}
                 </motion.span>
               )
             })}
           </motion.h2>

           <div style={{ width: '500px', height: '500px' }}>
              <Lottie animationData={sadAnimationData} loop={true} />
           </div>
        </div>
      )}

      {/* Welcome Animation Modal */}
      {showWelcomeAnimation && welcomeAnimationData && (
        <div 
            style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                background: 'rgba(255, 255, 255, 0.2)', 
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                pointerEvents: 'none'
            }}
        >
           <div style={{ width: '600px', height: '600px' }}>
              <Lottie animationData={welcomeAnimationData} loop={true} />
           </div>
        </div>
      )}

      {/* Robot Animation Modal Removed */}

      {/* Main Menu Grid */}
      {showMenuGrid && (
         <div className="menu-grid-container" onClick={() => setShowMenuGrid(false)}>
            <div className="menu-grid" onClick={(e) => e.stopPropagation()}>
               {/* 1st Row (4 items) */}
               <div className="grid-item" onClick={() => handleMenuClick("BE")}><GraduationCap size={20} /> B.E</div>
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><Dumbbell size={20} /> Sports</div>
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><Trophy size={20} /> Placement</div>
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><Landmark size={20} /> M.B.A</div>

               {/* 2nd Row starts */}
               {/* Col 1 */}
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><FileText size={20} /> B.Tech</div>
               
               {/* Center 2x2 Tile (Merged) - Spans Col 2-3, Row 2-3 */}
               <div className="grid-item about-tile" onClick={() => navigate('/about')}>
                  <Info size={40} strokeWidth={1.5} />
                  <span>About</span>
               </div>
               
               {/* Col 4 */}
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><FileText size={20} /> M.C.A</div>

               {/* 3rd Row starts */}
               {/* Col 1 */}
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><Building2 size={20} /> B.Arch</div>
               
               {/* Col 2-3 taken by 'About' */}
               
               {/* Col 4 */}
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><GraduationCap size={20} /> Ph.D</div>

               {/* 4th Row (4 items) - Reordered: Scholarship first */}
               <div className="grid-item scholarship-pill" onClick={() => handleMenuClick("Other")}><GraduationCap size={20} /> Scholarship</div>
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><FileText size={20} /> M.E</div>
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><HomeIcon size={20} /> Hostel</div>
               <div className="grid-item" onClick={() => handleMenuClick("Other")}><Bus size={20} /> Transport</div>
            </div>
         </div>
      )}

      {/* Sub Menu Grid (3x3 for B.E) */}
      {showSubMenu && (
         <div className="menu-grid-container" onClick={() => setShowSubMenu(false)}>
            <div className="submenu-grid" onClick={(e) => e.stopPropagation()}>
                {selectedCategory === 'BE' ? (
                   <>
                     {beCourses.map((course) => (
                       <div key={course} className="grid-item">
                          <GraduationCap size={20} /> {course}
                       </div>
                     ))}
                   </>
                ) : (
                  // Placeholder for other categories
                   <div className="grid-item" style={{ gridColumn: '1 / -1' }}>Coming Soon</div>
                )}
            </div>
         </div>
      )}
      
      {/* Menu Button */}
      {!isFormOpen && !showMenuGrid && !showSadAnimation && !showWelcomeAnimation && !showSubMenu && (
        <div className="menu-btn-container">
          <button className="menu-btn" onClick={toggleForm} aria-label="Menu">
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </button>
        </div>
      )}
    </div>
  )
}

export default Home;
