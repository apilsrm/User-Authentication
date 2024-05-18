import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer"
import NavBar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

const  App =() => {
  

  return ( 
    <>

      <Router>
      <NavBar/>
        <Routes>


               <Route exact path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<SignUp />} />
               <Route path="/profile" element={<Profile />} />




        </Routes>

        <Footer />
      </Router>

    </>
  )
}

export default App
