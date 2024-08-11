import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Login from "../Login";
import axios from "axios";
import { useSelector } from "react-redux";
import { uid } from "uid";

function AdminTicket() {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const { ticketId } = useParams();

  const [userTicketData, setUserTicketData] = useState([]);
  const [chatData, setChatData] = useState({});
  const [techSupportNames, setTechSupportNames] = useState([]);
  const [status, setStatus] = useState(true);
  const [canceled, setCanceled] = useState(false);
  const [selectedTechSupportId, setSelectedTechSupportId] = useState("");

  const [input, setInput] = useState("");

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      console.log(chatData);
      getChatData();
      const time = new Date().getTime() + 330 * 60 * 1000;
      chatData?.messages?.push({ time, by: currentUser.type, message: input });
      const response = await axios.put(`http://localhost:3001/chats/${chatData?.id}`, {
        ...chatData,
        messages: chatData.messages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getChatData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/chats", {
        params: {
          ticketId,
        },
      });
      
      setChatData(response?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTechSupportNames = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tech-support");
      setTechSupportNames(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tickits", {
        params: {
          id: ticketId,
        },
      });
      setUserTicketData(response?.data[0]);
      setStatus(response?.data[0]?.isResolved);
      setCanceled(response?.data[0]?.isCanceled);
      if (response?.data[0]?.isResolved) {
        getChatData();
      }
      if (!response?.data[0]?.isCanceled && !response?.data[0]?.isResolved)
        getTechSupportNames();
    } catch (error) {
      console.log(error);
    }
  };

  const AssignToTechSupport = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/tickits/${userTicketData?.id}`,
        {
          ...userTicketData,
          techsupportId: selectedTechSupportId,
        }
      );
      setUserTicketData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setTechSupportId = (e) => {
    setSelectedTechSupportId(e.target.value);
  };

  useEffect(() => {
    getTicketData();
  }, []);

  return !currentUser || currentUser.type !== "admin" ? (
    <Login />
  ) : (
    <div className="flex justify-center mt-8 flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-8 m-2 p-4 border shadow-md bg-[#F0ECE3]">
        <h2 className="text-center font-bold mb-4">Information User Ticket</h2>
        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 md:pr-4">
            <img
              src={userTicketData?.image}
              alt="Image of Ticket"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-2/3">
            <div className="border-b pb-4 mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Ticket Id:</span>
                {userTicketData?.id}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Name:</span>
                {userTicketData?.name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Email:</span>
                {userTicketData?.email}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Mobile:</span>
                {userTicketData?.mob}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Message:</span>
                {userTicketData?.message}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center ">
              {canceled ? (
                <h2 className="font-medium">canceled By user.</h2>
              ) : (
                <h2 className="font-medium">
                  Status:{" "}
                  <span>
                    {userTicketData?.isResolved ? "Resolved" : "Pending"}
                  </span>
                  {userTicketData?.techsupportId ? (
                    <h2 className="font-medium">
                      Assigned To: {userTicketData?.techsupportId}
                    </h2>
                  ) : (
                    <></>
                  )}
                </h2>
              )}

              {!status && !canceled && !userTicketData?.techsupportId && (
                <div className="flex items-center">
                  <select
                    onChange={setTechSupportId}
                    className="border-b border-gray-400 pl-2 pr-8 rounded-lg focus:outline-none mb-2 md:mb-0"
                  >
                    <option value="">Select tech supporter</option>

                    {techSupportNames?.map((data) => (
                      <option value={data?.id} key={uid(5)}>
                        {data?.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={AssignToTechSupport}
                    className="bg-[#4f6d7a] text-white m-1 px-3 rounded"
                  >
                    Assign
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {status === true ? (
        <div className="w-full md:w-1/2  pl-8 m-2 p-4 border shadow-md relative bg-white">
          <div className="overflow-auto overflow-y-auto h-56 bg-[#F0ECE3] p-4">
            {chatData?.messages
              ?.sort((a, b) => a - b)
              ?.map((chat) => (
                <p key={uid(5)}>
                  {chat?.by}: {chat?.message}
                </p>
              ))}
               <div className="mt-4 md:absolute bottom-0 left-0 right-0">
              <div className="flex justify-center items-center pb-[15px] pl-[30px] pr-[15px]">
                <input
                  type="text"
                  className="w-full border rounded px-2 py-2 mr-2 focus:outline-none "
                  placeholder="Ask a question for tech..."
                  onChange={handleOnChange}
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#2fa3cc] hover:bg-[#2f97be] text-white font-bold py-2 px-4 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminTicket;
