import { Link } from 'react-router';
import type { Car } from '../models/Car';

interface CarListItemProps {
  car: Car;
  isDeleting: boolean;
  onDelete: (car: Car) => void;
}

export default function CarListItem({ car, isDeleting, onDelete }: CarListItemProps) {
  return (
    <li className="car-item">
      <div>
        <strong>{car.brand}</strong> {car.model}
        <span className="muted"> · {car.productionDate.slice(0, 4)}</span>
      </div>

      <div className="actions">
        <Link to={`/cars/${car.id}`} className="button">
          Szczegóły
        </Link>
        <Link to={`/cars/${car.id}/edit`} className="button">
          Edytuj
        </Link>
        <button
          type="button"
          className="button danger"
          disabled={isDeleting}
          onClick={() => onDelete(car)}
        >
          {isDeleting ? 'Usuwanie...' : 'Usuń'}
        </button>
      </div>
    </li>
  );
}
