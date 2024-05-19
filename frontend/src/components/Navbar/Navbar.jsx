
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import profile from "../../assets/profile-picture.jpg"
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
const NavBar = ({ verifyJWT, user }) => {
  console.log(user);
  

  return ( <>
    <Navbar fluid rounded>
    
    
    <div className="flex md:order-2">
    {verifyJWT ? ( 
    <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img={user?.avatar?.url} rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{user?.username}</span>
          <span className="block truncate text-sm font-medium">{user?.email}</span>
        </Dropdown.Header>
        <Link to="/profile">
        <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        
        <Link to="/change-password">
        <Dropdown.Item>Change Password</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Link to="/logout">
        <Dropdown.Item>Sign out</Dropdown.Item>
        </Link>
      </Dropdown>)
      :
       (
         <Dropdown
         arrowIcon={false}
         inline
         label={
           <Avatar alt="User settings" img={profile} rounded />
         }
       >
         <Dropdown.Header>
           <span className="block text-sm">Login First</span>
           
         </Dropdown.Header>
         
       </Dropdown>
      )}
     
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <Navbar.Link href="/" active>
        Home
      </Navbar.Link>
      <Navbar.Link href="/login">Login</Navbar.Link>
      <Navbar.Link href="/register">Sign Up</Navbar.Link>
      <Navbar.Link href="/profile">Profile</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
  </>
  )
}
NavBar.propTypes = {
  verifyJWT: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavBar;
