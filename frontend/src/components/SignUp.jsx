
import { Link } from "react-router-dom";


const SignUp = () => {
 

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md my-2">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form >
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              
            />
            
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNo"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
             
            />
            
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
             
            />
        
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              
            />
            
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              
              Register
            </button>
          </div>
          <span>Already have an account <Link to="/login" className="no-underline"> Login here</Link></span>
        </form>
      </div>
      ;
    </>
  );
};

export default SignUp;
