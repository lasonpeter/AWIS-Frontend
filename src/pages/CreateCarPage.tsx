import { Link, useNavigate } from 'react-router';
import CarForm from '../components/CarForm';
import type { NewCar } from '../models/Car';
import { createCar } from '../services/carService';

export default function CreateCarPage() {
  const navigate = useNavigate();

  async function handleSubmit(car: NewCar) {
    const created = await createCar(car);
    navigate(`/cars/${created.id}`);
  }

  return (
    <section>
      <Link to="/cars" className="back-link">
        ← Powrót do listy
      </Link>
      <h1>Dodaj samochód</h1>
      <CarForm submitLabel="Dodaj" onSubmit={handleSubmit} />
    </section>
  );
}
