import { useState, type ChangeEvent, type FormEvent } from 'react';
import { bodyTypeLabels, fuelTypeLabels, type NewCar } from '../models/Car';

// Form fields are kept as strings so the inputs stay controlled while the user types.
interface CarFormValues {
  brand: string;
  model: string;
  doorsNumber: string;
  luggageCapacity: string;
  engineCapacity: string;
  fuelType: string;
  productionDate: string;
  averageFuelConsumption: string;
  bodyType: string;
}

const emptyValues: CarFormValues = {
  brand: '',
  model: '',
  doorsNumber: '5',
  luggageCapacity: '',
  engineCapacity: '',
  fuelType: '1',
  productionDate: '',
  averageFuelConsumption: '',
  bodyType: '1',
};

function toFormValues(car: NewCar): CarFormValues {
  return {
    brand: car.brand,
    model: car.model,
    doorsNumber: String(car.doorsNumber),
    luggageCapacity: String(car.luggageCapacity),
    engineCapacity: String(car.engineCapacity),
    fuelType: String(car.fuelType),
    productionDate: car.productionDate,
    averageFuelConsumption: String(car.averageFuelConsumption),
    bodyType: String(car.bodyType),
  };
}

function toNewCar(values: CarFormValues): NewCar {
  return {
    brand: values.brand.trim(),
    model: values.model.trim(),
    doorsNumber: Number(values.doorsNumber),
    luggageCapacity: Number(values.luggageCapacity),
    engineCapacity: Number(values.engineCapacity),
    fuelType: Number(values.fuelType),
    productionDate: values.productionDate,
    averageFuelConsumption: Number(values.averageFuelConsumption),
    bodyType: Number(values.bodyType),
  };
}

interface CarFormProps {
  initialCar?: NewCar;
  submitLabel: string;
  onSubmit: (car: NewCar) => Promise<void>;
}

export default function CarForm({ initialCar, submitLabel, onSubmit }: CarFormProps) {
  const [values, setValues] = useState<CarFormValues>(
    initialCar ? toFormValues(initialCar) : emptyValues
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await onSubmit(toNewCar(values));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się zapisać samochodu.');
      setIsSaving(false);
    }
  }

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <label>
        Marka
        <input name="brand" value={values.brand} onChange={handleChange} required />
      </label>

      <label>
        Model
        <input name="model" value={values.model} onChange={handleChange} required />
      </label>

      <label>
        Liczba drzwi
        <input
          name="doorsNumber"
          type="number"
          min="1"
          max="9"
          value={values.doorsNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Pojemność bagażnika [l]
        <input
          name="luggageCapacity"
          type="number"
          min="0"
          value={values.luggageCapacity}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Pojemność silnika [cm³]
        <input
          name="engineCapacity"
          type="number"
          min="0"
          value={values.engineCapacity}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Rodzaj paliwa
        <select name="fuelType" value={values.fuelType} onChange={handleChange}>
          {Object.entries(fuelTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Data produkcji
        <input
          name="productionDate"
          type="date"
          value={values.productionDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Średnie spalanie [l/100 km]
        <input
          name="averageFuelConsumption"
          type="number"
          min="0"
          step="0.1"
          value={values.averageFuelConsumption}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Typ nadwozia
        <select name="bodyType" value={values.bodyType} onChange={handleChange}>
          {Object.entries(bodyTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="message error">{error}</p>}

      <div className="actions">
        <button type="submit" className="button primary" disabled={isSaving}>
          {isSaving ? 'Zapisywanie...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
