import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { signInSuccess } from './redux/slice/loginSlice.js'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");

  const onChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (input?.email.trim().length === 0) return setResponse("provide email");
    if (!emailRegex.test(input?.email)) return setResponse("invalid email");
    if (input?.password?.trim()?.length < 4)
      return setResponse("password should have at least 4 characters");
    const login = await axios.get(`${apiUrl}login`, {
      params: {
        email: input?.email,
        password: input?.password,
      },
    });
    // console.log(login.data);
    if (login?.data?.length === 0) return setResponse("email or password is incorrect")
    dispatch(signInSuccess({ id: login?.data[0]?.id, type: login?.data[0]?.type }))
    return navigate(`/${login?.data[0]?.type}`)
  };

  return (
    <div className="flex justify-center items-center mt-[7%]">
      <div className="w-96 p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
              placeholder="Email"
              value={input.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
              placeholder="Password"
              value={input.password}
              onChange={onChangeHandler}
            />
          </div>
          <p className="text-[#dc2626]">{response}</p>

          <button
            className="w-full bg-[#2fa3cc] hover:bg-[#2f97be] text-white font-bold py-2 px-4 rounded-md my-3"
            onClick={onSubmitHandler}
          >
            Login
          </button>
          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <span className="text-blue-600 font-semibold">
                <Link to="/signup">Register</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
