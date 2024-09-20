import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await fetch(
          'https://server-rincon-de-la-cordillera.onrender.com/api/verifyCookie',
          {
            credentials: 'include',
          }
        );
        const res = await response.json();
        setIsAuthenticated(res);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyCookie();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
