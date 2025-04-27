
import React from 'react';
import { motion } from 'framer-motion';
import CloudProviderIcon from './CloudProviderIcon';

type ProviderType = 'google-drive' | 'dropbox' | 'onedrive';

interface Provider {
  id: ProviderType;
  name: string;
}

const CloudProvidersSection: React.FC = () => {
  const providers: Provider[] = [
    { id: 'google-drive', name: 'Google Drive' },
    { id: 'dropbox', name: 'Dropbox' },
    { id: 'onedrive', name: 'OneDrive' }
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-10 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {providers.map((provider, index) => (
        <motion.div 
          key={provider.id}
          className="flex flex-col items-center"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-2 shadow-md">
            <CloudProviderIcon provider={provider.id} className="w-9 h-9" />
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {provider.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CloudProvidersSection;
