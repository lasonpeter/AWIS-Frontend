# Cars Client

Aplikacja kliencka React + TypeScript + Vite przygotowana w ramach Laboratorium 3
z przedmiotu *Aplikacje webowe i sieciowe*. Dane udostępnia lokalny serwer
[json-server](https://github.com/typicode/json-server) (plik `db.json`).

## Uruchomienie

```bash
npm install
npm run api   # json-server na http://localhost:3000/cars
npm run dev   # aplikacja na http://localhost:5173
```

`npm run api` i `npm run dev` należy uruchomić w osobnych terminalach.

## Funkcje

- lista samochodów z obsługą ładowania, błędu i pustej listy,
- szczegóły samochodu (`/cars/:id`),
- dodawanie (`/cars/new`) i edycja (`/cars/:id/edit`, żądanie PUT) w formularzu kontrolowanym,
- usuwanie z potwierdzeniem,
- menu oparte na `NavLink` i strona 404.

## Struktura

```
src/
  components/  CarForm, CarListItem
  layouts/     RootLayout (menu + Outlet)
  models/      Car, NewCar
  pages/       HomePage, CarsPage, CarDetailsPage, CreateCarPage, EditCarPage, NotFoundPage
  services/    carService (fetch)
```
