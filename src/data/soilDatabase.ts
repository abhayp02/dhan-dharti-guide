// Authentic soil parameter database for accurate recommendations
export interface SoilStandard {
  parameter: string;
  unit: string;
  veryLow: { min: number; max: number };
  low: { min: number; max: number };
  optimal: { min: number; max: number };
  high: { min: number; max: number };
  veryHigh: { min: number; max: number };
}

export interface CropSoilRequirement {
  crop: string;
  nitrogen: { min: number; max: number };
  phosphorus: { min: number; max: number };
  potassium: { min: number; max: number };
  ph: { min: number; max: number };
  organicCarbon: { min: number; max: number };
  moisture: { min: number; max: number };
}

// Based on Indian Council of Agricultural Research (ICAR) standards
export const soilStandards: Record<string, SoilStandard> = {
  nitrogen: {
    parameter: 'Nitrogen (N)',
    unit: 'kg/ha',
    veryLow: { min: 0, max: 200 },
    low: { min: 200, max: 300 },
    optimal: { min: 300, max: 400 },
    high: { min: 400, max: 500 },
    veryHigh: { min: 500, max: 1000 }
  },
  phosphorus: {
    parameter: 'Phosphorus (P)',
    unit: 'kg/ha',
    veryLow: { min: 0, max: 10 },
    low: { min: 10, max: 20 },
    optimal: { min: 20, max: 40 },
    high: { min: 40, max: 60 },
    veryHigh: { min: 60, max: 100 }
  },
  potassium: {
    parameter: 'Potassium (K)',
    unit: 'kg/ha',
    veryLow: { min: 0, max: 100 },
    low: { min: 100, max: 200 },
    optimal: { min: 200, max: 300 },
    high: { min: 300, max: 400 },
    veryHigh: { min: 400, max: 600 }
  },
  ph: {
    parameter: 'pH Level',
    unit: '',
    veryLow: { min: 0, max: 5.5 },
    low: { min: 5.5, max: 6.0 },
    optimal: { min: 6.0, max: 7.5 },
    high: { min: 7.5, max: 8.5 },
    veryHigh: { min: 8.5, max: 14 }
  },
  organicCarbon: {
    parameter: 'Organic Carbon',
    unit: '%',
    veryLow: { min: 0, max: 0.25 },
    low: { min: 0.25, max: 0.5 },
    optimal: { min: 0.5, max: 1.0 },
    high: { min: 1.0, max: 1.5 },
    veryHigh: { min: 1.5, max: 5.0 }
  },
  moisture: {
    parameter: 'Moisture Content',
    unit: '%',
    veryLow: { min: 0, max: 10 },
    low: { min: 10, max: 20 },
    optimal: { min: 20, max: 40 },
    high: { min: 40, max: 60 },
    veryHigh: { min: 60, max: 100 }
  }
};

// Crop-specific soil requirements
export const cropSoilRequirements: CropSoilRequirement[] = [
  {
    crop: 'Rice',
    nitrogen: { min: 300, max: 400 },
    phosphorus: { min: 20, max: 30 },
    potassium: { min: 200, max: 300 },
    ph: { min: 6.0, max: 7.0 },
    organicCarbon: { min: 0.5, max: 1.0 },
    moisture: { min: 30, max: 50 }
  },
  {
    crop: 'Wheat',
    nitrogen: { min: 250, max: 350 },
    phosphorus: { min: 15, max: 25 },
    potassium: { min: 150, max: 250 },
    ph: { min: 6.5, max: 7.5 },
    organicCarbon: { min: 0.4, max: 0.8 },
    moisture: { min: 20, max: 35 }
  },
  {
    crop: 'Maize',
    nitrogen: { min: 300, max: 450 },
    phosphorus: { min: 25, max: 40 },
    potassium: { min: 200, max: 350 },
    ph: { min: 6.0, max: 7.5 },
    organicCarbon: { min: 0.6, max: 1.2 },
    moisture: { min: 25, max: 40 }
  },
  {
    crop: 'Cotton',
    nitrogen: { min: 350, max: 500 },
    phosphorus: { min: 30, max: 50 },
    potassium: { min: 250, max: 400 },
    ph: { min: 6.5, max: 8.0 },
    organicCarbon: { min: 0.5, max: 1.0 },
    moisture: { min: 20, max: 35 }
  },
  {
    crop: 'Sugarcane',
    nitrogen: { min: 400, max: 600 },
    phosphorus: { min: 35, max: 55 },
    potassium: { min: 300, max: 500 },
    ph: { min: 6.0, max: 7.5 },
    organicCarbon: { min: 0.8, max: 1.5 },
    moisture: { min: 30, max: 50 }
  }
];

