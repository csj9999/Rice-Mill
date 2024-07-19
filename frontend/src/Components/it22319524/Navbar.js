import "../it22319524/Navbar.css"
import { Link , useNavigate } from "react-router-dom";
import { useAuth } from '../it22306340/contexts/AuthContext';


function NavBar() {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();
  
    const handleProfileClick = () => {
      navigate(`/userp/${loggedInUser._id}`);
    };
    return (
        <div className="flex justify-content-space-between bg plr-10 ptb-20" style={{ width: '100%' }}>
            <div className='pl nav-links'><Link className="link" to="/home">Home</Link></div>
            <div className='pl nav-links'><Link className="link" to="/product">Product</Link></div>
            <div className='pl nav-links'><Link className="link" to="/aboutus">About us</Link></div>
            <div className='pl nav-links'><Link className="link" to="/ricemilling">Rice milling</Link></div>
            <div className='pl nav-links'><Link className="link" to="/contactus">Contact us</Link></div>
            <div className='pl nav-links'><Link className="link" to="/productorder">ProductOrders</Link></div>
            <div className='pl nav-links'><Link  onClick={handleProfileClick}>Profile</Link></div>
            <div className='pl nav-links'><Link className="link" to="/log">Login</Link></div>
        </div>
    );
}

export default NavBar;