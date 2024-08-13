import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInfo } from "../redux/slice/ticketSlice";
import Login from "../Login";
import axios from "axios";
import { uid } from "uid";

function CreateTicket() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mob: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const id = uid(11);
      const createticket = await axios.post(`${apiUrl}tickits`, {
        ...formData,
        id,
        image,
        userId: currentUser?.id,
        isResolved: false,
        isCanceled: false,
      });
      dispatch(addInfo({ ...formData, id, image }));

      setFormData({
        name: "",
        email: "",
        mob: "",
        message: "",
      });
      setImage(null);

      navigate(`/user/ticket/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => { }, []);

  return !currentUser || currentUser.type !== "user" ? (
    <Login />
  ) : (
    <div className="flex justify-center mt-6">
      <div className="grid grid-cols-12 gap-[15px]">
        <div className="col-span-6 bg-white rounded-lg shadow-2xl">
          <div className="h-[500px] w-[500px] p-5 rounded-lg shadow-2xl">
            {image && (
              <img
                src={image}
                alt="Product"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="col-span-6 bg-white rounded-lg shadow-2xl">
          <div className="p-4">
            <div className="text-2xl font-bold mb-4 text-center">Create Ticket</div>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="mob"
                  name="mob"
                  value={formData.mob}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Phone No"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Message"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="profile" className="block mb-2 text-[#000] font-medium">
                  Send Message File
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                  onChange={handleFileChange}
                />
              </div>
              <button
                className="w-full bg-[#2fa3cc] hover:bg-[#2f97be] text-white font-bold py-2 px-4 rounded-md my-3"
                onClick={onSubmitHandler}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
