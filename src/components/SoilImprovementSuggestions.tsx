import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { generateSoilRecommendations, getSoilParameterCategory } from '@/data/soilDatabase';

interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicCarbon: number;
  moisture: number;
}

interface SoilImprovementSuggestionsProps {
  soilData: SoilData;
}

const SoilImprovementSuggestions: React.FC<SoilImprovementSuggestionsProps> = ({ soilData }) => {
  const recommendations = generateSoilRecommendations(soilData);
  
  const getParameterIcon = (parameter: string, value: number) => {
    const category = getSoilParameterCategory(parameter, value);
    switch (category) {
      case 'optimal':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'veryLow':
      case 'low':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'high':
      case 'veryHigh':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getParameterBadgeColor = (parameter: string, value: number) => {
    const category = getSoilParameterCategory(parameter, value);
    switch (category) {
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'veryLow':
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'high':
      case 'veryHigh':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="card-agricultural">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Lightbulb className="h-5 w-5" />
          Soil Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Soil Analysis Summary */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Soil Analysis Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
              <span className="text-xs text-muted-foreground">Nitrogen</span>
              <div className="flex items-center gap-2">
                {getParameterIcon('nitrogen', soilData.nitrogen)}
                <Badge variant="outline" className={`text-xs ${getParameterBadgeColor('nitrogen', soilData.nitrogen)}`}>
                  {getSoilParameterCategory('nitrogen', soilData.nitrogen)}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
              <span className="text-xs text-muted-foreground">Phosphorus</span>
              <div className="flex items-center gap-2">
                {getParameterIcon('phosphorus', soilData.phosphorus)}
                <Badge variant="outline" className={`text-xs ${getParameterBadgeColor('phosphorus', soilData.phosphorus)}`}>
                  {getSoilParameterCategory('phosphorus', soilData.phosphorus)}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
              <span className="text-xs text-muted-foreground">Potassium</span>
              <div className="flex items-center gap-2">
                {getParameterIcon('potassium', soilData.potassium)}
                <Badge variant="outline" className={`text-xs ${getParameterBadgeColor('potassium', soilData.potassium)}`}>
                  {getSoilParameterCategory('potassium', soilData.potassium)}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
              <span className="text-xs text-muted-foreground">pH Level</span>
              <div className="flex items-center gap-2">
                {getParameterIcon('ph', soilData.ph)}
                <Badge variant="outline" className={`text-xs ${getParameterBadgeColor('ph', soilData.ph)}`}>
                  {getSoilParameterCategory('ph', soilData.ph)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Expert Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Tips */}
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <h4 className="text-sm font-semibold text-green-800 mb-2">General Soil Health Tips</h4>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Test soil every 6 months for optimal crop planning</li>
            <li>• Maintain crop rotation to prevent nutrient depletion</li>
            <li>• Use organic fertilizers to improve soil structure</li>
            <li>• Practice conservation tillage to reduce soil erosion</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilImprovementSuggestions;