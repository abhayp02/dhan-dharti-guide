import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Sprout, DollarSign } from 'lucide-react';

interface CropRecommendation {
  name: string;
  namehindi: string;
  suitabilityScore: number;
  profitabilityScore: number;
  mspPrice: number;
  expectedYield: number;
  season: string;
  benefits: string[];
}

interface CropRecommendationsProps {
  isVisible: boolean;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ isVisible }) => {
  // Mock crop recommendations - will be replaced with ML model output
  const recommendations: CropRecommendation[] = [
    {
      name: 'Paddy',
      namehindi: 'धान',
      suitabilityScore: 92,
      profitabilityScore: 78,
      mspPrice: 2040,
      expectedYield: 4.2,
      season: 'Kharif',
      benefits: ['High water retention soil suitable', 'Good monsoon conditions', 'Strong market demand']
    },
    {
      name: 'Wheat',
      namehindi: 'गेहूं',
      suitabilityScore: 85,
      profitabilityScore: 82,
      mspPrice: 2125,
      expectedYield: 3.8,
      season: 'Rabi',
      benefits: ['Optimal soil pH range', 'Good nitrogen levels', 'Government support schemes']
    },
    {
      name: 'Sugarcane',
      namehindi: 'गन्ना',
      suitabilityScore: 78,
      profitabilityScore: 88,
      mspPrice: 315,
      expectedYield: 75.0,
      season: 'Annual',
      benefits: ['High profitability', 'Long growing season', 'Industrial demand']
    },
    {
      name: 'Cotton',
      namehindi: 'कपास',
      suitabilityScore: 73,
      profitabilityScore: 75,
      mspPrice: 6080,
      expectedYield: 1.8,
      season: 'Kharif',
      benefits: ['Export potential', 'Value-added processing', 'Textile industry demand']
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'soil-excellent';
    if (score >= 80) return 'soil-good';
    if (score >= 70) return 'soil-fair';
    return 'soil-poor';
  };

  if (!isVisible) return null;

  return (
    <Card className="card-agricultural animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sprout className="h-5 w-5" />
          Recommended Crops for Your Soil
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your soil analysis and current weather conditions
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {recommendations.map((crop, index) => (
            <div 
              key={crop.name}
              className="border rounded-lg p-4 space-y-4 animate-scale-in hover:shadow-elegant transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {crop.namehindi}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {crop.season}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      MSP: ₹{crop.mspPrice}/quintal
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Yield: {crop.expectedYield} tons/hectare
                    </span>
                  </div>
                </div>
                <Badge className={`${getScoreColor(crop.suitabilityScore)} text-white font-semibold`}>
                  {crop.suitabilityScore}% Match
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Soil Suitability</span>
                    <span className="font-medium">{crop.suitabilityScore}%</span>
                  </div>
                  <Progress value={crop.suitabilityScore} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profitability</span>
                    <span className="font-medium">{crop.profitabilityScore}%</span>
                  </div>
                  <Progress value={crop.profitabilityScore} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {crop.benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Soil Improvement Recommendations:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Consider adding organic compost to improve soil structure</li>
            <li>• Implement crop rotation with legumes to enhance nitrogen</li>
            <li>• Monitor moisture levels and consider drip irrigation</li>
            <li>• Test soil quarterly to track improvement progress</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropRecommendations;
