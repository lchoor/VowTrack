import React from 'react';
import logoImage from 'figma:asset/a4f0713de50a59b72da9768a6ffc876ca51ff0a4.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: { w: 'h-8' },
    md: { w: 'h-12' },
    lg: { w: 'h-20' }
  };

  const dimensions = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="VowTrack Logo" 
        className={`${dimensions.w} w-auto object-contain`}
      />
    </div>
  );
};
