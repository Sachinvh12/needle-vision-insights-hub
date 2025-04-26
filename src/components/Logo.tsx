
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <img 
        src="/lovable-uploads/0a70d7fb-99b8-48e3-aee0-4b62df7703cc.png" 
        alt="Needl.ai Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
