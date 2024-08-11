import { Link } from "react-router-dom";
import pendinglogo from '../assests/pending_image.png';

const TechSupport = () => {
    return (
        <div className='flex flex-col md:flex-row justify-around items-center m-3 mt-[10%]'>
            <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl bg-[#eef3f6] border rounded-lg border-[#2f97be] shadow-2xl">
                <Link to='/techsupport/assigned' className="p-2">
                <img className="" src={pendinglogo} alt="pending" width={250} height={250} />
                </Link>
                <button className="bg-[#2fa3cc] hover:bg-[#2f97be] rounded-lg m-2 p-2 text-white text-center w-full sm:w-auto">
                <Link to='/techsupport/assigned' className=''>
                Assigned / Pending Tickets</Link>
                </button>
            </div>
            <Link hidden={true} to='/techsupport/resolved' className='bg-[#f2b163] m-1 py-20 px-24 text-[24px] xl:text-[22px] 3xl:text-[1.146vw] font-semibold rounded-lg text-[#FFF] text-center md:px-24'>Resolved</Link>
            <Link hidden={true} to='/techsupport/all' className='bg-[#f2b163] m-1 py-20 px-24 text-[24px] xl:text-[22px] 3xl:text-[1.146vw] font-semibold rounded-lg text-[#FFF] text-center md:px-24'>All</Link>
        </div>
    )
}

export default TechSupport;