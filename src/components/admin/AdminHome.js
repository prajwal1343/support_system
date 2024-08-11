import { Link } from "react-router-dom";
import tickets from '../assests/admin_ticket.png';
import tech from '../assests/tech_support.png';
import users from '../assests/user.png';

const AdminHome = () => {
    return (
        <div className="flex justify-center items-center gap-[30px] mt-[10%]">
        <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-[#eef3f6] border rounded-lg border-[#2f97be] shadow-2xl">
          <Link to='/admin/tickets' className="p-2">
            <img className="" src={tickets} alt="" width={250} height={250} />
          </Link>
          <button className="bg-[#2fa3cc] hover:bg-[#2f97be] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
            <Link to='/admin/tickets'>Tickets</Link>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-[#eef3f6] border rounded-lg border-[#2f97be] shadow-2xl">
          <Link to='/admin/techsupport' className="p-2">
            <img className="" src={tech} alt="" width={250} height={250} />
          </Link>
          <button className="bg-[#2fa3cc] hover:bg-[#2f97be] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
            <Link to='/admin/techsupport'>Tech Supports</Link>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-[#eef3f6] border rounded-lg border-[#2f97be] shadow-2xl">
          <Link to='/admin/users' className="p-2">
            <img className="" src={users} alt="" width={250} height={250} />
          </Link>
          <button className="bg-[#2fa3cc] hover:bg-[#2f97be] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
            <Link to='/admin/users'>Users</Link>
          </button>
        </div>
      </div>
        
    )
}

export default AdminHome;
