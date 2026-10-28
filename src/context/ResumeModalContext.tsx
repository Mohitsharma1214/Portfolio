import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileConfigService, DEFAULT_PROFILE_SETTINGS } from '../services/profileConfigService';
import type { ProfileSettings } from '../services/profileConfigService';

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
  settings: ProfileSettings;
  refreshSettings: () => Promise<void>;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export const ResumeModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ProfileSettings>(DEFAULT_PROFILE_SETTINGS);

  const refreshSettings = async () => {
    const data = await ProfileConfigService.getSettings();
    setSettings(data);
  };

  useEffect(() => {
    refreshSettings();
    const unsubscribe = ProfileConfigService.subscribe((updated) => {
      setSettings(updated);
    });
    return unsubscribe;
  }, []);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  return (
    <ResumeModalContext.Provider
      value={{
        isOpen,
        openResumeModal,
        closeResumeModal,
        settings,
        refreshSettings,
      }}
    >
      {children}
    </ResumeModalContext.Provider>
  );
};

export function useResumeModal(): ResumeModalContextType {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error('useResumeModal must be used within a ResumeModalProvider');
  }
  return context;
}
