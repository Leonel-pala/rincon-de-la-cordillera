import { Link } from 'react-router-dom';

export default function HeaderAdmin() {
  return (
    <div className="bg-header-admin flex justify-between items-center px-10 py-1 text-[#fff]">
      <h2 className="text-lg">
        <b>Administrador</b>
      </h2>
      <div className="flex gap-3 items-center ">
        <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
        <Link to="/admin-panel" className="p-2 duration-200 hover:bg-[#3F9176]">
          Panel de admin
        </Link>
      </div>
    </div>
  );
}
