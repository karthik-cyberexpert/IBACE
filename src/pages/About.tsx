import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <nav className="about-nav">
                <div onClick={() => navigate('/')} className="nav-tab" style={{ marginLeft: 20, cursor: 'pointer' }}>
                   &larr; Back to Home
                </div>
                <div className="active-glow"></div>
                <div className="nav-tab">Campus</div>
                <div className="nav-tab active">Aggregation</div>
                <div className="nav-tab">History</div>
                <div className="nav-tab">Committee</div>
            </nav>
            <div className="about-main">
                <h1 className="section-title">About Meridian College</h1>
                <div className="carousel-card">
                  <div style={{ padding: '2rem', height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                     <p>About Page Content Placeholder. (See text2.txt styling for more)</p>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default About;
