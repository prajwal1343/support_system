import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminUserList = () => {
  const [users, setUser] = useState([]);

  const userList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          
          {
            users && users.map((item)=> {
              return(
                <tr
                key={item.id}
                >
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                </tr>
              )
            })
          }
           { /*<td className="px-6 py-4 whitespace-nowrap">
              <Link
                to="/admin/user/123"
                className="text-indigo-600 hover:text-indigo-900"
              >
                100000000000000
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Balu Patil</td>
            <td className="px-6 py-4 whitespace-nowrap">Balupatil@nnf</td>
  */}
         
         
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
