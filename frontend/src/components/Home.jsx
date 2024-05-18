
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Home = () => {

  return ( <>
  
          

     <div className="flex flex-wrap gap-2">
      
     <Link to="/login">

      <Button color="blue">Login</Button>
     </Link>

     <Link to="/register">

      <Button color="blue">SignUp</Button>
     </Link>
    
    </div>
  
  
  
  </>
    
  )
}

export default Home
