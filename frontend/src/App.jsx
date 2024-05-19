import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer"
import NavBar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profile } from "./redux/features/authSlice.js"

import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";




const  App =() => {
  const { verifyJWT, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (verifyJWT) {
      dispatch(profile());
    }
  }, [dispatch, verifyJWT]);
  

  return ( 
    <>
<div className="App">
      <Router>
        <NavBar verifyJWT={verifyJWT} user={user} />
        <main className="flex-grow"> 
        
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<ProtectedRoutes verifyJWT={verifyJWT}>
                <Profile />{" "}
              </ProtectedRoutes>} />
            <Route path="/change-password" element={<ProtectedRoutes verifyJWT={verifyJWT}>
                <ChangePassword />{" "}
              </ProtectedRoutes>} />

            {/* <Route path="/change-password" element={<ChangePassword />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>

    </>
  )
}

export default App
