import { useEffect, useState } from 'react';
import AlertRole from '../components/alertRole';

const ProtectedRouteByRole = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/verifyRole', {
          credentials: 'include',
        });
        const res = await response.json();
        if (res.accesAdmin) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyRole();
  }, []);

  if (isAuthenticated === null) {
    return;
  }

  return isAuthenticated ? children : <AlertRole />;
};

export default ProtectedRouteByRole;
