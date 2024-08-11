import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Login";
import ticket from '../assests/create_ticket.png';
import old from '../assests/old_ticket1.png';

function UserHome() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return !currentUser || currentUser.type !== "user" ? (
    <Login />
  ) : (
    // <div className="flex justify-center items-center mt-[20%]">
    //   <button className="bg-[#f7931a] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
    //     <Link to="/user/createticket">Create Ticket</Link>
    //   </button>
    //   <button className="bg-[#f7931a] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
    //     <Link to="/user/tickets">My Old Tickets</Link>
    //   </button>
    // </div>
    <div className="flex justify-center items-center gap-[30px] mt-[10%]">
      <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-[#eef3f6] border rounded-lg border-[#2f97be] shadow-2xl">
        <Link to="/user/createticket" className="p-2">
          <img className="" src={ticket} alt="" width={250} height={250} />
        </Link>
        <button className="bg-[#2fa3cc] hover:bg-[#2f97be] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
          <Link to="/user/createticket">New Ticket Create </Link>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-[#eef3f6] border rounded-lg border-[#2f97be] shadow-2xl">
        <Link to="/user/tickets" className="p-2">
          <img className="" src={old} alt="" width={250} height={250} />
        </Link>
        <button className="bg-[#2fa3cc] hover:bg-[#2f97be] m-2 p-2 rounded-lg text-white text-center w-full sm:w-auto">
          <Link to="/user/tickets">My Old Tickets</Link>
        </button>
      </div>
    </div>
  );
}

export default UserHome;