export function getSoilParameterCategory(parameter: string, value: number): string {
  const standard = soilStandards[parameter];
  if (!standard) return 'unknown';

  if (value >= standard.veryLow.min && value <= standard.veryLow.max) return 'veryLow';
  if (value >= standard.low.min && value <= standard.low.max) return 'low';
  if (value >= standard.optimal.min && value <= standard.optimal.max) return 'optimal';
  if (value >= standard.high.min && value <= standard.high.max) return 'high';
  if (value >= standard.veryHigh.min && value <= standard.veryHigh.max) return 'veryHigh';
  
  return 'unknown';
}

export function generateSoilRecommendations(soilData: any): string[] {
  const recommendations: string[] = [];
  
  const nCategory = getSoilParameterCategory('nitrogen', soilData.nitrogen);
  const pCategory = getSoilParameterCategory('phosphorus', soilData.phosphorus);
  const kCategory = getSoilParameterCategory('potassium', soilData.potassium);
  const phCategory = getSoilParameterCategory('ph', soilData.ph);
  const ocCategory = getSoilParameterCategory('organicCarbon', soilData.organicCarbon);
  const moistureCategory = getSoilParameterCategory('moisture', soilData.moisture);

  // Nitrogen recommendations
  if (nCategory === 'veryLow' || nCategory === 'low') {
    recommendations.push('Apply nitrogen-rich fertilizers like urea or DAP. Consider growing leguminous crops to fix nitrogen naturally.');
  } else if (nCategory === 'high' || nCategory === 'veryHigh') {
    recommendations.push('Reduce nitrogen fertilizer application. Excess nitrogen can cause lodging and delay maturity.');
  }

  // Phosphorus recommendations
  if (pCategory === 'veryLow' || pCategory === 'low') {
    recommendations.push('Apply phosphorus fertilizers like SSP or DAP. Add rock phosphate for long-term phosphorus availability.');
  } else if (pCategory === 'high' || pCategory === 'veryHigh') {
    recommendations.push('Reduce phosphorus fertilizer. High phosphorus can interfere with zinc and iron uptake.');
  }

  // Potassium recommendations
  if (kCategory === 'veryLow' || kCategory === 'low') {
    recommendations.push('Apply potassium fertilizers like MOP or SOP. Use organic sources like farmyard manure and compost.');
  } else if (kCategory === 'high' || kCategory === 'veryHigh') {
    recommendations.push('Reduce potassium fertilizer application to prevent nutrient imbalance.');
  }

  // pH recommendations
  if (phCategory === 'veryLow' || phCategory === 'low') {
    recommendations.push('Apply lime or dolomite to increase soil pH. Consider growing acid-tolerant crops.');
  } else if (phCategory === 'high' || phCategory === 'veryHigh') {
    recommendations.push('Apply organic matter like compost or gypsum to reduce soil pH. Avoid lime application.');
  }

  // Organic carbon recommendations
  if (ocCategory === 'veryLow' || ocCategory === 'low') {
    recommendations.push('Increase organic matter by adding farmyard manure, compost, or green manure. Practice crop rotation with legumes.');
  }

  // Moisture recommendations
  if (moistureCategory === 'veryLow' || moistureCategory === 'low') {
    recommendations.push('Improve irrigation system. Apply mulch to retain soil moisture. Consider drip irrigation for water efficiency.');
  } else if (moistureCategory === 'high' || moistureCategory === 'veryHigh') {
    recommendations.push('Improve drainage system. Avoid over-irrigation to prevent waterlogging and root diseases.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Your soil parameters are well-balanced. Maintain current practices and monitor regularly.');
  }

  return recommendations;
}