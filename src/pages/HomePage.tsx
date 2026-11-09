import { Link } from 'react-router';

export default function HomePage() {
  return (
    <section>
      <h1>Cars Client</h1>
      <p>
        Aplikacja kliencka do zarządzania listą samochodów, przygotowana w React, TypeScript i
        Vite. Dane pochodzą z lokalnego REST API udostępnianego przez json-server.
      </p>
      <p>
        Możesz przeglądać samochody, wyświetlać ich szczegóły, dodawać nowe, edytować istniejące
        i usuwać je z listy.
      </p>
      <Link to="/cars" className="button primary">
        Przejdź do listy samochodów
      </Link>
    </section>
  );
}
