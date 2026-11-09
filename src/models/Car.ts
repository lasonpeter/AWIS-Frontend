export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: number;
  productionDate: string;
  averageFuelConsumption: number;
  bodyType: number;
}

export type NewCar = Omit<Car, 'id'>;

export const fuelTypeLabels: Record<number, string> = {
  1: 'Benzyna',
  2: 'Diesel',
  3: 'Hybryda',
  4: 'LPG',
  5: 'Elektryczny',
};

export const bodyTypeLabels: Record<number, string> = {
  1: 'Hatchback',
  2: 'Sedan',
  3: 'Kombi',
  4: 'SUV',
  5: 'Coupe',
};
