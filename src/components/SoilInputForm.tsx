import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Upload } from 'lucide-react';

interface SoilData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  moisture: string;
  organicCarbon: string;
}

interface SoilInputFormProps {
  onAnalyze: (data: SoilData) => void;
}

const SoilInputForm: React.FC<SoilInputFormProps> = ({ onAnalyze }) => {
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    organicCarbon: ''
  });

  const handleInputChange = (field: keyof SoilData, value: string) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(soilData);
  };

  const getParameterStatus = (value: string, min: number, max: number) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'neutral';
    if (num < min) return 'low';
    if (num > max) return 'high';
    return 'optimal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-success text-success-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="card-agricultural">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <FlaskConical className="h-5 w-5" />
          Soil Analysis Input
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nitrogen */}
            <div className="space-y-2">
              <Label htmlFor="nitrogen">Nitrogen (N) - kg/ha</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="nitrogen"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 45.2"
                  value={soilData.nitrogen}
                  onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                />
                <Badge className={getStatusColor(getParameterStatus(soilData.nitrogen, 40, 80))}>
                  {getParameterStatus(soilData.nitrogen, 40, 80)}
                </Badge>
              </div>
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <Label htmlFor="phosphorus">Phosphorus (P) - kg/ha</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="phosphorus"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 25.5"
                  value={soilData.phosphorus}
                  onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                />
                <Badge className={getStatusColor(getParameterStatus(soilData.phosphorus, 20, 40))}>
                  {getParameterStatus(soilData.phosphorus, 20, 40)}
                </Badge>
              </div>
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <Label htmlFor="potassium">Potassium (K) - kg/ha</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="potassium"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 180"
                  value={soilData.potassium}
                  onChange={(e) => handleInputChange('potassium', e.target.value)}
                />
                <Badge className={getStatusColor(getParameterStatus(soilData.potassium, 150, 300))}>
                  {getParameterStatus(soilData.potassium, 150, 300)}
                </Badge>
              </div>
            </div>

            {/* pH */}
            <div className="space-y-2">
              <Label htmlFor="ph">Soil pH</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  placeholder="e.g., 6.5"
                  value={soilData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                />
                <Badge className={getStatusColor(getParameterStatus(soilData.ph, 6.0, 7.5))}>
                  {getParameterStatus(soilData.ph, 6.0, 7.5)}
                </Badge>
              </div>
            </div>

            {/* Moisture */}
            <div className="space-y-2">
              <Label htmlFor="moisture">Moisture (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="moisture"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="e.g., 25.0"
                  value={soilData.moisture}
                  onChange={(e) => handleInputChange('moisture', e.target.value)}
                />
                <Badge className={getStatusColor(getParameterStatus(soilData.moisture, 20, 40))}>
                  {getParameterStatus(soilData.moisture, 20, 40)}
                </Badge>
              </div>
            </div>

            {/* Organic Carbon */}
            <div className="space-y-2">
              <Label htmlFor="organicCarbon">Organic Carbon (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="organicCarbon"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 0.8"
                  value={soilData.organicCarbon}
                  onChange={(e) => handleInputChange('organicCarbon', e.target.value)}
                />
                <Badge className={getStatusColor(getParameterStatus(soilData.organicCarbon, 0.5, 1.5))}>
                  {getParameterStatus(soilData.organicCarbon, 0.5, 1.5)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-4">
              <Button type="submit" className="btn-agricultural flex-1">
                Analyze Soil & Get Crop Recommendations
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Report
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Upload a PDF/CSV soil report for automatic parameter extraction
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SoilInputForm;