import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  onLanguageChange: (language: 'en' | 'hi') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi'>('en');

  const handleToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {currentLanguage === 'en' ? 'हिन्दी' : 'English'}
    </Button>
  );
};

export default LanguageToggle;