import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-title">Cars Client</span>
        <nav className="menu">
          <NavLink to="/" end>
            Strona główna
          </NavLink>
          <NavLink to="/cars" end>
            Samochody
          </NavLink>
          <NavLink to="/cars/new">Dodaj samochód</NavLink>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
