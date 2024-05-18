
import { Link,  } from "react-router-dom";


const Login = () => {
 

  return (
    <>
      {" "}
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value=""
            
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
              value= ""
              
            />
            
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <span>
            Dont have an account{" "}
            <Link to="/register" className="text-blue-500 no-underline">
              {" "}
              Register
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
