import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from './assests/tech_support_logo.png';
function Home() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // console.log(currentUser);
    if (currentUser) navigate(`/${currentUser?.type}`);
  }, []);

  const text = "Welcome To Tech Support....";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let interval;
    if (displayText !== text) {
      interval = setInterval(() => {
        const nextChar = text.substring(0, displayText.length + 1);
        setDisplayText(nextChar);
      }, 200);
    } else {
      setTimeout(() => setDisplayText(""), 1000);
    }
    return () => clearInterval(interval);
  }, [text, displayText]);

  return (
    <div className='flex justify-center items-center mt-[55px]'>
      <div className='text-center px-4'>
        <div className="flex justify-center border transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border-[#2f97be] shadow-2xl">
      <img className="" src={logo} alt="" width={250} height={250} />
      </div>
        <div className="flex justify-between items-center gap-[10px] mt-[45px]">
          <div className="border bg-[#eef3f6] rounded-lg border-[#2f97be] shadow-2xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl text-[#2fa3cc] px-[35px] py-[15px]">Web Development</div>
          <div className="border bg-[#eef3f6] rounded-lg border-[#2f97be] shadow-2xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl text-[#2fa3cc] px-[35px] py-[15px]">Mobile App Development</div>
          <div className="border bg-[#eef3f6] rounded-lg border-[#2f97be] shadow-2xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl text-[#2fa3cc] px-[35px] py-[15px]">Game Development</div>
        </div>
        <div className="flex justify-center items-center gap-[10px] mt-[20px]">
          <div className="border bg-[#eef3f6] rounded-lg border-[#2f97be] shadow-2xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl text-[#2fa3cc] px-[35px] py-[15px]">UI / UX Design</div>
          <div className="border bg-[#eef3f6] rounded-lg border-[#2f97be] shadow-2xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl text-[#2fa3cc] px-[35px] py-[15px]">3D Design</div>
        </div>
    </div>

    </div>
  );
}

export default Home;
