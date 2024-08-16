import DatePicker from '../../components/datePicker';
import HeaderReserve from '../../components/reserve/headerReserver';
import ProtectedRoute from '../protectedRouted';

export default function PageReserv() {
  return (
    <>
      <ProtectedRoute>
        <>
          <HeaderReserve />
          <DatePicker />
        </>
      </ProtectedRoute>
    </>
  );
}
