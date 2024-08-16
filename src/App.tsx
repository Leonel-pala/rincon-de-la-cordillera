import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageAuth from './pages/pageAuth';
import NotFoundPage from './pages/notFoundPage';
import HomeAuth from './pages/auth/homeAuth';
import Register from './pages/auth/register';
import PageHome from './pages/pageHome';
import PageReserv from './pages/reserve/pageReserv';
import ProtectedRoute from './pages/protectedRouted';
import MyReserv from './pages/pageMyReserv';
import ProtectedRouteByRole from './pages/protectedRoutedByRole';
import AllReserve from './pages/reserve/admin/pageAllReserve';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route
          path="/reservar"
          element={
            <ProtectedRoute>
              <PageReserv />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todas-las-reservas"
          element={
            <ProtectedRoute>
              <ProtectedRouteByRole>
                <AllReserve />
              </ProtectedRouteByRole>
            </ProtectedRoute>
          }
        />

        <Route
          path="/misReservas"
          element={
            <ProtectedRoute>
              <MyReserv />
            </ProtectedRoute>
          }
        />

        <Route path="/auth/*" element={<PageAuth />}>
          <Route path="" element={<HomeAuth />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
