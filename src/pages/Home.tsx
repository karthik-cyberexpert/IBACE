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

// Helper Component for Menu Items to handle shared Animation Logic
const MenuGridItem = ({ id, activeId, onClick, icon, text, extraClass = "" }: any) => {
    // If this is the active button, we apply the "Fly Away" animation 
    // BUT we must make sure the parent doesn't unmount it immediately.
    // In our current logic, the parent `showMenuGrid` becomes false after 2.5s.
    // So we can just animate this specific item UPWARDS if active.
    
    return (
        <motion.div 
            className={`grid-item ${extraClass}`} 
            onClick={onClick}
            animate={activeId === id ? { 
                y: -600, 
                scale: 0.8, 
                opacity: 0 
            } : {}}
            transition={{ 
                duration: 2, 
                ease: "easeInOut",
                delay: 0.5 
            }}
        >
            {icon} {text}
        </motion.div>
    );
};

// Helper Component for Sub-Menu Items (Drone Drop Animation)
const DroneDropItem = ({ children, delay = 0 }: any) => {
    const [droneData, setDroneData] = useState<any>(null);
    const [showDrone, setShowDrone] = useState(true);

    useEffect(() => {
        fetch('/assets/drone_fly.json')
           .then(res => res.json())
           .then(data => setDroneData(data));
        
        // Hide drone after drop + fly away sequence
        // Sequence: 
        // 0s-1.5s: Drop
        // 1.5s: Land
        // 1.5s-2.5s: Fly away
        const timer = setTimeout(() => {
            setShowDrone(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* The Button Content - Animates Down */}
            <motion.div
                initial={{ y: -800, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                    duration: 1.5, 
                    ease: "easeOut", 
                    delay: delay 
                }}
                style={{ width: '100%', height: '100%' }}
            >
                {children}
            </motion.div>

            {/* The Drone Overlay - Follows the button then flies away */}
            {showDrone && droneData && (
                <motion.div
                    initial={{ y: -900, opacity: 1, scale: 0.8 }} // Start slightly above button
                    animate={{ 
                        y: [ -900, -100, -100, -900 ], // Drop -> Stay -> Fly Up
                        opacity: [ 1, 1, 1, 0 ]
                    }}
                    transition={{
                        duration: 3,
                        times: [0, 0.5, 0.7, 1], // Keyframe timings
                        ease: "easeInOut",
                        delay: delay
                    }}
                    style={{ 
                        position: 'absolute', 
                        top: '-60px', // Offset relative to the button
                        left: '50%', 
                        marginLeft: '-75px', // Center (assuming width 150)
                        width: '150px', 
                        height: '150px', 
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                >
                    <Lottie animationData={droneData} loop={true} />
                </motion.div>
            )}
        </div>
    );
};

function Home() {
// ... existing Home component code ...
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showMenuGrid, setShowMenuGrid] = useState(false);
  const [showSadAnimation, setShowSadAnimation] = useState(false);
  const [sadAnimationData, setSadAnimationData] = useState<any>(null);
  
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [welcomeAnimationData, setWelcomeAnimationData] = useState<any>(null);

  const [showRobotAnimation, setShowRobotAnimation] = useState(false); // Using this for Drone animation state now
  const [droneAnimationData, setDroneAnimationData] = useState<any>(null);
  
  const [clickedButtonRect, setClickedButtonRect] = useState<DOMRect | null>(null);
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

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

    fetch('/assets/drone_fly.json')
       .then(res => res.json())
       .then(data => setDroneAnimationData(data))
       .catch(err => console.error("Failed to load drone animation", err));
  }, []);

  // Toggle Form
  const toggleForm = () => {
    if (showSadAnimation) setShowSadAnimation(false);
    if (showWelcomeAnimation) setShowWelcomeAnimation(false);
    if (showRobotAnimation) setShowRobotAnimation(false); 
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

  // Handle Menu Item Click -> Capture Coords -> Drone Animation -> Sub Menu OR Navigation
  const handleMenuClick = (category: string, e: React.MouseEvent<HTMLDivElement>, id: string) => {
    // Capture position before hiding anything
    const rect = e.currentTarget.getBoundingClientRect();
    setClickedButtonRect(rect);
    setActiveButtonId(id);
    setSelectedCategory(category);
    
    // Start Animation Sequence
    setShowRobotAnimation(true); // Reusing this state for "Drone Sequence"
    
    // After animation delay, show sub-menu OR Navigate
    // Animation timing: 
    // 0s: Drone appears
    // 0.5s: Drone + Button move up
    // 2.5s: End
    setTimeout(() => {
        setShowMenuGrid(false); // Hide main menu now
        setShowRobotAnimation(false);
        
        if (category === 'About') {
            navigate('/about');
        } else {
            setShowSubMenu(true);
        }
    }, 2500);
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
    "Aeronautical Engineering", "Biomedical Engineering", "Civil Engineering", 
    "Computer Science and Engineering", "CSE (AI & ML)", "CSE (Cyber Security)", 
    "Electrical and Electronics Engineering", "Electronics and Communication Engineering", "Electronics and Instrumentation Engineering"
  ];

  // B.Tech Programs (6 items)
  const bTechCourses = [
    "Artificial Intelligence and Data Science", "Biotechnology", "Chemical Engineering",
    "Computer Science and Business Systems", "Information Technology", "Architecture (B.Arch.)"
  ];

  // M.E Programs (5 items)
  const meCourses = [
    "Communication Systems", "Computer Science and Engineering", 
    "Engineering Design", "Power Systems Engineering", "Structural Engineering"
  ];

  // MBA & MCA Programs (4 items)
  const mbaMcaCourses = [
    "MBA Full Time", "MBA Part Time", 
    "MBA – Logistics and Supply Chain Management", "MCA"
  ];

  // Ph.D Programs (5 items)
  const phdCourses = [
    "Computer Science and Engineering", "Electronics and Communication Engineering",
    "Mechanical Engineering", "Civil Engineering", "Physics"
  ];
  
  // Helper to get current items
  const getSubMenuItems = () => {
      switch(selectedCategory) {
          case 'BE': return beCourses;
          case 'BTech': return bTechCourses;
          case 'ME': return meCourses;
          case 'MBA_MCA': return mbaMcaCourses;
          case 'PhD': return phdCourses;
          default: return [];
      }
  };

  const subMenuItems = getSubMenuItems();

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

      {/* Drone Animation Overlay */}
      {showRobotAnimation && droneAnimationData && clickedButtonRect && (
        <div 
            style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 60, // Above menu
                pointerEvents: 'none'
            }}
        >
           {/* Drone Following the Fly Path */}
           <motion.div
             initial={{ 
                 top: clickedButtonRect.top - 150, // Start slightly above
                 left: clickedButtonRect.left + (clickedButtonRect.width / 2) - 100 // Center horizontally (assuming drone width ~200px)
             }}
             animate={{
                 top: -600, // Fly up
             }}
             transition={{
                 duration: 2,
                 ease: "easeInOut",
                 delay: 0.5
             }}
             style={{ position: 'absolute', width: '200px', height: '200px' }}
           >
              <Lottie animationData={droneAnimationData} loop={true} />
           </motion.div>
        </div>
      )}

      {/* Main Menu Grid */}
      {showMenuGrid && (
         <div className="menu-grid-container" onClick={() => setShowMenuGrid(false)}>
            <div className="menu-grid" onClick={(e) => e.stopPropagation()}>
               {/* 1st Row (4 items) */}
               {/* We wrap items in motion.div conditionally if they are efficient to animate, 
                   or effectively we can just animate the specific one using ID comparison */}
               
               <MenuGridItem id="be" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("BE", e, "be")} icon={<GraduationCap size={20} />} text="B.E" />
               <MenuGridItem id="sports" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("Other", e, "sports")} icon={<Dumbbell size={20} />} text="Sports" />
               <MenuGridItem id="placement" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("Other", e, "placement")} icon={<Trophy size={20} />} text="Placement" />
               <MenuGridItem id="mba" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("MBA_MCA", e, "mba")} icon={<Landmark size={20} />} text="M.B.A" />

               {/* 2nd Row */}
               <MenuGridItem id="btech" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("BTech", e, "btech")} icon={<FileText size={20} />} text="B.Tech" />
               
               {/* Center 2x2 Tile (Merged) */}
               <MenuGridItem 
                   id="about" 
                   extraClass="about-tile"
                   activeId={activeButtonId} 
                   onClick={(e: any) => handleMenuClick("About", e, "about")} 
                   icon={<Info size={40} strokeWidth={1.5} />} 
                   text={<span>About</span>} 
               />
               
               {/* Col 4 */}
               <MenuGridItem id="mca" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("MBA_MCA", e, "mca")} icon={<FileText size={20} />} text="M.C.A" />

               {/* 3rd Row */}
               <MenuGridItem id="barch" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("BTech", e, "barch")} icon={<Building2 size={20} />} text="B.Arch" />
               
               {/* Col 4 */}
               <MenuGridItem id="phd" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("PhD", e, "phd")} icon={<GraduationCap size={20} />} text="Ph.D" />

               {/* 4th Row */}
               <MenuGridItem id="scholarship" extraClass="scholarship-pill" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("Other", e, "scholarship")} icon={<GraduationCap size={20} />} text="Scholarship" />
               <MenuGridItem id="me" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("ME", e, "me")} icon={<FileText size={20} />} text="M.E" />
               <MenuGridItem id="hostel" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("Other", e, "hostel")} icon={<HomeIcon size={20} />} text="Hostel" />
               <MenuGridItem id="transport" activeId={activeButtonId} onClick={(e: any) => handleMenuClick("Other", e, "transport")} icon={<Bus size={20} />} text="Transport" />
            </div>
         </div>
      )}

      {/* Sub Menu Grid */}
      {showSubMenu && (
         <div className="menu-grid-container" onClick={() => setShowSubMenu(false)}>
            <div className="submenu-grid" onClick={(e) => e.stopPropagation()}>
                {subMenuItems.length > 0 ? (
                   <>
                     {subMenuItems.map((course, index) => (
                       <DroneDropItem key={course} delay={index * 0.1}>
                           <div className="grid-item">
                              <GraduationCap size={20} /> {course}
                           </div>
                       </DroneDropItem>
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
