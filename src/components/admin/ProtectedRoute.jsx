import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('ideaclap_admin_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}







