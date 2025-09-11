import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import WeatherWidget from '@/components/WeatherWidget';
import SoilInputForm from '@/components/SoilInputForm';
import CropRecommendations from '@/components/CropRecommendations';
import LanguageToggle from '@/components/LanguageToggle';
import SoilImprovementSuggestions from '@/components/SoilImprovementSuggestions';
import FeedbackForm from '@/components/FeedbackForm';
import { Sprout, Users, BookOpen } from 'lucide-react';
import heroImage from '@/assets/hero-agriculture.jpg';

const Index = () => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [soilAnalysisData, setSoilAnalysisData] = useState(null);

  const handleSoilAnalysis = (soilData: any) => {
    console.log('Analyzing soil data:', soilData);
    setSoilAnalysisData(soilData);
    // Here we would send data to ML model
    setShowRecommendations(true);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'hi') => {
    setLanguage(newLanguage);
  };

  const translations = {
    en: {
      title: "Smart Crop Recommendation System",
      subtitle: "AI-powered agricultural guidance for better farming decisions",
      description: "Get personalized crop recommendations based on your soil analysis, weather conditions, and market prices. Maximize your yield and profitability with data-driven insights.",
      getStarted: "Start Soil Analysis",
      learnMore: "Learn More",
      features: "Features",
      soilAnalysis: "Soil Analysis",
      soilDesc: "Advanced soil testing with NPK analysis",
      weatherIntegration: "Weather Integration", 
      weatherDesc: "Real-time weather data and forecasts",
      cropRecommendations: "AI Recommendations",
      cropDesc: "ML-powered crop suggestions"
    },
    hi: {
      title: "स्मार्ट फसल सिफारिश प्रणाली",
      subtitle: "बेहतर कृषि निर्णयों के लिए AI-संचालित मार्गदर्शन",
      description: "अपने मिट्टी विश्लेषण, मौसम की स्थिति और बाजार की कीमतों के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें। डेटा-संचालित अंतर्दृष्टि के साथ अपनी उपज और लाभप्रदता को अधिकतम करें।",
      getStarted: "मिट्टी विश्लेषण शुरू करें",
      learnMore: "और जानें",
      features: "विशेषताएं",
      soilAnalysis: "मिट्टी विश्लेषण",
      soilDesc: "NPK विश्लेषण के साथ उन्नत मिट्टी परीक्षण",
      weatherIntegration: "मौसम एकीकरण",
      weatherDesc: "वास्तविक समय मौसम डेटा और पूर्वानुमान",
      cropRecommendations: "AI सिफारिशें",
      cropDesc: "ML-संचालित फसल सुझाव"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card shadow-warm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">AgroSmart</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle onLanguageChange={handleLanguageChange} />
              <Button variant="outline" className="hidden md:flex">
                {language === 'en' ? 'Login' : 'लॉगिन'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {t.subtitle}
            </p>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-agricultural text-lg px-8 py-3"
                onClick={() => document.getElementById('soil-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.getStarted}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-3"
              >
                {t.learnMore}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t.features}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-up">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.soilAnalysis}</h3>
              <p className="text-muted-foreground">{t.soilDesc}</p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.weatherIntegration}</h3>
              <p className="text-muted-foreground">{t.weatherDesc}</p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.cropRecommendations}</h3>
              <p className="text-muted-foreground">{t.cropDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Weather Widget */}
            <div className="animate-fade-up">
              <WeatherWidget />
            </div>
            
            {/* Soil Input Form */}
            <div id="soil-form" className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <SoilInputForm onAnalyze={handleSoilAnalysis} />
            </div>
          </div>
          
          {/* Results Section */}
          {showRecommendations && soilAnalysisData && (
            <div className="space-y-8 mt-8">
              <CropRecommendations isVisible={showRecommendations} />
              <SoilImprovementSuggestions soilData={soilAnalysisData} />
            </div>
          )}

          {/* Feedback Section */}
          <div className="mt-12">
            <FeedbackForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sprout className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">AgroSmart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? '© 2024 AgroSmart. Empowering farmers with AI-driven insights.'
                : '© 2024 AgroSmart. AI-संचालित अंतर्दृष्टि के साथ किसानों को सशक्त बनाना।'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
