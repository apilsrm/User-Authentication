
import { Avatar, Dropdown, Navbar } from "flowbite-react";

const NavBar = () => {

  return (
    <Navbar fluid rounded>
    
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">name@flowbite.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Change Password</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
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
  )
}

export default NavBar;
