import axios from "axios";
import { useEffect, useState } from "react";

const AdminTechSupport = () => {

    const [techs, setTechs] = useState([]);

    const techSupportList = async () => {
        const res = await axios.get("http://localhost:3001/tech-support");
        setTechs(res.data);
    }

    useEffect(()=> {
        techSupportList()
    },[])

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    techs && techs.map((item) => {
                        return (
                            <tr
                            key={item.id}
                            >
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default AdminTechSupport;
