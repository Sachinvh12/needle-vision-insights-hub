
import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'glitter';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  if (variant === 'glitter') {
    return (
      <div className={`animated-bg glitter-bg ${className}`}>
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="pulse-dot absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className={`animated-bg opacity-30 ${className}`} />
    );
  }

  return (
    <div className={`animated-bg ${className}`} />
  );
};

export default AnimatedBackground;
