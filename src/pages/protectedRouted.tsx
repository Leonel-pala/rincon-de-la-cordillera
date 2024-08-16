import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/verifyCookie', {
          credentials: 'include',
        });
        const res = await response.json();
        setIsAuthenticated(res);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyCookie();
  }, []);

  if (isAuthenticated === null) {
    return;
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
