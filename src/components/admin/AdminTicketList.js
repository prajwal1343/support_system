import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "../Login";
import axios from "axios";
import { uid } from "uid";

function AdminTicketsList() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userTickets, setUserTickets] = useState([]);

  const getAllTickets = async () => {
    const response = await axios.get("http://localhost:3001/tickits");
    setUserTickets(response?.data);
  };
  useEffect(() => {
    getAllTickets();
  }, []);

  return !currentUser || currentUser.type !== "admin" ? (
    <Login />
  ) : (
    <div className="max-w-md mx-auto p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2 text-center">My Tickets</h2>
      {userTickets?.map((ticket) => (
        <Link
          to={`/admin/ticket/${ticket?.id}`}
          className="block bg-[#F0ECE3] rounded-lg shadow-md overflow-hidden"
          key={uid(5)}
        >
          <div className="p-4">
            <hr className="my-2" />
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Ticket Id:</span> {ticket?.id}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Name:</span> {ticket?.name}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Email:</span> {ticket?.email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Mobile:</span> {ticket?.mob}
            </p>

            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Resolved:</span> {ticket?.isResolved ? "Yes" : "No"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AdminTicketsList;