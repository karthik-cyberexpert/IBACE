import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

interface MenuButtonProps {
  onMenu?: () => void;
  className?: string; 
}

const MenuButton: React.FC<MenuButtonProps> = ({ onMenu, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onMenu) {
      onMenu();
    } else {
      navigate('/'); // Default to home/menu
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`menu-button ${className || ''}`}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(59, 130, 246, 0.9)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
        zIndex: 1000,
        transition: 'transform 0.2s ease, background 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Home size={28} />
    </button>
  );
};

export default MenuButton;
