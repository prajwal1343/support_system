import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateTicket from "./components/users/CreateTicket";
import MyList from "./components/users/UserTicketList";
import AdminHome from "./components/admin/AdminHome";
import UserTicket from "./components/users/UserTicket";
import AdminTicketsList from "./components/admin/AdminTicketList";
import AdminTicket from "./components/admin/AdminTicket";
import AdminTechSupport from "./components/admin/AdminTechSupport";
import AdminUserList from "./components/admin/AdminUserList";
import TechSupport from "./components/tech_support/TechSupport";
import Assigned from "./components/tech_support/Assigned";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserHome from "./components/users/UserHome";
import TechsupportTicket from "./components/tech_support/TechSupportTicket";

function App() {
  return (
    <div>
    <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>

    {/** User */}
    <Route path="/user" element={<UserHome/>}/>
    <Route path="/user/createticket" element={<CreateTicket/>}/>
    <Route path="/user/tickets" element={<MyList/>}/>
    <Route path="/user/ticket/:ticketId" element={<UserTicket/>}/>
    

    {/** Admin */}
    <Route path="/admin" element={<AdminHome/>}/>
    <Route path="/admin/tickets" element={<AdminTicketsList/>}/>
    <Route path="/admin/ticket/:ticketId" element={<AdminTicket/>}/>
    <Route path="/admin/techsupport" element={<AdminTechSupport/>}/>
    <Route path="/admin/users" element={<AdminUserList/>}/>
   


    {/** Tech Supports */}
    <Route path="/techsupport" element={<TechSupport/>}/>
    <Route path="/techsupport/assigned" element={<Assigned/>}/>
   {/* <Route path="/techsupport/resolved" element={<Resolved/>}/>
    <Route path="/techsupport/all" element={<All/>}/>
  */}
  <Route path="/techsupport/ticket/:ticketId" element={<TechsupportTicket/>}/>
    {/** Common Pages */}
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />

    </Routes>
    <Footer/>
    </Router>
    </div>
  );
}

export default App;
