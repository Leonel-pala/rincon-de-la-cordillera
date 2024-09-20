import { Outlet } from 'react-router-dom';
import ReserveHeader from '../../../components/admin/reserveHeader';

export default function PagePanelAdmin() {
  return (
    <>
      <ReserveHeader />
      <Outlet />
    </>
  );
}
