import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./Components/it22324788/main/Main";

import ViewRice from "./Components/it22324788/viewStockLevels/viewRice/ViewRice";

import RiceVarieties from "./Components/it22324788/viewStockLevels/RiceVarieties/RiceVarieties";
import ViewPaddy from "./Components/it22324788/viewStockLevels/viewPaddy/ViewPaddy";
import AddRice from "./Components/it22324788/viewStockLevels/RiceVarieties/AddRiceV";
import UpdateRiceV from "./Components/it22324788/viewStockLevels/RiceVarieties/UpdateVariety";
import UpdatePaddy from './Components/it22324788/viewStockLevels/viewPaddy/UpdatePaddy';
import Dashboard from './Components/it22324788/Dashboard/Dashboard';

import ManageLocation from './Components/it22324788/locations/ManageLoc';
import AddLocation from "./Components/it22324788/locations/AddLocation";
import UpdateLocation from "./Components/it22324788/locations/UpdateLocation";

import GenerateReports from "./Components/it22324788/Reports/Reports";

import WorkersHome from "./Components/it22324788/Workers/Home/wHome";
import AddPaddy from "./Components/it22324788/Workers/Paddy/AddPaddy";

import Instructions from "./Components/it22324788/instructions/Instructions";
import WorkerInstructions from "./Components/it22324788/Workers/Instructions/wInstructions";
import Wdamages from "./Components/it22324788/Workers/damages/Damages";

import HomeYevin from "./Components/it22324788/Dashboard/Dashboard";
import HomeNalinda from "./Components/it22331786/Home/Home";











//tharaka







































//chathumin
import ProfileContainer from './Components/it22306340/ProfileContainer';
import { AuthProvider } from './Components/it22306340/contexts/AuthContext' ;
import Profile from "./Components/it22306340/Profile/Profile";
import CusRegister  from "./Components/it22306340/CusRegister/CusRegister";
import HomeChathumin from "./Components/it22306340/Home/Home";
import CusUpdate from "./Components/it22306340/CusUpdate/CusUpdate";
import OrderDetailsPage from "./Components/it22306340/OrderDetails/OrderDetailsPage";
import NewOrder from "./Components/it22306340/NewOrder/NewOrder";
import Login from "./Components/it22306340/Login/Login";
import UserProfile from "./Components/it22306340/UserProfile/UserProfile";
import EditOrder from "./Components/it22306340/EditOrder/EditOrder";
import FeedbackList from "./Components/it22306340/FeedbackList/FeedbackList";
import AddFeedback from "./Components/it22306340/AddFeedback/AddFeedback";
import UserUpdate from "./Components/it22306340/UserUpdate/UserUpdate";
import UserRegister from "./Components/it22306340/UserRegister/UserRegister";
import CusOrders from "./Components/it22306340/CusOrders/CusOrders";
import IssueReporting from "./Components/it22306340/IssueReporting/IssueReporting";
import IssueList from "./Components/it22306340/IssueList/IssueList";
import CusHome from "./Components/it22319524/cushome"
import Navbar from "./Components/it22319524/Navbar"




















//nalinda







































//manoj







































//senuri







































function App() {
  return (
    <div >
      <Router>
      <React.Fragment>
      <AuthProvider> 

        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/yevin" element={<HomeYevin />} />

          <Route path="/manageLocation" element={<ManageLocation/>} />
          <Route path="/addLocation" element={<AddLocation/>} />
          <Route path="/manageLocation/:id" element={<UpdateLocation />} />{/*update location */}
          
          <Route path="/viewRice" element={<ViewRice />} />
          
          <Route path="/riceVarieties" element={<RiceVarieties />} />
          <Route path="/add-rice" element={<AddRice />} />
          <Route path="/riceVarieties/:id" element={<UpdateRiceV />} />{/*update rice variety */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/viewPaddy" element={<ViewPaddy />} />
          <Route path="/viewPaddy/:id" element={<UpdatePaddy />} />update paddy

          <Route path="/genReports" element= {<GenerateReports/>} />

          <Route path="/wHome" element={<WorkersHome/>}/>
          <Route path="/addPaddy" element={<AddPaddy/>}/>
          <Route path="/wInstructions" element={<WorkerInstructions/>}/>
          <Route path="/wdamages" element={<Wdamages/>}/>
          <Route path="/instructions" element={<Instructions/>}/>










        {/* nalinda */}
        <Route path="/nalinda" element={<HomeNalinda />} />






































        {/* tharaka */}







































{/* chathumin */}
<Route path="/chathumin" element={<HomeChathumin />} />
<Route path="/log" element={<Login />} />
<Route path="/pro" element={<Profile />} />
<Route path="/ADregi" element={<CusRegister />}/>
<Route path="/pro/:id" element={<CusUpdate />}/>
<Route path="/profile-container" element={<ProfileContainer />} /> 
<Route path="/or" element={<OrderDetailsPage />}/>
<Route path="/or/:id" element={<EditOrder />} />
<Route path="/new" element={<NewOrder />}/>
<Route path="/userp" element={<UserProfile />} />
<Route path="/userupdate/:id" element={<UserUpdate />} />
<Route path="/CSregi" element={<UserRegister />}/>
<Route path="/feed" element={<FeedbackList />} />
<Route path="/Adfeed/:id" element={<AddFeedback />} />
<Route path="/cusorder/:id" element={<CusOrders />} />
<Route path="/issue/:id" element={<IssueReporting />} />
<Route path="/issue-list" element={<IssueList />} />
 <Route path='/' element={<CusHome />} />
<Route path="/Adfeed" element={<AddFeedback />} />
<Route path="/cusorder" element={<CusOrders />} />
<Route path='/cushome' element={<CusHome />} /> 
<Route path="/userp/:id" element={<UserProfile />} /> 
<Route path='/ador' element={<NewOrder />} />
<Route path='/cushome/:id' element={<CusHome />} /> 


















{/* manoj*/}







































{/* senuri */}







































        </Routes>
        </AuthProvider> 

      </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
