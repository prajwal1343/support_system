
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { uid } from "uid";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const onChangeHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.id]: e.target.value });
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const 
  onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      if (input?.name?.trim().length === 0) return setResponse("provied name");

      if (!emailRegex.test(input?.email)) return setResponse("invalid email");
      const checkDuplicateEmail = await axios.get(
        `${apiUrl}users?email=${input?.email}`
      );
      console.log(checkDuplicateEmail);
      if (checkDuplicateEmail?.data?.length > 0) return setResponse("email already exist");

      if (input?.password?.trim().length < 4)
        return setResponse("password should have at least 4 characters");
      console.log(input);
      const id = uid(11);
      await axios.post(`${apiUrl}users`, { ...input, id });
      await axios.post(`${apiUrl}login`, {
        id,
        email: input.email,
        password: input.password,
        type: "user",
      });

      return setResponse("registred successfully");
    } catch (error) {
      console.log(error);
    }
  };

   return (
     <div className="flex justify-center items-center mt-[7%]">
      <div className="w-96 p-8 bg-white rounded-lg shadow-2xl">
         <h1 className="text-2xl font-bold mb-4 text-center">User Signup</h1>
         <form>
           <div className="mb-4">
            <input
               type="text"
             id="name"
             className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
               value={input.name}
               onChange={onChangeHandler}
               placeholder="Name"
             />
           </div>

           <div className="mb-4">
            <input
               type="email"
               id="email"
               className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
               value={input.email}
               onChange={onChangeHandler}
               placeholder="Email"
             />
           </div>
           <div className="mb-4">
             <input
               type="password"
               id="password"
               className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
               value={input.password}
               onChange={onChangeHandler}
               placeholder="Password"
             />
          </div>
          <p className="text-[#dc2626]">{response}</p>
        <button
            className="w-full bg-[#2fa3cc] hover:bg-[#2f97be] text-white font-bold py-2 px-4 rounded-md my-3"
             onClick={onSubmitHandler}
           >
             Signup
           </button>
           <div>
             <p className="text-center">
               Already have an account?{" "}
               <span className="text-blue-600 font-semibold">
                 <Link to="/login">Back to Login</Link>
               </span>
             </p>
           </div>
         </form>
       </div>
     </div>
   );
};

export default Signup;
