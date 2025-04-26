
import React from 'react';
import { cn } from "@/lib/utils";

interface CloudProviderIconProps {
  provider: 'google-drive' | 'dropbox' | 'onedrive';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CloudProviderIcon: React.FC<CloudProviderIconProps> = ({ 
  provider, 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  if (provider === 'google-drive') {
    return (
      <div className={cn(sizeClasses[size], "flex items-center justify-center", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78" className="w-full h-full">
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
          <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
          <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
          <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
          <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
          <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
        </svg>
      </div>
    );
  } else if (provider === 'dropbox') {
    return (
      <div className={cn(sizeClasses[size], "flex items-center justify-center", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0061FF" className="w-full h-full">
          <path d="M6 2L0 6l6 4-6 4 6 4 6-4-6-4 6-4-6-4zm12 0l-6 4 6 4 6-4-6-4zm-6 12l6 4 6-4-6-4-6 4zm6-4l-6-4-6 4 6 4 6-4z"/>
        </svg>
      </div>
    );
  } else if (provider === 'onedrive') {
    return (
      <div className={cn(sizeClasses[size], "flex items-center justify-center", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M9.743 12.58a4.3 4.3 0 0 0-1.617.318l-2.904-4.384a4.27 4.27 0 0 1 3.257-1.522 4.216 4.216 0 0 1 2.896 1.155l2.156 3.156c-.2.037-.362.117-.557.162a4.229 4.229 0 0 0-3.231 1.114z" fill="#0364B8"/>
          <path d="M14.968 11.815a4.325 4.325 0 0 0-.686-.898l2.148-3.204a4.27 4.27 0 0 1 .601.459 4.2 4.2 0 0 1 1.269 3.006 4.2 4.2 0 0 1-.335 1.65l-4.188-1.013a4.24 4.24 0 0 1 1.19 0z" fill="#0078D4"/>
          <path d="M17.965 12.84a4.267 4.267 0 0 1-3.048 3.136 4.217 4.217 0 0 1-3.486-.6 4.25 4.25 0 0 1-1.688-2.536 3.162 3.162 0 0 0-1.33-2.033 3.2 3.2 0 0 0-2.415-.465 3.2 3.2 0 0 0-2.193 1.46 3.162 3.162 0 0 0-.404 2.54L0 19.334h14.578L24 16.35l-6.035-3.509z" fill="#1490DF"/>
          <path d="M5.492 14.35a3.15 3.15 0 0 1-1.426-.337l-2.5 3.851 6.992 1.47.002-2.001a4.275 4.275 0 0 1-1.865-1.214 3.157 3.157 0 0 1-1.203-1.77z" fill="#28A8EA"/>
        </svg>
      </div>
    );
  }
  
  return null;
};

export default CloudProviderIcon;
