import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import img from "../assets/landing.jpg";

const Home = () => {
  return (
    <>
      <div className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center text-white" style={{ backgroundImage: `url(${img})` }}>
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative z-10 p-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-xl mb-6">Join us and explore amazing features.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button color="blue">Login</Button>
            </Link>
            <Link to="/register">
              <Button color="blue">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>

    
      
    </>
  );
};

export default Home;





// import { Button } from "flowbite-react";
// import { Link } from "react-router-dom";
// import img from "../assets/landing.jpg"

// const Home = () => {

//   return ( <>
  
//           <div>
//             <img src={img} alt=""  />
//           </div>

//      <div className="flex flex-wrap gap-2">
      
//      <Link to="/login">

//       <Button color="blue">Login</Button>
//      </Link>

//      <Link to="/register">

//       <Button color="blue">SignUp</Button>
//      </Link>
    
//     </div>
  
  
  
//   </>
    
//   )
// }

// export default Home
