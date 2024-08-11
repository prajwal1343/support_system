import { useState } from "react";
import tech from './assests/logo/tech.png';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./redux/slice/loginSlice";

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(currentUser)

    const logOutHandler = () => {
        dispatch(signOut());
        navigate('/')
    }

    return (
        <div className="flex items-center justify-between bg-[#2f97be] border-b-2 px-[7rem] py-[0.5rem] overflow-hidden">
            <div>
                <Link to='/' className="flex items-center gap-[10px]">
                    <img className="h-10 w-12" src={tech} alt="" />
                    <h2 className="font-semibold text-center text-[#FFF]">Support System</h2>
                </Link>
            </div>
            <div className='flex items-center mr-4 gap-4'>
                {currentUser ? (
                    <button className='text-white font-semibold border border-bg-red-200 rounded-full px-[10px] py-[5px] hover:bg-[#2fa3cc] '
                        onClick={logOutHandler}
                    >Logout</button>
                ) : (
                    <div className="flex items-center gap-[20px]">
                        <Link to="/login" className='text-white font-semibold border border-bg-red-200 rounded-full px-[10px] py-[5px] hover:bg-[#2fa3cc] '>Login</Link>
                        <Link to="/signup" className='text-white font-semibold border border-bg-red-200 rounded-full px-[10px] py-[5px] hover:bg-[#2fa3cc] '>Register</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;
