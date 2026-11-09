import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import CarListItem from '../components/CarListItem';
import type { Car } from '../models/Car';
import { deleteCar, getCars } from '../services/carService';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getCars(controller.signal)
      .then(setCars)
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Nie udało się pobrać samochodów.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  async function handleDelete(car: Car) {
    const confirmed = window.confirm(
      `Czy na pewno chcesz usunąć samochód ${car.brand} ${car.model}?`
    );
    if (!confirmed) {
      return;
    }

    setDeletingId(car.id);
    setError(null);

    try {
      await deleteCar(car.id);
      setCars((current) => current.filter((c) => c.id !== car.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się usunąć samochodu.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Samochody</h1>
        <Link to="/cars/new" className="button primary">
          Dodaj samochód
        </Link>
      </div>

      {isLoading && <p className="message">Ładowanie samochodów...</p>}
      {error && <p className="message error">Błąd: {error}</p>}

      {!isLoading && !error && cars.length === 0 && (
        <p className="message">Brak samochodów na liście.</p>
      )}

      {cars.length > 0 && (
        <ul className="car-list">
          {cars.map((car) => (
            <CarListItem
              key={car.id}
              car={car}
              isDeleting={deletingId === car.id}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
