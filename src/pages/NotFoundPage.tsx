import { Link, useLocation } from 'react-router';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <section className="not-found">
      <h1>404 – Nie znaleziono strony</h1>
      <p>
        Adres <code>{location.pathname}</code> nie istnieje w aplikacji.
      </p>
      <Link to="/" className="button primary">
        Wróć do strony głównej
      </Link>
    </section>
  );
}
