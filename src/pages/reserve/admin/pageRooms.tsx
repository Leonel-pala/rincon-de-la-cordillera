import { Link } from 'react-router-dom';
import ReserveTitlePage from '../../../components/admin/reserveTitlePage';

export default function PagesRooms() {
  const linkStyle =
    'border w-[210px] h-[210px] text-center text-9xl py-10 hover:bg-slate-50';
  return (
    <>
      <ReserveTitlePage titulo="Cabañas" />
      <div className="flex flex-wrap gap-4 justify-evenly">
        <Link to="/admin-panel/cabanna/1" className={linkStyle}>
          1
        </Link>
        <Link to="/admin-panel/cabanna/2" className={linkStyle}>
          2
        </Link>
        <Link to="/admin-panel/cabanna/3" className={linkStyle}>
          3
        </Link>
        <Link to="/admin-panel/cabanna/4" className={linkStyle}>
          4
        </Link>
      </div>
    </>
  );
}
