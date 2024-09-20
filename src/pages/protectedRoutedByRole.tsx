import { useEffect, useState } from 'react';
import AlertRole from '../components/alertRole';

interface ProtectedRouteByRoleProps {
  children: React.ReactNode;
}

const ProtectedRouteByRole = ({ children }: ProtectedRouteByRoleProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const response = await fetch(
          'https://server-rincon-de-la-cordillera.onrender.com/api/verifyRole',
          {
            credentials: 'include',
          }
        );
        const res = await response.json();
        setIsAuthenticated(res.accesAdmin);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyRole();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <AlertRole />;
};

export default ProtectedRouteByRole;
