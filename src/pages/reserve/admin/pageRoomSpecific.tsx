import { useParams } from 'react-router-dom';
import NotFoundPage from '../../notFoundPage';
import ReserveTitlePage from '../../../components/admin/reserveTitlePage';
import DateCabanna from '../../../components/admin/datePickerCabanna';

export default function RoomsSpecific() {
  const { numberRoom } = useParams();
  const isValidRoomNumber =
    /^\d+$/.test(numberRoom ?? '') &&
    Number(numberRoom) > 0 &&
    Number(numberRoom) <= 4;

  if (!isValidRoomNumber) {
    return <NotFoundPage />;
  }

  return (
    <>
      <ReserveTitlePage titulo={`Cabaña Nro. ${numberRoom}`}></ReserveTitlePage>
      <DateCabanna></DateCabanna>
    </>
  );
}
