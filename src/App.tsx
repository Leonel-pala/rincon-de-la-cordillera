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
import PageAllReserve from './pages/reserve/admin/pageAllReserve';
import PagesRooms from './pages/reserve/admin/pageRooms';
import RoomsSpecific from './pages/reserve/admin/pageRoomSpecific';
import PagePanelAdmin from './pages/reserve/admin/pagePanelAdmin';
import PagePendingReserve from './pages/reserve/admin/pagePendingReserve';

function App() {
  return (
    <main className="min-h-screen max-w-screen">
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
          path="/admin-panel/*"
          element={
            <ProtectedRoute>
              <ProtectedRouteByRole>
                <PagePanelAdmin />
              </ProtectedRouteByRole>
            </ProtectedRoute>
          }
        >
          <Route path="" element={<PageAllReserve />} />
          <Route path="hospedajes" element={<PagesRooms />} />
          <Route path="reservas/confirmadas" element={<h1>Confirmadas</h1>} />
          <Route path="reservas/pendientes" element={<PagePendingReserve />} />
          <Route path="cabanna/:numberRoom" element={<RoomsSpecific />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
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
    </main>
  );
}

export default App;
